/**
 * Azure Speech real-time TTS client (REST, no SDK).
 * Packs narration segments into ≤ MAX_CHUNK_CHARS SSML requests (the API caps
 * each response at 10 minutes of audio), synthesizes them with limited
 * concurrency and retries, and returns one concatenated MP3 buffer.
 */
import { BREAKS, CONCURRENCY, LOCALE_TAGS, MAX_CHUNK_CHARS, OUTPUT_FORMAT, VOICES } from "./config.mjs";
import { concatMp3 } from "./mp3.mjs";

const SENTENCE_RE = /(?<=[.!?…])\s+/u;
const RETRY_DELAYS_MS = [1000, 2000, 4000, 8000, 16000];

export function getCredentials(env = process.env) {
  const key = env.AZURE_SPEECH_KEY;
  const region = env.AZURE_SPEECH_REGION;
  if (!key || !region) {
    throw new Error("AZURE_SPEECH_KEY and AZURE_SPEECH_REGION must be set (see .env.example)");
  }
  return { key, region };
}

function splitLong(segment, max) {
  const out = [];
  let current = "";
  for (const sentence of segment.text.split(SENTENCE_RE)) {
    if (current && current.length + sentence.length + 1 > max) {
      out.push({ ...segment, text: current });
      current = sentence;
    } else {
      current = current ? `${current} ${sentence}` : sentence;
    }
  }
  if (current) out.push({ ...segment, text: current });
  return out;
}

/** Greedy packing that never splits a segment unless it alone exceeds the limit. */
export function packChunks(segments, max = MAX_CHUNK_CHARS) {
  const chunks = [];
  let current = [];
  let size = 0;
  for (const raw of segments) {
    const pieces = raw.text.length > max ? splitLong(raw, max) : [raw];
    for (const segment of pieces) {
      if (current.length && size + segment.text.length > max) {
        chunks.push(current);
        current = [];
        size = 0;
      }
      current.push(segment);
      size += segment.text.length;
    }
  }
  if (current.length) chunks.push(current);
  return chunks;
}

export function escapeXml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function toSsml(chunk, { voice, lang }) {
  const parts = chunk.map((segment, index) => {
    const text = escapeXml(segment.text);
    const before =
      segment.kind === "heading" && index > 0 ? `<break time="${BREAKS.heading}"/>` : "";
    const after =
      segment.kind === "title"
        ? `<break time="${BREAKS.title}"/>`
        : segment.kind === "heading"
          ? `<break time="${BREAKS.heading}"/>`
          : `<break time="${BREAKS.paragraph}"/>`;
    return `${before}${text}${after}`;
  });
  return (
    `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="${lang}">` +
    `<voice name="${voice}">${parts.join("")}</voice></speak>`
  );
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function synthesizeSsml(ssml, { key, region, format = OUTPUT_FORMAT, fetchImpl = fetch }) {
  const url = `https://${region}.tts.speech.microsoft.com/cognitiveservices/v1`;
  let lastError;
  for (let attempt = 0; attempt <= RETRY_DELAYS_MS.length; attempt++) {
    if (attempt > 0) await sleep(RETRY_DELAYS_MS[attempt - 1]);
    let response;
    try {
      response = await fetchImpl(url, {
        method: "POST",
        headers: {
          "Ocp-Apim-Subscription-Key": key,
          "Content-Type": "application/ssml+xml",
          "X-Microsoft-OutputFormat": format,
          "User-Agent": "undefined-shell-audio",
        },
        body: ssml,
      });
    } catch (error) {
      lastError = error; // network failure: retry
      continue;
    }
    if (response.ok) return Buffer.from(await response.arrayBuffer());
    const body = await response.text().catch(() => "");
    lastError = new Error(`Azure TTS ${response.status} ${response.statusText}: ${body.slice(0, 300)}`);
    const retryable = response.status === 429 || response.status >= 500;
    if (!retryable) throw lastError;
  }
  throw lastError;
}

async function mapWithConcurrency(items, limit, worker) {
  const results = new Array(items.length);
  let next = 0;
  const runners = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (next < items.length) {
      const index = next++;
      results[index] = await worker(items[index], index);
    }
  });
  await Promise.all(runners);
  return results;
}

/**
 * @param {{ segments: {kind: string, text: string}[], locale: "es"|"en", voice?: string }} input
 * @returns {Promise<{ audio: Buffer, chunks: number }>}
 */
export async function synthesizeNarration({ segments, locale, voice = VOICES[locale], credentials, fetchImpl }) {
  const lang = LOCALE_TAGS[locale];
  const chunks = packChunks(segments);
  const buffers = await mapWithConcurrency(chunks, CONCURRENCY, (chunk) =>
    synthesizeSsml(toSsml(chunk, { voice, lang }), { ...credentials, fetchImpl })
  );
  return { audio: concatMp3(buffers), chunks: chunks.length };
}

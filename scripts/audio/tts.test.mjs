import { test } from "node:test";
import assert from "node:assert/strict";
import { escapeXml, packChunks, synthesizeSsml, toSsml } from "./tts.mjs";
import { mp3Duration, stripId3, concatMp3 } from "./mp3.mjs";

const seg = (text, kind = "paragraph") => ({ kind, text });

test("packChunks never splits a segment that fits and respects the limit", () => {
  const segments = [seg("a".repeat(60)), seg("b".repeat(60)), seg("c".repeat(30)), seg("d".repeat(100))];
  const chunks = packChunks(segments, 100);
  assert.deepEqual(
    chunks.map((c) => c.map((s) => s.text.length)),
    [[60], [60, 30], [100]]
  );
  for (const chunk of chunks) assert.ok(chunk.reduce((n, s) => n + s.text.length, 0) <= 100);
});

test("packChunks splits an oversized segment at sentence boundaries", () => {
  const long = "One sentence here. Second sentence here! Third one? Fourth.";
  const chunks = packChunks([seg(long)], 30);
  const joined = chunks.flat().map((s) => s.text);
  assert.deepEqual(joined, ["One sentence here.", "Second sentence here!", "Third one? Fourth."]);
});

test("toSsml escapes text and wraps the voice", () => {
  const ssml = toSsml([seg("Título", "title"), seg("a < b & \"c\"")], { voice: "v", lang: "es-MX" });
  assert.match(ssml, /^<speak version="1.0" xmlns="http:\/\/www.w3.org\/2001\/10\/synthesis" xml:lang="es-MX"><voice name="v">/);
  assert.ok(ssml.includes("a &lt; b &amp; &quot;c&quot;"));
  assert.ok(ssml.includes('Título<break time="1200ms"/>'));
  assert.equal(escapeXml("'"), "&apos;");
});

test("synthesizeSsml retries on 429 and then succeeds", async () => {
  let calls = 0;
  const fetchImpl = async () => {
    calls++;
    if (calls < 3) return new Response("slow down", { status: 429, statusText: "Too Many Requests" });
    return new Response(new Uint8Array([1, 2, 3]), { status: 200 });
  };
  const started = Date.now();
  const audio = await synthesizeSsml("<speak/>", { key: "k", region: "r", fetchImpl });
  assert.deepEqual([...audio], [1, 2, 3]);
  assert.equal(calls, 3);
  assert.ok(Date.now() - started >= 3000, "backoff waited between attempts");
});

test("synthesizeSsml does not retry on 400", async () => {
  let calls = 0;
  const fetchImpl = async () => {
    calls++;
    return new Response("bad ssml", { status: 400, statusText: "Bad Request" });
  };
  await assert.rejects(synthesizeSsml("<speak/>", { key: "k", region: "r", fetchImpl }), /400/);
  assert.equal(calls, 1);
});

/** Build a fake CBR MPEG-2 Layer III stream: 24 kHz, 48 kbps → 144-byte frames of 576 samples. */
function fakeMp3(frames) {
  const frame = Buffer.alloc(144);
  frame[0] = 0xff;
  frame[1] = 0xf3; // MPEG-2, Layer III, no CRC
  frame[2] = 0x64; // bitrate index 6 (48 kbps), sample rate index 1 (24 kHz), no padding
  return Buffer.concat(Array.from({ length: frames }, () => frame));
}

test("mp3Duration walks frames and ignores ID3 tags", () => {
  const twoSeconds = fakeMp3(Math.round(2 * 24000 / 576));
  assert.ok(Math.abs(mp3Duration(twoSeconds) - 2) < 0.03);
  const id3 = Buffer.concat([Buffer.from("ID3\x04\x00\x00\x00\x00\x00\x0a", "latin1"), Buffer.alloc(10), twoSeconds]);
  assert.equal(stripId3(id3).length, twoSeconds.length);
  assert.ok(Math.abs(mp3Duration(concatMp3([id3, twoSeconds])) - 4) < 0.05);
});

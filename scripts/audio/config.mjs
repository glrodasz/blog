/**
 * Tunables for the audio narration pipeline.
 *
 * Voice, output format and NARRATION_VERSION are part of the content hash, so
 * changing any of them regenerates every post on the next run.
 */

/** Azure Speech voice per locale. Run `yarn audio:audition` to compare candidates. */
export const VOICES = {
  es: "es-MX-Tristan:DragonHDLatestNeural",
  en: "en-US-Andrew:DragonHDLatestNeural",
};

/** BCP-47 tag used for the SSML `xml:lang` attribute. */
export const LOCALE_TAGS = {
  es: "es-MX",
  en: "en-US",
};

/** ~0.36 MB per minute; speech does not need more than this. */
export const OUTPUT_FORMAT = "audio-24khz-48kbitrate-mono-mp3";

/** Bump when narration rules change in a way that should re-render existing audio. */
export const NARRATION_VERSION = 1;

/** Characters per synthesis request. ~2.5k chars is ~3 min of audio, far below the 10 min cap. */
export const MAX_CHUNK_CHARS = 2500;

/** Parallel synthesis requests per post. */
export const CONCURRENCY = 2;

/** Pause lengths inserted between segments (SSML <break>). */
export const BREAKS = {
  paragraph: "500ms",
  heading: "900ms",
  title: "1200ms",
};

/** Phrases spoken in place of non-text content. */
export const PHRASES = {
  es: {
    image: "Imagen:",
    codeBlock: "Aquí el artículo muestra un ejemplo de código.",
    codepen: "Aquí el artículo incluye un ejemplo interactivo en CodePen.",
  },
  en: {
    image: "Image:",
    codeBlock: "Here the written article shows a code example.",
    codepen: "Here the written article embeds an interactive CodePen example.",
  },
};

export const MANIFEST_PATH = "src/data/audio-manifest.json";
export const AUDIO_DIR = "public/audio";

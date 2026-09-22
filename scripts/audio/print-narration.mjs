/**
 * Print the narration text for one post, to review what will be read aloud.
 *   node scripts/audio/print-narration.mjs es/que-es-un-algoritmo
 *   node scripts/audio/print-narration.mjs es/que-es-un-algoritmo --ssml
 *
 * `--ssml` prints the SSML instead, which shows which terms are wrapped in
 * `<lang xml:lang="en-US">` (see ENGLISH_TERMS in config.mjs) without spending
 * anything on synthesis.
 */
import { relative } from "node:path";
import { ENGLISH_TERMS, LOCALE_TAGS, VOICES } from "./config.mjs";
import { buildNarration } from "./narration.mjs";
import { ROOT, listPosts } from "./posts.mjs";
import { packChunks, toSsml } from "./tts.mjs";

const args = process.argv.slice(2);
const ssmlOnly = args.includes("--ssml");
const key = args.find((arg) => !arg.startsWith("--"));
const post = listPosts().find((p) => p.key === key);
if (!post) {
  console.error(
    `Usage: node scripts/audio/print-narration.mjs <locale/slug>\nUnknown post "${key ?? ""}"`,
  );
  process.exit(1);
}

const narration = buildNarration({
  markdown: post.raw,
  locale: post.locale,
  file: relative(ROOT, post.file),
});
const chunks = packChunks(narration.segments);
if (ssmlOnly) {
  for (const chunk of chunks) {
    console.log(
      toSsml(chunk, {
        voice: VOICES[post.locale],
        lang: LOCALE_TAGS[post.locale],
        englishTerms: ENGLISH_TERMS[post.locale] ?? [],
      }),
      "\n",
    );
  }
} else {
  for (const segment of narration.segments) {
    const prefix = segment.kind === "paragraph" ? "" : `[${segment.kind}] `;
    console.log(`${prefix}${segment.text}\n`);
  }
}
console.error(
  `— ${narration.chars.toLocaleString("en-US")} characters, ${narration.segments.length} segments, ${chunks.length} request(s)`,
);

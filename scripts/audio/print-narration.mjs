/**
 * Print the narration text for one post, to review what will be read aloud.
 *   node scripts/audio/print-narration.mjs es/que-es-un-algoritmo
 */
import { relative } from "node:path";
import { buildNarration } from "./narration.mjs";
import { ROOT, listPosts } from "./posts.mjs";
import { packChunks } from "./tts.mjs";

const key = process.argv[2];
const post = listPosts().find((p) => p.key === key);
if (!post) {
  console.error(`Usage: node scripts/audio/print-narration.mjs <locale/slug>\nUnknown post "${key ?? ""}"`);
  process.exit(1);
}

const narration = buildNarration({ markdown: post.raw, locale: post.locale, file: relative(ROOT, post.file) });
const chunks = packChunks(narration.segments);
for (const segment of narration.segments) {
  const prefix = segment.kind === "paragraph" ? "" : `[${segment.kind}] `;
  console.log(`${prefix}${segment.text}\n`);
}
console.error(`— ${narration.chars.toLocaleString("en-US")} characters, ${narration.segments.length} segments, ${chunks.length} request(s)`);

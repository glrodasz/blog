/**
 * Fail when any post image has neither alt text nor an <!-- audio: ... --> override.
 * Runs in CI so alt-less images never reach main (they would break narration).
 */
import { relative } from "node:path";
import { buildNarration, NarrationError } from "./narration.mjs";
import { ROOT, listPosts } from "./posts.mjs";

const problems = [];
for (const post of listPosts()) {
  try {
    buildNarration({ markdown: post.raw, locale: post.locale, file: relative(ROOT, post.file) });
  } catch (error) {
    if (error instanceof NarrationError) problems.push(error.message);
    else throw error;
  }
}

if (problems.length) {
  console.error("Posts that cannot be narrated:\n");
  for (const problem of problems) console.error(`  ${problem}`);
  console.error("\nAdd alt text to the image, or an <!-- audio: description --> comment on the next line.");
  process.exit(1);
}
console.log(`✓ every post can be narrated`);

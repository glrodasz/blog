import { test } from "node:test";
import assert from "node:assert/strict";
import { relative } from "node:path";
import { contentHash } from "./generate.mjs";
import { ENGLISH_TERMS, VOICES } from "./config.mjs";
import { buildNarration } from "./narration.mjs";
import { ROOT, listPosts } from "./posts.mjs";

const narrationOf = (post) =>
  buildNarration({
    markdown: post.raw,
    locale: post.locale,
    file: relative(ROOT, post.file),
  }).text;

const hashOf = (post, englishTerms) =>
  contentHash({
    text: narrationOf(post),
    voice: VOICES[post.locale],
    englishTerms,
  });

// These check the glossary's effect on each post's hash, not the hashes stored
// in the manifest, which go stale on any post edit until the audio workflow runs.
test("a locale with no English terms hashes as if the glossary did not exist", () => {
  const posts = listPosts().filter((post) => post.locale === "en");
  assert.ok(posts.length > 0, "expected English posts");
  for (const post of posts)
    assert.equal(
      hashOf(post, ENGLISH_TERMS.en ?? []),
      hashOf(post, undefined),
      `${post.key} would be re-synthesized for no change`,
    );
});

test("the Spanish glossary changes the hash, so those posts regenerate", () => {
  const posts = listPosts().filter((post) => post.locale === "es");
  assert.ok(posts.length > 0, "expected Spanish posts");
  assert.ok(ENGLISH_TERMS.es?.length > 0, "expected a Spanish glossary");
  for (const post of posts)
    assert.notEqual(hashOf(post, ENGLISH_TERMS.es), hashOf(post, undefined));
});

test("editing the term list alone changes the hash", () => {
  const args = { text: "un framework", voice: "v" };
  assert.notEqual(
    contentHash({ ...args, englishTerms: ["framework"] }),
    contentHash({ ...args, englishTerms: ["framework", "deploy"] }),
  );
});

test("an empty term list hashes the same as passing none", () => {
  const args = { text: "un framework", voice: "v" };
  assert.equal(contentHash({ ...args, englishTerms: [] }), contentHash(args));
});

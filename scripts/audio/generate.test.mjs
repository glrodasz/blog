import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, relative } from "node:path";
import { contentHash } from "./generate.mjs";
import { ENGLISH_TERMS, MANIFEST_PATH, VOICES } from "./config.mjs";
import { buildNarration } from "./narration.mjs";
import { ROOT, listPosts } from "./posts.mjs";

const manifest = JSON.parse(readFileSync(join(ROOT, MANIFEST_PATH), "utf8"));

const hashOf = (post) =>
  contentHash({
    text: buildNarration({
      markdown: post.raw,
      locale: post.locale,
      file: relative(ROOT, post.file),
    }).text,
    voice: VOICES[post.locale],
    englishTerms: ENGLISH_TERMS[post.locale] ?? [],
  });

test("a locale with no English terms keeps the hashes already in the manifest", () => {
  const posts = listPosts().filter(
    (post) => post.locale === "en" && manifest[post.key],
  );
  assert.ok(posts.length > 0, "expected English posts in the manifest");
  for (const post of posts)
    assert.equal(
      hashOf(post),
      manifest[post.key].hash,
      `${post.key} would be re-synthesized for no change`,
    );
});

test("the Spanish glossary changes the hash, so those posts regenerate", () => {
  const posts = listPosts().filter(
    (post) => post.locale === "es" && manifest[post.key],
  );
  assert.ok(posts.length > 0, "expected Spanish posts in the manifest");
  for (const post of posts)
    assert.notEqual(hashOf(post), manifest[post.key].hash);
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

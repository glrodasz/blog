/**
 * Shared helpers to enumerate posts and read their frontmatter from disk.
 * Mirrors the approach in scripts/generate-og.mjs (no Astro runtime needed).
 */
import { readFileSync, readdirSync } from "node:fs";
import { join, dirname, extname, basename } from "node:path";
import { fileURLToPath } from "node:url";

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
export const LOCALES = ["en", "es"];

const FRONTMATTER_RE = /^---[\r\n]([\s\S]*?)[\r\n]---[\r\n]?/;

export function splitFrontmatter(raw) {
  const match = raw.match(FRONTMATTER_RE);
  if (!match) return { frontmatter: "", body: raw };
  return { frontmatter: match[1], body: raw.slice(match[0].length) };
}

/** Minimal scalar lookup in frontmatter; handles quoted and unquoted values. */
export function getFrontmatterValue(frontmatter, key) {
  const line = frontmatter.match(new RegExp(`^${key}:[ \\t]*(.*)$`, "m"))?.[1]?.trim();
  if (!line) return undefined;
  if (line.startsWith('"') && line.endsWith('"')) {
    return line.slice(1, -1).replace(/\\"/g, '"');
  }
  if (line.startsWith("'") && line.endsWith("'")) {
    return line.slice(1, -1).replace(/''/g, "'");
  }
  return line;
}

/** @returns {{ key: string, locale: string, slug: string, file: string, raw: string }[]} */
export function listPosts() {
  const posts = [];
  for (const locale of LOCALES) {
    const dir = join(ROOT, "src/content/posts", locale);
    for (const file of readdirSync(dir).sort()) {
      const ext = extname(file);
      if (ext !== ".md" && ext !== ".mdx") continue;
      const slug = basename(file, ext);
      posts.push({
        key: `${locale}/${slug}`,
        locale,
        slug,
        file: join(dir, file),
        raw: readFileSync(join(dir, file), "utf-8"),
      });
    }
  }
  return posts;
}

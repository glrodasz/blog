/**
 * Generate narration audio for every post whose narratable text changed.
 *
 *   node scripts/audio/generate.mjs [--force] [--dry-run] [--only <locale/slug>]
 *
 * Reads src/data/audio-manifest.json, compares a content hash per post, calls
 * Azure Speech for the stale ones, writes public/audio/<locale>/<slug>-<hash8>.mp3,
 * deletes superseded files and rewrites the manifest. Exit code 1 if any post
 * failed (the manifest still records the ones that succeeded).
 */
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";
import { AUDIO_DIR, MANIFEST_PATH, NARRATION_VERSION, OUTPUT_FORMAT, VOICES } from "./config.mjs";
import { buildNarration } from "./narration.mjs";
import { mp3Duration } from "./mp3.mjs";
import { ROOT, listPosts } from "./posts.mjs";
import { getCredentials, synthesizeNarration } from "./tts.mjs";

const args = process.argv.slice(2);
const FORCE = args.includes("--force");
const DRY_RUN = args.includes("--dry-run");
const ONLY = args.includes("--only") ? args[args.indexOf("--only") + 1] : undefined;

try {
  process.loadEnvFile(join(ROOT, ".env"));
} catch {
  // no local .env; CI provides env vars
}

const manifestFile = join(ROOT, MANIFEST_PATH);

export function readManifest() {
  return existsSync(manifestFile) ? JSON.parse(readFileSync(manifestFile, "utf-8")) : {};
}

export function writeManifest(manifest) {
  const sorted = Object.fromEntries(Object.keys(manifest).sort().map((key) => [key, manifest[key]]));
  writeFileSync(manifestFile, `${JSON.stringify(sorted, null, 2)}\n`);
}

export function contentHash({ text, voice }) {
  return createHash("sha256")
    .update(JSON.stringify({ v: NARRATION_VERSION, voice, format: OUTPUT_FORMAT, text }))
    .digest("hex");
}

const formatDuration = (seconds) => {
  const m = Math.floor(seconds / 60);
  const s = Math.round(seconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
};

async function main() {
  const manifest = readManifest();
  const posts = listPosts().filter((post) => !ONLY || post.key === ONLY);
  if (ONLY && posts.length === 0) throw new Error(`No post matches --only ${ONLY}`);

  const plan = [];
  for (const post of posts) {
    const narration = buildNarration({ markdown: post.raw, locale: post.locale, file: relative(ROOT, post.file) });
    const voice = VOICES[post.locale];
    const hash = contentHash({ text: narration.text, voice });
    const current = manifest[post.key];
    const fileExists = current?.file && existsSync(join(ROOT, "public", current.file));
    const stale = FORCE || !current || current.hash !== hash || !fileExists;
    plan.push({ post, narration, voice, hash, stale, current });
  }

  const stalePosts = plan.filter((p) => p.stale);
  const staleChars = stalePosts.reduce((n, p) => n + p.narration.chars, 0);
  console.log(
    `${stalePosts.length}/${plan.length} posts need audio (${staleChars.toLocaleString("en-US")} characters)` +
      (DRY_RUN ? " [dry run]" : "")
  );
  for (const p of plan) {
    console.log(`  ${p.stale ? "•" : "–"} ${p.post.key} ${p.stale ? "regenerate" : "unchanged"}`);
  }
  if (DRY_RUN) return;

  const failures = [];
  if (stalePosts.length > 0) {
    const credentials = getCredentials();
    for (const item of stalePosts) {
      const { post, narration, voice, hash, current } = item;
      try {
        const started = Date.now();
        const { audio, chunks } = await synthesizeNarration({ segments: narration.segments, locale: post.locale, voice, credentials });
        const durationSeconds = Math.round(mp3Duration(audio));
        const fileName = `${post.slug}-${hash.slice(0, 8)}.mp3`;
        const dir = join(ROOT, AUDIO_DIR, post.locale);
        mkdirSync(dir, { recursive: true });
        writeFileSync(join(dir, fileName), audio);
        if (current?.file && current.file !== `/audio/${post.locale}/${fileName}`) {
          rmSync(join(ROOT, "public", current.file), { force: true });
        }
        manifest[post.key] = {
          hash,
          voice,
          file: `/audio/${post.locale}/${fileName}`,
          durationSeconds,
          bytes: audio.length,
          chars: narration.chars,
          generatedAt: new Date().toISOString(),
        };
        console.log(
          `  ✓ ${post.key} (${formatDuration(durationSeconds)}, ${(audio.length / 1e6).toFixed(1)} MB, ${chunks} chunk${chunks === 1 ? "" : "s"}, ${Math.round((Date.now() - started) / 1000)}s)`
        );
      } catch (error) {
        failures.push(post.key);
        console.error(`  ✗ ${post.key}: ${error.message}`);
      }
    }
  }

  // Remove entries whose post no longer exists (only when running over the full set).
  if (!ONLY) {
    const known = new Set(posts.map((p) => p.key));
    for (const key of Object.keys(manifest)) {
      if (!known.has(key)) {
        rmSync(join(ROOT, "public", manifest[key].file), { force: true });
        delete manifest[key];
        console.log(`  – ${key} removed (post deleted)`);
      }
    }
  }

  writeManifest(manifest);
  if (failures.length) {
    throw new Error(`${failures.length} post(s) failed: ${failures.join(", ")}`);
  }
  console.log("Done.");
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});

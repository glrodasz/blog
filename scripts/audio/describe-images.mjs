/**
 * Draft alt text for post images that have none, using an Azure OpenAI vision
 * deployment, and write the suggestion into the markdown so it can be reviewed
 * as a normal diff. Never touches images that already have alt text.
 *
 *   node scripts/audio/describe-images.mjs [--dry-run]
 *
 * Env: AZURE_OPENAI_ENDPOINT (https://<resource>.openai.azure.com),
 *      AZURE_OPENAI_API_KEY, AZURE_OPENAI_DEPLOYMENT (a vision-capable model),
 *      AZURE_OPENAI_API_VERSION (optional, default 2024-10-21).
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { extname, join, relative } from "node:path";
import { ROOT, listPosts } from "./posts.mjs";

try {
  process.loadEnvFile(join(ROOT, ".env"));
} catch {}

const DRY_RUN = process.argv.includes("--dry-run");
const IMAGE_RE = /!\[\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;
const MIME = { ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp", ".gif": "image/gif" };

const LANGUAGE = {
  es: 'Spanish (Latin America, informal "tú")',
  en: "English",
};

function prompt(locale, before, after) {
  return (
    `You write alt text for images in a programming blog written in ${LANGUAGE[locale]}. ` +
    "Describe what the image shows in one or two sentences, so that someone listening to the article " +
    "without seeing it understands the same thing a reader would. Name shapes, labels, arrows and text " +
    'that appear in the image. Do not start with "image of" or "diagram of". Do not interpret or add ' +
    "information that is not visible.\n\n" +
    `Context before the image: «${before}»\nContext after the image: «${after}»\n\n` +
    "Reply with the alt text only, in the blog's language."
  );
}

async function describe({ locale, imagePath, before, after }) {
  const endpoint = process.env.AZURE_OPENAI_ENDPOINT?.replace(/\/$/, "");
  const key = process.env.AZURE_OPENAI_API_KEY;
  const deployment = process.env.AZURE_OPENAI_DEPLOYMENT;
  const apiVersion = process.env.AZURE_OPENAI_API_VERSION ?? "2024-10-21";
  if (!endpoint || !key || !deployment) {
    throw new Error("AZURE_OPENAI_ENDPOINT, AZURE_OPENAI_API_KEY and AZURE_OPENAI_DEPLOYMENT must be set");
  }
  const bytes = readFileSync(imagePath);
  const dataUrl = `data:${MIME[extname(imagePath).toLowerCase()] ?? "image/png"};base64,${bytes.toString("base64")}`;
  const response = await fetch(`${endpoint}/openai/deployments/${deployment}/chat/completions?api-version=${apiVersion}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "api-key": key },
    body: JSON.stringify({
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: prompt(locale, before, after) },
            { type: "image_url", image_url: { url: dataUrl, detail: "high" } },
          ],
        },
      ],
      max_tokens: 200,
      temperature: 0.2,
    }),
  });
  if (!response.ok) throw new Error(`Azure OpenAI ${response.status}: ${(await response.text()).slice(0, 300)}`);
  const json = await response.json();
  return json.choices?.[0]?.message?.content?.trim().replace(/\s+/g, " ").replace(/^"|"$/g, "") ?? "";
}

function context(raw, index) {
  const before = raw.slice(0, index).split(/\n\s*\n/).filter(Boolean).at(-1) ?? "";
  const after = raw.slice(index).split(/\n\s*\n/).filter(Boolean)[1] ?? "";
  return { before: before.trim().slice(-600), after: after.trim().slice(0, 600) };
}

let updated = 0;
for (const post of listPosts()) {
  const matches = [...post.raw.matchAll(IMAGE_RE)];
  if (matches.length === 0) continue;
  let raw = post.raw;
  let offset = 0;
  for (const match of matches) {
    const url = match[1];
    const imagePath = join(ROOT, "public", url);
    const label = `${relative(ROOT, post.file)} → ${url}`;
    if (!existsSync(imagePath)) {
      console.warn(`  ! ${label}: file not found, skipped`);
      continue;
    }
    const { before, after } = context(post.raw, match.index);
    const alt = await describe({ locale: post.locale, imagePath, before, after });
    if (!alt) {
      console.warn(`  ! ${label}: empty suggestion, skipped`);
      continue;
    }
    console.log(`  ✓ ${label}\n    ${alt}`);
    const replacement = match[0].replace("![]", `![${alt.replace(/\]/g, "\\]")}]`);
    const start = match.index + offset;
    raw = raw.slice(0, start) + replacement + raw.slice(start + match[0].length);
    offset += replacement.length - match[0].length;
    updated++;
  }
  if (!DRY_RUN && raw !== post.raw) writeFileSync(post.file, raw);
}
console.log(`${updated} image(s) described${DRY_RUN ? " (dry run, nothing written)" : ""}.`);

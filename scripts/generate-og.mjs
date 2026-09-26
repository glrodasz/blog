/**
 * Pre-build script: generates branded OG PNG images into public/og/
 * before astro build runs, so they are served as plain static files.
 * Run via: node scripts/generate-og.mjs
 */
import satori from "satori";
import sharp from "sharp";
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const fontData = readFileSync(join(ROOT, "public/fonts/atkinson-bold.woff"));
const logoData = readFileSync(join(ROOT, "public/android-chrome-192x192.png"));
const logoBase64 = `data:image/png;base64,${logoData.toString("base64")}`;
// Vector logo for the large podcast cover, where the 192 px PNG would blur.
const logoSvgData = readFileSync(join(ROOT, "public/favicon.svg"));
const logoSvgBase64 = `data:image/svg+xml;base64,${logoSvgData.toString("base64")}`;

const BG = "#1B262C";
const CYAN = "#35B6C8";
const LIGHT = "#E4EBEE";
const MUTED = "#7799AC";

// Mirrors src/utils/content.ts tagToSlug
function tagToSlug(tag) {
  return tag
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function extractTags(fileContent) {
  const fm = fileContent.match(/^---[\r\n]([\s\S]*?)[\r\n]---/)?.[1] ?? "";
  const inline = fm.match(/^tags:\s*\[([^\]]+)\]/m);
  if (inline)
    return inline[1]
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
  const block = fm.match(/^tags:[ \t]*[\r\n]((?:[ \t]*-[^\r\n]+[\r\n]?)*)/m);
  if (block)
    return [...block[1].matchAll(/(?<=- ).+/g)].map((m) => m[0].trim());
  return [];
}

function collectTags(locale) {
  const dir = join(ROOT, "src/content/posts", locale);
  const tagMap = new Map();
  for (const file of readdirSync(dir)) {
    if (!file.endsWith(".md") && !file.endsWith(".mdx")) continue;
    const content = readFileSync(join(dir, file), "utf-8");
    for (const tag of extractTags(content)) {
      tagMap.set(tagToSlug(tag), tag);
    }
  }
  return tagMap;
}

async function makeImage(opts) {
  const { variant, title, subtitle, width = 1200, height = 630 } = opts;
  const templates = {
    brand: brandTemplate,
    content: contentTemplate,
    podcast: podcastTemplate,
  };
  const element = templates[variant](title, subtitle);
  const svg = await satori(element, {
    width,
    height,
    fonts: [{ name: "Atkinson", data: fontData, weight: 700, style: "normal" }],
  });
  // Flatten to RGB: podcast directories reject artwork with an alpha channel.
  return sharp(Buffer.from(svg)).flatten({ background: BG }).png().toBuffer();
}

function brandTemplate(title, subtitle) {
  return {
    type: "div",
    props: {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: BG,
        background: `radial-gradient(ellipse at 60% 40%, #1a3a42 0%, ${BG} 60%, #0D2E32 100%)`,
        padding: "80px",
        gap: "28px",
        fontFamily: "Atkinson",
      },
      children: [
        {
          type: "img",
          props: {
            src: logoBase64,
            width: 96,
            height: 96,
            style: { borderRadius: "16px" },
          },
        },
        {
          type: "div",
          props: {
            style: {
              color: LIGHT,
              fontSize: "52px",
              fontWeight: 700,
              textAlign: "center",
              lineHeight: 1.1,
            },
            children: title,
          },
        },
        subtitle
          ? {
              type: "div",
              props: {
                style: {
                  color: CYAN,
                  fontSize: "28px",
                  fontWeight: 700,
                  textAlign: "center",
                  lineHeight: 1.3,
                  maxWidth: "800px",
                },
                children: subtitle,
              },
            }
          : null,
      ].filter(Boolean),
    },
  };
}

function contentTemplate(title, subtitle) {
  return {
    type: "div",
    props: {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: BG,
        background: `radial-gradient(ellipse at 70% 30%, #1a3a42 0%, ${BG} 55%, #0D2E32 100%)`,
        padding: "64px 80px",
        fontFamily: "Atkinson",
      },
      children: [
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginBottom: "auto",
            },
            children: [
              {
                type: "img",
                props: {
                  src: logoBase64,
                  width: 56,
                  height: 56,
                  style: { borderRadius: "10px" },
                },
              },
              {
                type: "div",
                props: {
                  style: { color: MUTED, fontSize: "24px", fontWeight: 700 },
                  children: "Undefined Shell",
                },
              },
            ],
          },
        },
        {
          type: "div",
          props: {
            style: {
              color: LIGHT,
              fontSize: "68px",
              fontWeight: 700,
              lineHeight: 1.1,
              maxWidth: "900px",
            },
            children: title,
          },
        },
        subtitle
          ? {
              type: "div",
              props: {
                style: {
                  color: CYAN,
                  fontSize: "30px",
                  fontWeight: 700,
                  marginTop: "24px",
                },
                children: subtitle,
              },
            }
          : null,
      ].filter(Boolean),
    },
  };
}

// Square podcast cover (Apple Podcasts / Spotify ask for 1400–3000 px).
function podcastTemplate(title, subtitle) {
  return {
    type: "div",
    props: {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: BG,
        background: `radial-gradient(ellipse at 60% 35%, #1a3a42 0%, ${BG} 60%, #0D2E32 100%)`,
        padding: "240px",
        gap: "120px",
        fontFamily: "Atkinson",
      },
      children: [
        {
          type: "img",
          props: { src: logoSvgBase64, width: 1100, height: 1100 },
        },
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "56px",
            },
            children: [
              {
                type: "div",
                props: {
                  style: {
                    color: LIGHT,
                    fontSize: "280px",
                    fontWeight: 700,
                    textAlign: "center",
                    lineHeight: 1,
                  },
                  children: title,
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    color: CYAN,
                    fontSize: "150px",
                    fontWeight: 700,
                    textAlign: "center",
                    lineHeight: 1.1,
                  },
                  children: subtitle,
                },
              },
            ],
          },
        },
      ],
    },
  };
}

async function write(outPath, opts) {
  const buf = await makeImage(opts);
  writeFileSync(outPath, buf);
  console.log(`  ✓ ${outPath.replace(ROOT, "")}`);
}

async function main() {
  console.log("Generating OG images...");
  const ogDir = join(ROOT, "public/og");
  mkdirSync(join(ogDir, "es/tags"), { recursive: true });
  mkdirSync(join(ogDir, "tags"), { recursive: true });

  const en = {
    title: "Undefined Shell by Guillermo Rodas",
    sub: "Everything related to programming and web development",
  };
  const es = {
    title: "Undefined Shell by Guillermo Rodas",
    sub: "Todo sobre programación y desarrollo web",
  };

  await write(join(ogDir, "home.png"), {
    variant: "brand",
    title: en.title,
    subtitle: en.sub,
  });
  await write(join(ogDir, "es/home.png"), {
    variant: "brand",
    title: es.title,
    subtitle: es.sub,
  });
  await write(join(ogDir, "about.png"), {
    variant: "content",
    title: "About the blog",
    subtitle: en.sub,
  });
  await write(join(ogDir, "es/about.png"), {
    variant: "content",
    title: "Acerca del blog",
    subtitle: es.sub,
  });

  await write(join(ogDir, "podcast.png"), {
    variant: "podcast",
    title: "Undefined Shell",
    subtitle: "Podcast · English",
    width: 3000,
    height: 3000,
  });
  await write(join(ogDir, "es/podcast.png"), {
    variant: "podcast",
    title: "Undefined Shell",
    subtitle: "Podcast · Español",
    width: 3000,
    height: 3000,
  });

  for (const [slug, label] of collectTags("en")) {
    await write(join(ogDir, "tags", `${slug}.png`), {
      variant: "content",
      title: `#${label}`,
      subtitle: en.sub,
    });
  }
  for (const [slug, label] of collectTags("es")) {
    await write(join(ogDir, "es/tags", `${slug}.png`), {
      variant: "content",
      title: `#${label}`,
      subtitle: es.sub,
    });
  }

  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

/**
 * Deterministic markdown → narration text.
 *
 * Output is a list of segments (title, headings, paragraphs, image
 * descriptions, code placeholders) that tts.mjs packs into SSML chunks.
 * The same markdown always yields the same segments, which is what makes the
 * content hash in the manifest meaningful.
 */
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import { PHRASES } from "./config.mjs";
import { splitFrontmatter, getFrontmatterValue } from "./posts.mjs";

const AUDIO_OVERRIDE_RE = /^<!--\s*audio:\s*([\s\S]*?)\s*-->$/;
const URL_RE = /^(https?:\/\/|www\.)\S+$/i;
const EMOJI_RE = /\p{Extended_Pictographic}|\p{Emoji_Modifier}|\u{FE0F}|\u{200D}|\u{20E3}/gu;

export class NarrationError extends Error {
  constructor(message, { file, line } = {}) {
    super(file ? `${file}:${line ?? "?"}: ${message}` : message);
    this.name = "NarrationError";
    this.file = file;
    this.line = line;
  }
}

/** Drop MDX imports and turn <CodePen /> embeds into a spoken phrase (see CopyArticleButton.astro). */
function preClean(body, locale) {
  return body
    .replace(/^import\s+\w+\s+from\s+["'][^"']+\.astro["'];?\s*$/gm, "")
    .replace(/<CodePen\b[^>]*\/>/g, `\n\n${PHRASES[locale].codepen}\n\n`);
}

function normalize(text) {
  return text
    .replace(EMOJI_RE, "")
    .replace(/(?:https?:\/\/|www\.)\S+/gi, "")
    .replace(/\s+/g, " ")
    .trim();
}

function comparable(text) {
  return normalize(text)
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "");
}

/** Inline content → plain text. Images are handled by the caller. */
function inlineText(node) {
  switch (node.type) {
    case "text":
    case "inlineCode":
      return node.value;
    case "break":
      return " ";
    case "footnoteReference":
    case "html":
    case "image":
    case "imageReference":
      return "";
    case "link": {
      const text = (node.children ?? []).map(inlineText).join("");
      return URL_RE.test(text.trim()) ? "" : text; // bare URLs are not worth hearing
    }
    default:
      return (node.children ?? []).map(inlineText).join("");
  }
}

function audioOverride(node) {
  if (!node || node.type !== "html") return undefined;
  const match = node.value.trim().match(AUDIO_OVERRIDE_RE);
  return match ? match[1] : undefined;
}

export function buildNarration({ markdown, locale, file }) {
  const phrases = PHRASES[locale];
  if (!phrases) throw new NarrationError(`Unsupported locale "${locale}"`, { file });

  const { frontmatter, body } = splitFrontmatter(markdown);
  const title = normalize(getFrontmatterValue(frontmatter, "title") ?? "");
  if (!title) throw new NarrationError("Post has no title", { file });

  const lineOffset = markdown.length - body.length ? markdown.slice(0, markdown.length - body.length).split("\n").length - 1 : 0;
  const tree = unified().use(remarkParse).use(remarkGfm).parse(preClean(body, locale));
  const segments = [{ kind: "title", text: title }];

  const push = (kind, text) => {
    const clean = normalize(text);
    if (clean) segments.push({ kind, text: clean });
  };

  const walkBlocks = (nodes, { inList = false } = {}) => {
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      switch (node.type) {
        case "heading":
          push("heading", inlineText(node));
          break;
        case "paragraph": {
          const consumed = walkParagraph(node, nodes[i + 1]);
          if (consumed) i++;
          break;
        }
        case "blockquote":
          walkBlocks(node.children);
          break;
        case "list":
          for (const item of node.children) {
            const parts = [];
            for (const child of item.children) {
              if (child.type === "paragraph") parts.push(inlineText(child));
              else if (child.type === "list") {
                walkBlocks([child], { inList: true });
              }
            }
            push("paragraph", parts.join(" "));
          }
          break;
        case "code": {
          const last = segments[segments.length - 1];
          if (!last || last.kind !== "code") push("code", phrases.codeBlock);
          break;
        }
        case "html":
        case "thematicBreak":
        case "footnoteDefinition":
        case "definition":
        case "table":
        case "yaml":
          break;
        default:
          if (node.children) walkBlocks(node.children, { inList });
      }
    }
  };

  /** Returns true when the next sibling block was consumed as an audio override. */
  const walkParagraph = (paragraph, nextBlock) => {
    const children = paragraph.children;
    if (!children.some((c) => c.type === "image")) {
      push("paragraph", inlineText(paragraph));
      return false;
    }

    let consumedNext = false;
    let caption = [];
    const flushCaption = () => {
      const text = caption.map(inlineText).join("");
      caption = [];
      return text;
    };

    let pendingAlt;
    const flushImage = (captionText) => {
      if (pendingAlt === undefined) return;
      const alt = pendingAlt;
      pendingAlt = undefined;
      const dup =
        captionText && (comparable(captionText) === comparable(alt) || comparable(captionText).includes(comparable(alt)));
      if (!dup) push("image", `${phrases.image} ${alt}`);
    };

    for (let j = 0; j < children.length; j++) {
      const child = children[j];
      if (child.type !== "image") {
        const override = audioOverride(child);
        if (override !== undefined && pendingAlt !== undefined) {
          pendingAlt = override;
          continue;
        }
        caption.push(child);
        continue;
      }

      // A new image: emit whatever preceded it.
      const before = flushCaption();
      flushImage(before);
      push("paragraph", before);

      let alt = normalize(child.alt ?? "");
      const nextInline = children[j + 1];
      const inlineOverride = audioOverride(nextInline);
      if (inlineOverride !== undefined) {
        alt = normalize(inlineOverride);
        j++;
      } else if (j === children.length - 1) {
        const blockOverride = audioOverride(nextBlock);
        if (blockOverride !== undefined) {
          alt = normalize(blockOverride);
          consumedNext = true;
        }
      }
      if (!alt) {
        throw new NarrationError(
          `Image ${child.url} has no alt text and no <!-- audio: ... --> override`,
          { file, line: child.position ? child.position.start.line + lineOffset : undefined }
        );
      }
      pendingAlt = alt;
    }

    const trailing = flushCaption();
    flushImage(trailing);
    push("paragraph", trailing);
    return consumedNext;
  };

  walkBlocks(tree.children);

  return {
    title,
    segments,
    text: segments.map((s) => s.text).join("\n\n"),
    chars: segments.reduce((n, s) => n + s.text.length, 0),
  };
}

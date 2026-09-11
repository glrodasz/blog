import { test } from "node:test";
import assert from "node:assert/strict";
import { relative } from "node:path";
import { buildNarration, NarrationError } from "./narration.mjs";
import { ROOT, listPosts } from "./posts.mjs";

const fm = (title = "Hola mundo") => `---\ntitle: "${title}"\npubDate: "2025-01-01"\n---\n\n`;
const kinds = (n) => n.segments.map((s) => s.kind);
const texts = (n) => n.segments.map((s) => s.text);

test("title comes first, headings and paragraphs keep order", () => {
  const n = buildNarration({ locale: "es", markdown: `${fm()}Primer párrafo.\n\n## Sección\n\nSegundo **párrafo** con *énfasis*.` });
  assert.deepEqual(kinds(n), ["title", "paragraph", "heading", "paragraph"]);
  assert.deepEqual(texts(n), ["Hola mundo", "Primer párrafo.", "Sección", "Segundo párrafo con énfasis."]);
});

test("image with alt is narrated with the locale phrase", () => {
  const n = buildNarration({ locale: "en", markdown: `${fm("T")}Intro.\n\n![A cat on a sofa](/images/cat.png)\n\nAfter.` });
  assert.deepEqual(texts(n), ["T", "Intro.", "Image: A cat on a sofa", "After."]);
});

test("<!-- audio: --> comment on the next line overrides the alt text", () => {
  const md = `${fm("T")}![short alt](/images/x.png)\n<!-- audio: Long spoken description of the picture. -->\n\nNext.`;
  const n = buildNarration({ locale: "en", markdown: md });
  assert.deepEqual(texts(n), ["T", "Image: Long spoken description of the picture.", "Next."]);
});

test("<!-- audio: --> comment as a separate block also overrides", () => {
  const md = `${fm("T")}![short alt](/images/x.png)\n\n<!-- audio: Block override. -->\n\nNext.`;
  const n = buildNarration({ locale: "en", markdown: md });
  assert.deepEqual(texts(n), ["T", "Image: Block override.", "Next."]);
});

test("caption that repeats the alt is read once", () => {
  const md = `${fm("T")}![Figure 1: Hand pointing to the middle card.](/i.jpg)_**Figure 1**: Hand pointing to the middle card._\nWe continue.`;
  const n = buildNarration({ locale: "en", markdown: md });
  assert.deepEqual(texts(n), ["T", "Figure 1: Hand pointing to the middle card. We continue."]);
});

test("caption that differs from the alt is read after it", () => {
  const md = `${fm("T")}![Photo of Hamilton next to a stack of listings.](/i.jpg)\n*Hamilton in 1969.*`;
  const n = buildNarration({ locale: "en", markdown: md });
  assert.deepEqual(texts(n), ["T", "Image: Photo of Hamilton next to a stack of listings.", "Hamilton in 1969."]);
});

test("empty alt without override throws with file and line", () => {
  assert.throws(
    () => buildNarration({ locale: "es", file: "post.md", markdown: `${fm()}Texto.\n\n![](/images/x.png)` }),
    (error) => error instanceof NarrationError && /post\.md:8:/.test(error.message)
  );
});

test("fenced code blocks become one phrase, consecutive blocks collapse", () => {
  const md = `${fm("T")}Look:\n\n\`\`\`js\nconst a = 1;\n\`\`\`\n\n\`\`\`js\nconst b = 2;\n\`\`\`\n\nDone \`inline\`.`;
  const n = buildNarration({ locale: "en", markdown: md });
  assert.deepEqual(texts(n), ["T", "Look:", "Here the written article shows a code example.", "Done inline."]);
});

test("footnotes, bare urls and emoji are dropped, links keep their text", () => {
  const md = `${fm("T")}Hi[^1] 🧠 see [the docs](https://x.y) or https://example.com.\n\n- https://only-a-link.com\n\n[^1]: A footnote.`;
  const n = buildNarration({ locale: "en", markdown: md });
  assert.deepEqual(texts(n), ["T", "Hi see the docs or ."]);
});

test("lists read each item, blockquotes read their text", () => {
  const md = `${fm("T")}> 🧠 **Term** is a thing.\n\n* one\n* two **bold**\n\n1. first\n2. second`;
  const n = buildNarration({ locale: "en", markdown: md });
  assert.deepEqual(texts(n), ["T", "Term is a thing.", "one", "two bold", "first", "second"]);
});

test("MDX imports are dropped and CodePen embeds become a phrase", () => {
  const md = `${fm("T")}import CodePen from "../../../components/CodePen.astro";\n\nText.\n\n<CodePen user="u" slug="s" title="Demo" />\n\nMore.`;
  const n = buildNarration({ locale: "es", markdown: md });
  assert.deepEqual(texts(n), ["T", "Text.", "Aquí el artículo incluye un ejemplo interactivo en CodePen.", "More."]);
});

test("output is deterministic", () => {
  const post = listPosts()[0];
  const a = buildNarration({ markdown: post.raw, locale: post.locale });
  const b = buildNarration({ markdown: post.raw, locale: post.locale });
  assert.equal(a.text, b.text);
});

test("every real post can be narrated", () => {
  for (const post of listPosts()) {
    const n = buildNarration({ markdown: post.raw, locale: post.locale, file: relative(ROOT, post.file) });
    assert.ok(n.chars > 200, `${post.key} looks empty`);
    assert.equal(n.segments[0].kind, "title");
  }
});

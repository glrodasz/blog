import { test } from "node:test";
import assert from "node:assert/strict";
import { buildEnglishPattern, splitEnglishRuns } from "./code-switch.mjs";
import { ENGLISH_TERMS } from "./config.mjs";

const runs = (text, terms) =>
  splitEnglishRuns(text, buildEnglishPattern(terms));

test("no terms leaves the text as a single Spanish run", () => {
  assert.deepEqual(runs("Un algoritmo cualquiera", []), [
    { text: "Un algoritmo cualquiera", english: false },
  ]);
});

test("matches whole terms only, keeping the original casing", () => {
  assert.deepEqual(runs("Abrí un Pull Request hoy", ["pull request"]), [
    { text: "Abrí un ", english: false },
    { text: "Pull Request", english: true },
    { text: " hoy", english: false },
  ]);
});

test("a term does not match inside a longer word", () => {
  assert.deepEqual(runs("los frameworks modernos", ["framework"]), [
    { text: "los frameworks modernos", english: false },
  ]);
  assert.deepEqual(runs("con lit-html", ["html"]), [
    { text: "con lit-html", english: false },
  ]);
});

test("the longest term wins when two overlap", () => {
  const out = runs("hablemos de design tokens", ["design", "design tokens"]);
  assert.deepEqual(out.at(-1), { text: "design tokens", english: true });
});

test("multi-word terms tolerate any whitespace between words", () => {
  const out = runs("un design\n  tokens raro", ["design tokens"]);
  assert.deepEqual(out[1], { text: "design\n  tokens", english: true });
});

test("dots in a term are literal, not wildcards", () => {
  assert.deepEqual(runs("uso NodeXjs", ["Node.js"]), [
    { text: "uso NodeXjs", english: false },
  ]);
  assert.deepEqual(runs("uso node.js", ["Node.js"])[1], {
    text: "node.js",
    english: true,
  });
});

test("consecutive terms stay separate runs", () => {
  const out = runs("React y Vue", ["React", "Vue"]);
  assert.deepEqual(
    out.map((r) => r.english),
    [true, false, true],
  );
});

test("the shipped Spanish list leaves absorbed words and acronyms alone", () => {
  const text =
    "La web, el software y el blog usan HTML, CSS y una API por HTTP en internet.";
  assert.deepEqual(runs(text, ENGLISH_TERMS.es), [{ text, english: false }]);
});

test("the shipped Spanish list catches the tech terms of a real sentence", () => {
  const out = runs(
    "El framework compila los design tokens en el build antes del deploy.",
    ENGLISH_TERMS.es,
  );
  assert.deepEqual(
    out.filter((r) => r.english).map((r) => r.text),
    ["framework", "design tokens", "build", "deploy"],
  );
});

test("English posts get no wrapping", () => {
  assert.deepEqual(ENGLISH_TERMS.en, []);
});

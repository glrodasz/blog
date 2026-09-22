/**
 * English terms inside Spanish narration.
 *
 * Azure's multilingual voices pick the language per sentence, not per word, so
 * a lone English term in a Spanish paragraph comes out with Spanish phonetics
 * ("React" as "rre-act", "deploy" as "de-plói"). Wrapping just that term in
 * `<lang xml:lang="en-US">` switches the pronunciation for those characters
 * only — the element works at word level, and only multilingual voices support
 * it. See config.mjs for the term list and why acronyms stay out of it.
 */

/**
 * No letter, digit, underscore or hyphen on either side of a term, so
 * `framework` does not match inside `frameworks` and `html` does not match
 * inside `lit-html`. Plurals are listed explicitly in the term list.
 */
const EDGE_BEFORE = "(?<![\\p{L}\\p{N}_-])";
const EDGE_AFTER = "(?![\\p{L}\\p{N}_-])";

function escapeRegExp(term) {
  return term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * @param {string[]} terms
 * @returns {RegExp | null} Matches any term, longest first; null when there is
 *   nothing to match.
 */
export function buildEnglishPattern(terms = []) {
  if (!terms.length) return null;
  const alternatives = [...terms]
    .sort((a, b) => b.length - a.length)
    .map((term) => escapeRegExp(term).replace(/\s+/g, "\\s+"));
  return new RegExp(
    `${EDGE_BEFORE}(?:${alternatives.join("|")})${EDGE_AFTER}`,
    "giu",
  );
}

/**
 * Splits text into consecutive runs, flagging the ones to speak in English.
 * Casing and spacing of the original text are preserved.
 *
 * @param {string} text
 * @param {RegExp | null} pattern from buildEnglishPattern
 * @returns {{ text: string, english: boolean }[]}
 */
export function splitEnglishRuns(text, pattern) {
  if (!pattern) return text ? [{ text, english: false }] : [];
  const runs = [];
  let index = 0;
  for (const match of text.matchAll(pattern)) {
    if (match.index > index)
      runs.push({ text: text.slice(index, match.index), english: false });
    runs.push({ text: match[0], english: true });
    index = match.index + match[0].length;
  }
  if (index < text.length)
    runs.push({ text: text.slice(index), english: false });
  return runs;
}

/**
 * Fold accents/diacritics for substring search (e.g. "musica" matches "música").
 */
export function normalizeForSearch(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "");
}

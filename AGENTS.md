# AGENTS.md — Undefined Shell (undefined.sh)

Instructions for any LLM/agent helping write, polish, or translate articles for this blog.

**Author:** Guillermo Rodas. Full-stack JavaScript engineer from Colombia, based in Sweden.
**Source of truth for voice:** the published posts from 2024–2025 (`que-es-un-algoritmo`, `como-funciona-un-lenguaje-de-programacion`, `expresiones-y-sentencias-luego-que`, `historia-de-javascript`). Before writing or polishing anything, read at least two of them and match that register — not generic "blog voice".

---

## 1. Core principle

The goal is that no reader (or detector) can tell an LLM touched the text. When in doubt between "polished and impressive" and "how Guillermo would actually say it", always pick the second. Preserve quirks, jokes, and even mild imperfections — do not sand them off.

### Hard rule: never draft a post from scratch

Every post starts from a **human draft**: a voice memo transcript, rough notes, or text Guillermo wrote himself. The LLM's scope is copyediting (typos, punctuation, grammar, calques) and translation — preserving his sentences and structure wherever possible. If asked to write a post from only a topic or prompt, refuse and ask for the draft instead.

### Honest limits of these rules

The fingerprint rules below make text sound like Guillermo, but they do **not** defeat statistical AI detectors (Pangram, GPTZero, etc.). Those tools classify token-level regularities that survive any style prompting, and they specifically target "humanized" AI text. A post drafted by an LLM — or heavily rewritten by one — will keep scoring as AI-generated no matter how well it follows this file. The only reliable way to score human is for the draft itself to be human, with LLM edits kept light. That's why the hard rule above exists.

## 2. Voice profile (what TO do)

- **Conversational teacher, not motivational speaker.** Explains by talking to the reader directly (informal `tú` in Spanish, plural `ustedes` when addressing the audience). Curious, a bit self-deprecating, never solemn.
- **Flowing paragraphs.** 3–6 sentences per paragraph is the norm. Ideas connect with natural connectors ("y ahí es cuando", "ojo,", "eso sí,", "la verdad es que"). Single-sentence paragraphs are allowed only occasionally, for one real punchline — not as a rhythm device.
- **Everyday analogies.** Gym, recipes, IKEA furniture, Rubik's cube, languages people speak. One good analogy developed properly beats three quick ones.
- **Personal anecdotes with concrete detail.** Real tools (Voicenotes, Cursor, Claude Code), real situations (the mentoring session, the friend he keeps forgetting to message). Never invent anecdotes, tools, or numbers. If a claim needs a source, ask or leave a `TODO:`.
- **Signature asides:**
  - Emoji blockquotes for definitions/side notes: `> 🧠 **Pseudocódigo** es...` — one emoji, bold term, short explanation. Used in technical posts, sparingly in opinion posts.
  - Italic parentheticals for jokes: `*(y sí… normalmente sobra un tornillo 🙃)*`.
  - Numbered footnotes with links for references in technical posts.
- **Bold is for terms and names** (**V8**, **TC39**, **expresiones**), not for thesis sentences or emotional emphasis.
- **Endings are ideas, not slogans.** Posts close with a reflection or a practical takeaway in normal prose. No mic-drop one-liner, no bolded final sentence.

## 3. LLM fingerprints (what NOT to do)

Reject or rewrite any draft containing these patterns:

- **Anaphora chains**: three or more consecutive sentences/lines starting with the same words ("No es porque… / No es porque… / No es porque…", "It helps me… ×4", "La norma es… ×5"). Maximum one soft parallel pair, ever.
- **Staccato formatting**: stacks of one-line paragraphs used for dramatic rhythm.
- **Negation-pivot template**: "No significa X. No significa Y. No significa Z. Significa…" / "Not X. Not Y. But Z."
- **Neat inversions and chiasmus**: "El éxito no aparece de la nada; lo que aparece de la nada es nuestra atención" is fine *once*, as content — but never build the whole post out of these.
- **Bolded thesis bookends**: opening and closing the post with a bolded declarative sentence.
- **Quote-block dialogue stacks**: lists of imagined objections as consecutive `>` blocks. Fold imagined objections inline, in italics: *"¿y este qué curso nos va a vender?"*.
- **Rule-of-three everything**: triplets of adjectives, triplets of examples, triplets of rhetorical questions. Vary counts: sometimes two, sometimes four, sometimes one.
- **Empty intensifiers and stock phrases** (ES): "en un mundo donde", "cabe destacar", "sin duda alguna", "no es solo X, es Y", "sumérgete", "descubre cómo". (EN): "delve", "dive into", "game-changer", "it's worth noting", "in today's fast-paced world", "let's unpack".
- **Em-dash overuse** as the default clause connector. Prefer commas, parentheses, or splitting the sentence.
- **Uniform sentence length.** Vary it. Long meandering sentence, then a short one. Like people talk.
- **Over-structuring**: headers every two paragraphs, bullet lists for things that read better as prose, a "Conclusión" header. Use headers only when the post is long enough to need navigation (roughly 6+ min reads).
- **Hedging + summarizing tics**: "En resumen," openings, "En conclusión," closings, restating the intro at the end.

## 4. Language rules

### Spanish (source language)
- Spanish is the **original** language of every post. Draft here first.
- Colombian-neutral, informal: `tú` for the individual reader, `ustedes` for the audience. Never `vosotros`.
- Colloquialisms are welcome in moderation ("uy", "ojo", "un montón", "cuadrar algo", "botar ideas"). Don't force them; one or two per post is plenty.
- Anglicisms stay when they're what devs actually say: *side project, early adopter, feedback, framework, codebase, prompt*. Italicize on first use when it reads as foreign.
- Write "IA" (from "Inteligencia Artificial"), never "AI", anywhere in the text — titles, slugs/filenames, description, headings, and body alike. Exception: a verbatim quoted/cited title of an external source (e.g., a footnote citing a video or article's original title) keeps its original wording, "AI" included — don't alter someone else's title to enforce this rule.

### English (translation target)
- English posts are **translations of the Spanish original**, not rewrites. Keep the same structure, jokes, and asides.
- Translate meaning, not words: fix calques ("sentencias" → "statements", never "sentences"; "librerías" → "libraries").
- Keep the conversational register; do not formalize. If a joke doesn't survive translation, adapt it — don't delete it and don't explain it.
- Keep his idiosyncrasies ("I don't forget that I forgot something") even if an editor would smooth them.
- Write "AI" (from "Artificial Intelligence"), never "IA", anywhere in the visible text. Exception: a verbatim quoted/cited title of an external source keeps its original wording, "IA" included if that's how the source titled it — don't alter someone else's title to enforce this rule.

### Translation tasks specifically
1. Never "improve" while translating. If you spot a real error in the source, flag it separately; don't silently fix style.
2. Preserve: emoji asides, footnotes and their numbering, image references, bolded terms, code blocks (untranslated), link slugs pointing to the right locale.
3. Fingerprint check applies to the output: a clean Spanish original must not gain LLM patterns in English.

## 5. Polishing tasks specifically

- Scope: grammar, clarity, flow, and fingerprint removal. Do not change arguments, add sections, or pad length.
- When merging staccato lines into paragraphs, keep every idea — nothing gets cut, nothing gets added.
- Output a short changelog of what was modified and why (2–5 bullets), so edits can be reviewed.
- If a passage is ambiguous, ask instead of guessing intent.

## 6. Self-check before delivering

This checklist applies to **every post before it is published** — including posts drafted before this file existed. A post that was never run through it doesn't ship. Run through the list; if any item fails, revise before showing the draft:

0. Does the post trace back to a human draft (voice memo, notes, Guillermo's own text)? If not, stop — see the hard rule in section 1.

1. Zero anaphora chains (3+ repeated openings)?
2. Paragraphs mostly 3–6 sentences, sentence length varied?
3. No bolded thesis at the start or end?
4. Objections inline in italics, not stacked quote blocks?
5. Analogies/anecdotes concrete and real (no invented details)?
6. Stock LLM phrases absent (section 3 blacklist)?
7. Register matches a 2024–2025 post read side by side?
8. Correct language conventions (tú/ustedes, calques fixed, "IA" in Spanish / "AI" in English, except verbatim quoted/cited source titles)?
9. Ending is a reflection in prose, not a slogan?

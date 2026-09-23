# Audio narration

Every post gets an MP3 narration in its own language (Spanish source posts and
English translations), generated with Azure Speech and committed under
`public/audio/`. `src/data/audio-manifest.json` maps `locale/slug` to the file,
its duration and a content hash. The post layout renders a player only when an
entry exists.

## How it runs

`.github/workflows/audio.yml` runs after a push to `main` that touches
`src/content/posts/**`. It builds the narration text for every post, hashes it
together with the voice, output format and `NARRATION_VERSION`, and calls Azure
only for posts whose hash changed. Frontmatter-only edits (tags, dates) do not
regenerate audio; title or body edits do.

`main` only takes changes through a pull request, so the new files are committed
to the `chore/audio-narration` branch and the workflow opens a pull request
titled `chore(audio): regenerate narration`. Merge it to publish the MP3s
(Netlify then redeploys). While that pull request is open, later runs add to the
same branch and update the same pull request, so nothing already narrated there
is synthesized — and paid for — twice.

Secrets needed in the repository: `AZURE_SPEECH_KEY`, `AZURE_SPEECH_REGION`.

Optional: `AUDIO_PUSH_TOKEN`, a personal access token with `repo` scope. Pushes
and pull requests made with the default `GITHUB_TOKEN` do not trigger other
workflows, so the Test checks stay unreported on the audio pull request. Setting
`AUDIO_PUSH_TOKEN` makes the workflow use it instead, and CI then runs on the
audio pull request like on any other.

To regenerate everything (after changing a voice in `config.mjs`), run the
workflow manually with `force` checked, or bump `NARRATION_VERSION`.

## What is narrated

`narration.mjs` turns markdown into plain segments, deterministically:

- Title first, then headings and paragraphs in order, with pauses.
- Images read as `Imagen: <alt>` / `Image: <alt>`. Alt text is required; an
  `<!-- audio: ... -->` comment on the line after the image replaces it when the
  spoken description should differ from the alt.
- A caption right after an image that repeats the alt is read once.
- Fenced code blocks and CodePen embeds become a short phrase; inline code is
  read as text.
- Links keep their text, bare URLs, footnotes, emoji and raw HTML are dropped.

`yarn audio:check-alt` (also in CI) fails when any image lacks a description.

## English terms in the Spanish narration

The voice (`es-MX-JorgeMultilingualNeural`) is multilingual, but Azure detects
the language per sentence, not per word: an English term inside a Spanish
paragraph comes out with Spanish phonetics ("React" as "rre-act"). No Azure
voice does word-level code switching on its own.

The fix is SSML. `ENGLISH_TERMS.es` in `config.mjs` lists the terms a Spanish
reader expects to hear in English, and `code-switch.mjs` wraps each occurrence
in `<lang xml:lang="en-US">`, which Azure applies word by word. Only
multilingual voices support that element, so the list is tied to keeping a
`*MultilingualNeural` voice.

Two groups stay out of the list on purpose, because English pronunciation makes
them sound worse: words Spanish absorbed (web, software, blog, post, internet)
and acronyms read letter by letter (HTML, CSS, DOM, API), which a Spanish reader
expects with Spanish letter names.

To tune the list:

```bash
yarn audio:script es/design-tokens-al-rescate --ssml   # see what gets wrapped, free
yarn audio:audition                                    # es-terms-plain.mp3 vs es-terms-code-switch.mp3
```

Matching is whole-term and case-insensitive, and the original casing is kept, so
plurals need their own entry (`framework` never matches inside `frameworks`).

The list is part of the content hash, so editing it regenerates the posts of
that locale on the next run — and only those. A locale with an empty list keeps
the hashes it had before the feature existed, which is why the English posts are
not re-synthesized to produce identical audio.

## Local commands

```bash
cp .env.example .env               # fill in the Azure values
yarn audio:script es/que-es-un-algoritmo   # print what would be read
yarn audio:generate --dry-run      # which posts would regenerate, and how many characters
yarn audio:generate --only es/que-es-un-algoritmo
yarn audio:audition                # one sample paragraph per candidate voice → scratch/audition/
yarn audio:describe-images         # draft alt text for images that have none (Azure OpenAI vision)
yarn audio:describe-images --all   # also redo images that already have alt text; review the diff
yarn test:unit
```

Cost reference: HD voices are billed per character (about $22 per million at
the time of writing). The whole blog is roughly 300k narrated characters, so a
full regeneration is under $10 and a single post is a few cents.

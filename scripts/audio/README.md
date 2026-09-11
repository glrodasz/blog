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
only for posts whose hash changed. New files are committed back to `main`
(Netlify then redeploys). Frontmatter-only edits (tags, dates) do not
regenerate audio; title or body edits do.

Secrets needed in the repository: `AZURE_SPEECH_KEY`, `AZURE_SPEECH_REGION`.

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

## Local commands

```bash
cp .env.example .env               # fill in the Azure values
yarn audio:script es/que-es-un-algoritmo   # print what would be read
yarn audio:generate --dry-run      # which posts would regenerate, and how many characters
yarn audio:generate --only es/que-es-un-algoritmo
yarn audio:audition                # one sample paragraph per candidate voice → scratch/audition/
yarn audio:describe-images         # draft alt text for images that have none (Azure OpenAI vision)
yarn test:unit
```

Cost reference: HD voices are billed per character (about $22 per million at
the time of writing). The whole blog is roughly 300k narrated characters, so a
full regeneration is under $10 and a single post is a few cents.

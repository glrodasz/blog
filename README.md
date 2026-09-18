# Undefined Shell

Undefined Shell is a bilingual Astro site by Guillermo Rodas focused on programming and web development. The project hosts English and Spanish articles about full‑stack and JavaScript topics, complete with RSS, sitemap generation, and multilingual routing.

## Features

- **Astro-powered blog** with MDX support and syntax highlighting.
- **Bilingual content** (English/Spanish) with locale-aware routing and navigation.
- **Content collections** for posts with frontmatter validation (title, dates, tags, language versions, hero images, redirects).
- **SEO extras** including RSS feed generation, sitemap, and custom redirects.
- **Analytics-ready** via Simple Analytics embed.
- **Audio narration** of every post in Spanish and English, generated with Azure Speech after each merge (see `scripts/audio/README.md`).

## Project structure

Key directories and files:

- `src/pages/` – Astro pages for the home feed, about page, localized routes, and RSS feed builder.
- `src/content/` – Markdown/MDX posts organized by locale (`en/`, `es/`), validated via `src/content/config.ts`.
- `src/components/` – Layout pieces such as header, footer, post lists, containers, and analytics snippets.
- `src/i18n/` – Locale configuration (`en`, `es`) and copy used across the site.
- `public/` – Static assets served as-is.
- `_redirects` – Redirect rules copied into the build output.

## Getting started

1. **Install dependencies**
   ```bash
   yarn install
   ```

2. **Start the development server**
   ```bash
   yarn dev
   ```
   The site runs with hot reload; open the printed local URL in your browser.

3. **Run a production build** (includes type and content checks)
   ```bash
   yarn build
   ```
   The static site is emitted to `dist/` with `_redirects` copied into place.

4. **Preview the production build**
   ```bash
   yarn preview
   ```

## Writing posts

1. Pick a locale folder under `src/content/posts/` (`en/` or `es/`).
2. Create a `.md` or `.mdx` file with frontmatter:
   ```yaml
   ---
   title: Your title
   description: Short summary
   pubDate: 2024-01-01
   updatedDate: 2024-01-15 # optional
   heroImage: /path/to/image.jpg # optional
   tags: [astro, javascript] # optional
   languageVersions:
     - language: es
       url: /es/posts/slug
   ---
   ```
3. Add your Markdown/MDX content below the frontmatter.

## Configuration

- **Site URL** is defined in `src/consts.ts` and used for sitemap and RSS generation.
- **Locales** are configured in `src/i18n/config.ts`; update `LOCALES` to add more languages and provide translations in `src/i18n/messages/`.
- **Redirects** are produced from `helpers/redirects` and merged into Astro’s `redirects` config.

## Scripts

- `yarn dev` – Start the dev server.
- `yarn build` – Run `astro check`, build the site, and copy `_redirects` to `dist/`.
- `yarn preview` – Preview the production build.
- `yarn format` – Format the codebase with Prettier.
- `yarn test:unit` – Unit tests for the audio narration scripts.
- `yarn audio:*` – Audio narration pipeline commands, documented in `scripts/audio/README.md`.

## License

This project is proprietary; all rights reserved by the author.

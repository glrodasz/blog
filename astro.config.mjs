import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

import { SITE_URL } from "./src/consts";
import { getRedirects } from "./helpers/redirects";
import { LOCALES, DEFAULT_LOCALE } from "./src/i18n/config";

// On Netlify preview/branch deploys use the deploy's own URL so that
// og:image and canonical URLs resolve correctly on the preview domain.
const site =
  process.env.CONTEXT === "production" || !process.env.DEPLOY_PRIME_URL
    ? SITE_URL
    : process.env.DEPLOY_PRIME_URL;

// https://astro.build/config
export default defineConfig({
  site,
  integrations: [mdx(), sitemap()],
  i18n: {
    locales: LOCALES,
    defaultLocale: DEFAULT_LOCALE,
    routing: {
      prefixDefaultLocale: false
    }
  },
  markdown: {
    shikiConfig: {
      theme: "catppuccin-frappe",
    },
  },
  redirects: await getRedirects(),
});

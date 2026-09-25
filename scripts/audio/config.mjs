/**
 * Tunables for the audio narration pipeline.
 *
 * Voice, output format and NARRATION_VERSION are part of the content hash, so
 * changing any of them regenerates every post on the next run.
 */

/** Azure Speech voice per locale. Run `yarn audio:audition` to compare candidates. */
export const VOICES = {
  es: "es-MX-JorgeMultilingualNeural",
  en: "es-MX-JorgeMultilingualNeural",
};

/** BCP-47 tag used for the SSML `xml:lang` attribute. */
export const LOCALE_TAGS = {
  es: "es-MX",
  en: "en-US",
};

/** ~0.36 MB per minute; speech does not need more than this. */
export const OUTPUT_FORMAT = "audio-24khz-48kbitrate-mono-mp3";

/** Bump when narration rules change in a way that should re-render existing audio. */
export const NARRATION_VERSION = 1;

/** Locale used for the `<lang>` element wrapped around ENGLISH_TERMS. */
export const ENGLISH_LOCALE_TAG = "en-US";

/**
 * Terms that must be spoken in English even inside Spanish narration.
 *
 * The multilingual voice detects language per sentence, so an English term in a
 * Spanish paragraph gets Spanish phonetics. code-switch.mjs wraps each term
 * below in `<lang xml:lang="en-US">` so it is pronounced in English.
 *
 * Only list what developers actually say in English. Two groups are left out on
 * purpose, because English pronunciation makes them sound worse:
 *
 * - Words Spanish has absorbed: web, software, blog, post, internet, chat,
 *   mouse, monitor, email.
 * - Acronyms read letter by letter: HTML, CSS, DOM, API, URL, SPA, MPA, JSON,
 *   HTTP, IDE, CLI. In Spanish those letters have Spanish names ("hache-te-eme-ele"),
 *   which is what a Spanish-speaking reader expects.
 *
 * Plurals are listed explicitly — matching is whole-term, so `framework` does
 * not match inside `frameworks`. Order does not matter: the longest term wins.
 *
 * This list is part of the content hash, so editing it regenerates the posts of
 * that locale on the next run — and only those.
 */
export const ENGLISH_TERMS = {
  es: [
    // Languages, runtimes, tools and products
    "JavaScript",
    "TypeScript",
    "Node.js",
    "Deno",
    "Bun",
    "React",
    "Svelte",
    "Vue",
    "lit-html",
    "Tailwind",
    "Webpack",
    "Vite",
    "Babel",
    "ESLint",
    "Prettier",
    "Playwright",
    "GitHub",
    "GitLab",
    // Ambiguous in Spanish: "el cursor" (mouse pointer) is a Spanish word. Drop
    // this entry if a post ever talks about the pointer instead of the editor.
    "Cursor",
    "Copilot",
    "ChatGPT",
    "Claude Code",
    "Voicenotes",
    "VS Code",
    "Visual Studio Code",
    "React Native",
    "Electron",
    "Chromium",
    "Brave",
    "Ionic",
    "NativeScript",
    "PhoneGap",
    "Flutter",
    "Swift UI",
    "Handlebars",
    "Mustache",
    "Style Dictionary",
    "Storybook",
    "Scratch",
    "Shortcuts",
    "Google Spreadsheets",
    "Slack",
    "Notion",
    "Descript",
    "Notepad",
    "Gemini",
    "Clojure",
    "Rust",
    "Cloudflare Workers",
    "Streams",
    "Pure",
    // Design systems and UI
    "design token",
    "design tokens",
    "design system",
    "design systems",
    "Atomic Design",
    "Dark Mode",
    "Light Mode",
    "Guidelines",
    "web component",
    "web components",
    "custom element",
    "custom elements",
    "Shadow DOM",
    "Light DOM",
    "Shadow Root",
    "shadowRoot",
    "slot",
    "slots",
    "placeholders",
    "Autonomous custom elements",
    "Customized built-in elements",
    "Imports",
    "Modules",
    "Template Engines",
    "template literals",
    "binding",
    "Custom Properties",
    "data attributes",
    "Object-Oriented",
    "Scalable and Modular Architecture",
    "Inverted Triangle",
    "Wizardry",
    "CUBE",
    "Composition",
    "Utility",
    "Exception",
    "Settings",
    "Tools",
    "Generic",
    "Objects",
    "Trumps",
    "Theming",
    "namespace",
    "Raw values",
    "Refactoring UI",
    "style guide",
    "naming convention",
    "mobile first",
    "responsive",
    "scroll",
    "landing page",
    "landing pages",
    "storytelling",
    "e-commerce",
    "breakpoint",
    "breakpoints",
    "layout",
    "wrapper",
    "template",
    "templates",
    // Building and shipping
    "framework",
    "frameworks",
    "boilerplate",
    "bundler",
    "runtime",
    "build",
    "deploy",
    "deployment",
    "commit",
    "commits",
    "merge",
    "pull request",
    "pull requests",
    "branch",
    "open source",
    "serverless",
    "edge",
    "backend",
    "frontend",
    "full stack",
    "full-stack",
    "server-side",
    "server-side rendering",
    "Server Side",
    "client-side",
    "Client Side",
    "Single Page App",
    "Single Page Apps",
    "Single Page Websites",
    "One Page Websites",
    "Multi-page",
    "Progressive Web Apps",
    "WebViews",
    "Hybrid apps",
    "Native apps",
    "Desktop apps",
    "Vanilla",
    "edge computing",
    "just-in-time",
    "Just-in-time compilation",
    "Just-in-time compile",
    "Garbage Collector",
    "Garbage Collection",
    "JavaScript Engine",
    "Developer Experience",
    "Mozilla Developer Network",
    "task runners",
    "linters",
    "bundlers",
    "testing",
    "tests",
    "bug",
    "helper",
    "helpers",
    "flags",
    "low-code",
    "No-code",
    "block coding",
    "node-based programming",
    "metaframeworks",
    "Large Language Models",
    "Technical Committee",
    "champion",
    "Strawman",
    "Stage",
    "codebase",
    "hook",
    "hooks",
    "callback",
    "callbacks",
    // Ways of working
    "workflow",
    "pipeline",
    "side project",
    "side projects",
    "early adopter",
    "early adopters",
    "feedback",
    "prompt",
    "prompts",
    "prompt engineering",
    "machine learning",
    "deep learning",
    "standup",
    "onboarding",
    "deadline",
    "mindset",
    "burnout",
    "Fail Fast",
    "Don't Repeat Yourself",
    "Keep It Simple, Stupid",
    "The Paradox of Choice",
    "Limit your choices",
    "red tape",
    "ticket",
    "trend",
    "likes",
    "stream",
    "journaling",
    "mentee",
    "Documents",
    "Downloads",
    "shell",
    "shells",
  ],
  // English posts already read English terms correctly with this voice.
  en: [],
};

/** Characters per synthesis request. ~2.5k chars is ~3 min of audio, far below the 10 min cap. */
export const MAX_CHUNK_CHARS = 2500;

/** Parallel synthesis requests per post. */
export const CONCURRENCY = 2;

/** Pause lengths inserted between segments (SSML <break>). */
export const BREAKS = {
  paragraph: "500ms",
  heading: "900ms",
  title: "1200ms",
};

/** Phrases spoken in place of non-text content. */
export const PHRASES = {
  es: {
    image: "Imagen:",
    codeBlock: "Aquí el artículo muestra un ejemplo de código.",
    codepen: "Aquí el artículo incluye un ejemplo interactivo en CodePen.",
  },
  en: {
    image: "Image:",
    codeBlock: "Here the written article shows a code example.",
    codepen: "Here the written article embeds an interactive CodePen example.",
  },
};

export const MANIFEST_PATH = "src/data/audio-manifest.json";
export const AUDIO_DIR = "public/audio";

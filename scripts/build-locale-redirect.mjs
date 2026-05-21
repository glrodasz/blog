import { buildSync } from "esbuild";
import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const outfile = join(root, "public/locale-redirect.js");

mkdirSync(dirname(outfile), { recursive: true });

buildSync({
  entryPoints: [join(root, "src/scripts/localeRedirect.ts")],
  outfile,
  bundle: true,
  format: "iife",
  platform: "browser",
  target: "es2018",
  minify: process.env.NODE_ENV === "production",
});

console.log(`Built ${outfile}`);

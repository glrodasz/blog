/**
 * Synthesize one sample paragraph per candidate voice, plus the same Spanish
 * paragraph with and without the English terms of config.mjs wrapped in
 * `<lang xml:lang="en-US">`, so you can pick both by ear.
 *   node scripts/audio/audition.mjs   → scratch/audition/<voice>.mp3
 *                                       scratch/audition/es-terms-*.mp3
 * Costs a few cents in total.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import {
  ENGLISH_TERMS,
  LOCALE_TAGS,
  OUTPUT_FORMAT,
  VOICES,
} from "./config.mjs";
import { ROOT } from "./posts.mjs";
import { getCredentials, synthesizeSsml, toSsml } from "./tts.mjs";

try {
  process.loadEnvFile(join(ROOT, ".env"));
} catch {}

const SAMPLES = {
  es: {
    lang: "es-MX",
    text:
      "Un algoritmo no es más que un conjunto de instrucciones que se siguen para realizar una tarea en particular. " +
      "Y ojo, no hace falta ser programador para escribir uno: una receta de cocina, las instrucciones de un mueble de IKEA " +
      "o el camino que le explicas a un amigo para llegar a tu casa también son algoritmos.",
  },
  en: {
    lang: "en-US",
    text:
      "An algorithm is nothing more than a set of instructions that are followed to perform a particular task. " +
      "And you don't need to be a programmer to write one: a cooking recipe, the instructions for an IKEA shelf, " +
      "or the directions you give a friend to reach your place are algorithms too.",
  },
};

const CANDIDATES = [
  ["es", "es-MX-Tristan:DragonHDLatestNeural"],
  ["es", "es-MX-JorgeMultilingualNeural"],
  ["es", "es-MX-JorgeNeural"],
  ["es", "es-CO-GonzaloNeural"],
  ["en", "en-US-Andrew:DragonHDLatestNeural"],
  ["en", "en-US-AndrewMultilingualNeural"],
  ["en", "en-US-Brian:DragonHDLatestNeural"],
  // Same Latin-American voice reading English (Spanish-speaker accent option).
  ["en", "es-MX-JorgeMultilingualNeural"],
];

/**
 * Same Spanish paragraph twice: once as Azure reads it by default, once with
 * ENGLISH_TERMS wrapped in `<lang xml:lang="en-US">`. Listen to both to decide
 * whether a term belongs in the list.
 */
const CODE_SWITCH_SAMPLE =
  "Los design tokens viven en el codebase y el framework los compila en el build. " +
  "Cuando abro un pull request pido feedback antes del deploy, y si el layout se rompe " +
  "reviso el componente de React con Claude Code.";

const CODE_SWITCH_VARIANTS = [
  ["plain", []],
  ["code-switch", ENGLISH_TERMS.es],
];

const credentials = getCredentials();
const outDir = join(ROOT, "scratch/audition");
mkdirSync(outDir, { recursive: true });

for (const [locale, voice] of CANDIDATES) {
  const sample = SAMPLES[locale];
  const ssml = toSsml([{ kind: "paragraph", text: sample.text }], {
    voice,
    lang: sample.lang,
  });
  try {
    const audio = await synthesizeSsml(ssml, {
      ...credentials,
      format: OUTPUT_FORMAT,
    });
    const file = join(
      outDir,
      `${locale}-${voice.replace(/[^a-z0-9]+/gi, "-")}.mp3`,
    );
    writeFileSync(file, audio);
    console.log(`  ✓ ${file.replace(ROOT, "")}`);
  } catch (error) {
    console.error(`  ✗ ${voice}: ${error.message}`);
  }
}

for (const [label, englishTerms] of CODE_SWITCH_VARIANTS) {
  const ssml = toSsml([{ kind: "paragraph", text: CODE_SWITCH_SAMPLE }], {
    voice: VOICES.es,
    lang: LOCALE_TAGS.es,
    englishTerms,
  });
  try {
    const audio = await synthesizeSsml(ssml, {
      ...credentials,
      format: OUTPUT_FORMAT,
    });
    const file = join(outDir, `es-terms-${label}.mp3`);
    writeFileSync(file, audio);
    console.log(`  ✓ ${file.replace(ROOT, "")}`);
  } catch (error) {
    console.error(`  ✗ ${label}: ${error.message}`);
  }
}

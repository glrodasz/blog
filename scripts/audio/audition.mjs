/**
 * Synthesize one sample paragraph per candidate voice so you can pick by ear.
 *   node scripts/audio/audition.mjs            → scratch/audition/<voice>.mp3
 * Costs a few cents in total.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { OUTPUT_FORMAT } from "./config.mjs";
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

const credentials = getCredentials();
const outDir = join(ROOT, "scratch/audition");
mkdirSync(outDir, { recursive: true });

for (const [locale, voice] of CANDIDATES) {
  const sample = SAMPLES[locale];
  const ssml = toSsml([{ kind: "paragraph", text: sample.text }], { voice, lang: sample.lang });
  try {
    const audio = await synthesizeSsml(ssml, { ...credentials, format: OUTPUT_FORMAT });
    const file = join(outDir, `${locale}-${voice.replace(/[^a-z0-9]+/gi, "-")}.mp3`);
    writeFileSync(file, audio);
    console.log(`  ✓ ${file.replace(ROOT, "")}`);
  } catch (error) {
    console.error(`  ✗ ${voice}: ${error.message}`);
  }
}

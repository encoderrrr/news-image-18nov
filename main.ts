// news-image-20261118 entry.
// Writes the 18 November 2026 front page (entry.png, built into this repo)
// to the grader's output directory as entry.png.
import { copyFileSync, existsSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";
mkdirSync(outDir, { recursive: true });

const src = join(here, "entry.png");
if (!existsSync(src)) {
  throw new Error("entry.png missing next to main.ts");
}
const dest = join(outDir, "entry.png");
copyFileSync(src, dest);
const bytes = statSync(dest).size;
if (bytes === 0 || bytes > 1048576) {
  throw new Error(`entry.png output is ${bytes} bytes, expected 1..1048576`);
}
console.log(`wrote ${dest} (${bytes} bytes)`);

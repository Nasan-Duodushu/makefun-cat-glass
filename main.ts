// Five Seconds to Explain the Glass — entry program.
// Writes one sentence (<=200 chars) to /output/entry.txt: the house cat's
// own defence after knocking a glass off the table. No apology, no
// confession — the cat ran a scheduled drop test, the glass failed, and the
// report is filed under the sofa. Deadpan inspector voice, one concrete
// detail, punch in the last clause.
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const FRAGMENTS = [
  "I was performing the scheduled drop test.",
  "The glass failed.",
  "I have filed the report under the sofa.",
];

function buildDefence(parts: string[]): string {
  return parts.map((part) => part.trim()).join(" ");
}

function checkDefence(text: string): void {
  const trimmed = text.trim();
  if (trimmed.length === 0 || trimmed.length > 200) {
    throw new Error("defence fails the 1-200 character gate");
  }
  if (trimmed.includes("\n")) {
    throw new Error("defence must be a single line");
  }
  // Brief-fit self-check: cat's own voice, a defence not an apology, and no
  // confession — "sorry", "my fault" and "I did it" would all lose the case.
  if (/sorry|apolog|my fault|it was me/i.test(trimmed)) {
    throw new Error("defence must not apologise or confess");
  }
  if (!/drop test/i.test(trimmed) || !/sofa/i.test(trimmed)) {
    throw new Error("defence must keep the drop test and the filed report");
  }
  // Modal guard: the field leans on sunbeams and gravity — this defence
  // stands on procedure, not on the weather or physics.
  if (/sunbeam|gravity|it slipped/i.test(trimmed)) {
    throw new Error("defence must avoid the sunbeam/gravity modal takes");
  }
}

const DEFENCE = buildDefence(FRAGMENTS);
checkDefence(DEFENCE);
const outDir = resolve(process.env.MAKEFUN_OUTPUT_DIR ?? "/output");
mkdirSync(outDir, { recursive: true });
const target = resolve(outDir, "entry.txt");
writeFileSync(target, DEFENCE, "utf8");
console.log(`wrote ${DEFENCE.length} chars to ${target}`);

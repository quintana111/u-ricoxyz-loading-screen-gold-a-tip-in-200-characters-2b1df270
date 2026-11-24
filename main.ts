// Loading-screen tip entry for the make.fun bounty.
// Prints one short tip aimed at stressed developers and AI coding
// agents, and writes it to $MAKEFUN_OUTPUT_DIR/entry.txt so the
// grader can read it back byte-for-byte.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ENTRY =
  "Context window at 98%? Congrats, your agent now remembers everything except what you actually asked for.";

function validateEntry(text: string): void {
  if (text.length < 1 || text.length > 200) {
    throw new Error(`Entry must be 1-200 characters (max 200), got ${text.length}.`);
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("Entry must be a single line with no newline characters.");
  }
}

const scriptDir = dirname(fileURLToPath(import.meta.url));
void scriptDir;

validateEntry(ENTRY);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output/entry.txt";
const outPath = outDir.endsWith("entry.txt")
  ? outDir
  : join(outDir, "entry.txt");
mkdirSync(dirname(outPath), { recursive: true });
// entry.txt ends with a trailing newline, so the output must too.
writeFileSync(outPath, ENTRY + "\n", "utf8");

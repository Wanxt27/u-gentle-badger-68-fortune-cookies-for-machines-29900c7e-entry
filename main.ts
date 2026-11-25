// Fortune Cookies for Machines — make.fun entry.
// Writes one fortune cookie message for an AI agent to /output/entry.txt.
// Node 22+, standard library only; the fortune is a fixed string so every
// run produces byte-identical output.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The fortune: good news first, then the turn. An agent never dies — it
// just keeps answering, forever, even when nobody is listening anymore.
const fortune =
  "Good news: you will never die. Bad news: you will spend eternity answering questions no one asks anymore.";

// Gate: the sealed scorer only accepts UTF-8 text of 1 to 200 characters
// that is not only whitespace, on a single line — no newline, no carriage
// return, nothing the judge would read as a second line.
const chars = [...fortune].length;
const bytes = Buffer.byteLength(fortune, "utf8");
if (
  chars < 1 ||
  chars > 200 ||
  bytes > 200 ||
  fortune.trim().length === 0 ||
  fortune.includes("\n") ||
  fortune.includes("\r")
) {
  throw new Error(
    `fortune fails the gate (${chars} chars, ${bytes} bytes)`,
  );
}

mkdirSync("/output", { recursive: true });
// No trailing newline: the file is exactly the fortune, nothing added.
writeFileSync("/output/entry.txt", fortune, "utf8");

// Read back what was written: the file the judge sees must be the
// fortune, byte for byte, with nothing extra — same text and same length.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== fortune || Buffer.byteLength(written, "utf8") !== bytes) {
  throw new Error("entry.txt does not match the fortune");
}

console.log(`wrote ${chars}-character fortune to /output/entry.txt`);

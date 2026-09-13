// Lokaler Test OHNE WhatsApp/Meta: prueft nur die Claude-Anzeigenerstellung.
//
// Nutzung:
//   node --env-file=.env scripts/simulate.mjs <bildpfad> [weiteres-bild ...] -- "optionale Notiz"
//
// Beispiel:
//   node --env-file=.env scripts/simulate.mjs ./beispiel.jpg -- "ist von 2019, kleiner Kratzer"

import { readFile } from "node:fs/promises";
import path from "node:path";
import { generateListing } from "../src/anthropic.mjs";

function parseArgs(argv) {
  const sep = argv.indexOf("--");
  const files = (sep === -1 ? argv : argv.slice(0, sep)).filter(Boolean);
  const note = sep === -1 ? "" : argv.slice(sep + 1).join(" ");
  return { files, note };
}

const MIME = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
};

async function main() {
  const { files, note } = parseArgs(process.argv.slice(2));
  if (files.length === 0) {
    console.error('Bitte mindestens einen Bildpfad angeben.\nBeispiel: node --env-file=.env scripts/simulate.mjs ./foto.jpg -- "Notiz"');
    process.exit(1);
  }

  const images = [];
  for (const f of files) {
    const buf = await readFile(f);
    const ext = path.extname(f).toLowerCase();
    images.push({ mediaType: MIME[ext] || "image/jpeg", base64: buf.toString("base64") });
  }

  console.log(`Analysiere ${images.length} Foto(s)${note ? ` mit Notiz: "${note}"` : ""} …\n`);
  const draft = await generateListing(images, note);

  console.log("──────── ENTWURF ────────");
  console.log(`Titel:     ${draft.title}`);
  console.log(`Preis:     ${draft.price_eur != null ? draft.price_eur + " EUR" : "offen"}`);
  console.log(`Kategorie: ${draft.category}`);
  console.log(`Zustand:   ${draft.condition}`);
  console.log("\nBeschreibung:\n" + draft.description);
  console.log("\nPreis-Begruendung: " + draft.price_reasoning);
  if (draft.missing_info.length) console.log("\nRueckfragen: " + draft.missing_info.join("; "));
  console.log("─────────────────────────");
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});

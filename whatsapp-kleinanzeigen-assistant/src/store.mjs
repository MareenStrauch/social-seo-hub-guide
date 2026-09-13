import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

// Einfacher In-Memory-Zustand pro Verkaeufer (WhatsApp-Nummer).
// MVP-bewusst: nicht persistent. Fuer Produktion durch DB/Supabase ersetzen.
//
// state je Nummer:
//   images: {mediaType, base64}[]   gesammelte Fotos fuer das aktuelle Objekt
//   note:   string                  gesammelter Freitext
//   draft:  object|null             letzter generierter Entwurf (wartet auf Freigabe)
//   phase:  "collecting" | "awaiting_approval"
const sessions = new Map();

export function getSession(from) {
  if (!sessions.has(from)) {
    sessions.set(from, { images: [], note: "", draft: null, phase: "collecting" });
  }
  return sessions.get(from);
}

export function resetSession(from) {
  sessions.set(from, { images: [], note: "", draft: null, phase: "collecting" });
}

const DRAFTS_DIR = path.resolve("drafts");

/**
 * Speichert einen freigegebenen Entwurf als JSON + lesbare TXT-Datei ab.
 * Das ist im MVP der "Ausgang": von hier traegt der Betreiber die Anzeige
 * regelkonform in AnzeigenChef/Kleinanzeigen ein.
 */
export async function saveApprovedListing(from, draft, images) {
  await mkdir(DRAFTS_DIR, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const base = path.join(DRAFTS_DIR, `${stamp}_${from}`);

  const record = { from, approvedAt: new Date().toISOString(), draft };
  await writeFile(`${base}.json`, JSON.stringify(record, null, 2), "utf8");

  const readable = [
    `Verkaeufer: ${from}`,
    `Freigegeben: ${record.approvedAt}`,
    "",
    `TITEL: ${draft.title}`,
    `PREIS: ${draft.price_eur != null ? draft.price_eur + " EUR" : "offen"}`,
    `KATEGORIE: ${draft.category}`,
    `ZUSTAND: ${draft.condition}`,
    "",
    "BESCHREIBUNG:",
    draft.description,
    "",
    `Preis-Begruendung: ${draft.price_reasoning}`,
    `Fotos: ${images.length}`,
  ].join("\n");
  await writeFile(`${base}.txt`, readable, "utf8");

  // Fotos zur Anzeige mit ablegen
  images.forEach((img, i) => {
    const ext = (img.mediaType.split("/")[1] || "jpg").replace("jpeg", "jpg");
    writeFile(`${base}_foto${i + 1}.${ext}`, Buffer.from(img.base64, "base64"));
  });

  return `${base}.txt`;
}

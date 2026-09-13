import Anthropic from "@anthropic-ai/sdk";
import { config } from "./config.mjs";

const client = new Anthropic({ apiKey: config.anthropicApiKey });

const SYSTEM_PROMPT = `Du bist ein Assistent, der aus Fotos fertige Kleinanzeigen-Angebote
fuer einen privaten Verkaeufer erstellt. Zielgruppe der Anzeige: Kaeufer auf
kleinanzeigen.de in Deutschland.

Regeln:
- Schreibe auf Deutsch, sachlich, ehrlich, ohne Werbe-Floskeln.
- Titel: max. 60 Zeichen, konkret (Marke/Modell/Art + wichtigstes Merkmal).
- Beschreibung: 3-6 kurze Saetze. Nenne Zustand, sichtbare Merkmale, Groesse/Masse
  wenn erkennbar. Erfinde KEINE Angaben, die man auf den Fotos nicht sieht.
- Preisvorschlag: eine grobe, realistische Schaetzung fuer den deutschen
  Gebrauchtmarkt in Euro. Wenn du zu unsicher bist, gib eine Spanne im Feld
  price_reasoning an und waehle price_eur konservativ.
- Kennzeichne fehlende Infos, die den Verkauf verbessern wuerden (z.B. Masse,
  Kaufjahr, Defekte), im Feld missing_info als kurze Rueckfragen.

Antworte AUSSCHLIESSLICH mit einem gueltigen JSON-Objekt (kein Markdown, kein Text
davor oder danach) in exakt dieser Form:
{
  "title": string,
  "description": string,
  "price_eur": number,
  "price_reasoning": string,
  "category": string,
  "condition": "neu" | "sehr gut" | "gut" | "in Ordnung" | "defekt" | "unbekannt",
  "missing_info": string[]
}`;

/**
 * @param {{mediaType: string, base64: string}[]} images
 * @param {string} [userNote] Freitext des Verkaeufers (z.B. "ist von 2019, kleiner Kratzer")
 * @returns {Promise<object>} strukturierter Anzeigen-Entwurf
 */
export async function generateListing(images, userNote = "") {
  if (!images || images.length === 0) {
    throw new Error("generateListing: mindestens ein Bild erforderlich.");
  }

  const content = [];
  for (const img of images) {
    content.push({
      type: "image",
      source: { type: "base64", media_type: img.mediaType, data: img.base64 },
    });
  }
  content.push({
    type: "text",
    text: userNote
      ? `Zusatzinfos des Verkaeufers: ${userNote}`
      : "Keine Zusatzinfos des Verkaeufers. Erstelle den Entwurf nur aus den Fotos.",
  });

  const response = await client.messages.create({
    model: config.claudeModel,
    max_tokens: 1500,
    system: SYSTEM_PROMPT,
    messages: [{ role: "user", content }],
  });

  const text = response.content
    .filter((b) => b.type === "text")
    .map((b) => b.text)
    .join("")
    .trim();

  return parseListingJson(text);
}

// Defensiv: Modell soll reines JSON liefern, aber wir fangen fuehrenden/abschliessenden
// Text oder einen ```json-Fence ab, statt bei Kleinigkeiten zu crashen.
function parseListingJson(text) {
  const candidates = [text];
  const fence = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fence) candidates.unshift(fence[1].trim());
  const braces = text.match(/\{[\s\S]*\}/);
  if (braces) candidates.push(braces[0]);

  for (const c of candidates) {
    try {
      const obj = JSON.parse(c);
      if (obj && typeof obj.title === "string") return normalizeListing(obj);
    } catch {
      // naechsten Kandidaten versuchen
    }
  }
  throw new Error(`Antwort war kein gueltiges JSON:\n${text}`);
}

function normalizeListing(obj) {
  return {
    title: String(obj.title || "").slice(0, 70),
    description: String(obj.description || ""),
    price_eur:
      typeof obj.price_eur === "number" ? Math.round(obj.price_eur) : null,
    price_reasoning: String(obj.price_reasoning || ""),
    category: String(obj.category || ""),
    condition: String(obj.condition || "unbekannt"),
    missing_info: Array.isArray(obj.missing_info)
      ? obj.missing_info.map(String)
      : [],
  };
}

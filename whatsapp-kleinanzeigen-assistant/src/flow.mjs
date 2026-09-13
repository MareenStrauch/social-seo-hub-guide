import { generateListing } from "./anthropic.mjs";
import { sendText, sendButtons } from "./whatsapp.mjs";
import { getSession, resetSession, saveApprovedListing } from "./store.mjs";
import { config } from "./config.mjs";

const TRIGGER_DONE = /^(fertig|los|anzeige|erstell|mach)/i;
const YES = /^(ja|jo|passt|ok|okay|freigeben|einstellen)/i;
const NO = /^(nein|ne|abbrechen|verwerfen|loeschen|löschen|stop)/i;

/**
 * Verarbeitet eine eingehende, bereits normalisierte Nachricht.
 * @param {{from: string, type: "text"|"image"|"button", text?: string,
 *          image?: {mediaType: string, base64: string}, caption?: string,
 *          buttonId?: string}} msg
 */
export async function handleIncoming(msg) {
  const session = getSession(msg.from);

  // 1) Foto empfangen -> sammeln
  if (msg.type === "image" && msg.image) {
    session.images.push(msg.image);
    if (msg.caption) session.note += (session.note ? " " : "") + msg.caption;
    await sendText(
      msg.from,
      `Foto ${session.images.length} erhalten. 📸\n\nSchick gern noch weitere Fotos vom selben Gegenstand. Wenn du fertig bist, schreib "fertig" – dann erstelle ich die Anzeige.`,
    );
    return;
  }

  // 2) Button-Antwort (Freigabe-Dialog)
  if (msg.type === "button" && msg.buttonId) {
    return handleApprovalAction(msg.from, session, msg.buttonId, "");
  }

  // 3) Text
  const text = (msg.text || "").trim();

  if (session.phase === "awaiting_approval") {
    if (YES.test(text)) return handleApprovalAction(msg.from, session, "approve", "");
    if (NO.test(text)) return handleApprovalAction(msg.from, session, "reject", "");
    // alles andere = Korrekturwunsch -> neu erzeugen
    return handleApprovalAction(msg.from, session, "edit", text);
  }

  // phase === "collecting"
  if (TRIGGER_DONE.test(text)) {
    if (session.images.length === 0) {
      await sendText(msg.from, "Schick mir zuerst ein Foto vom Gegenstand, dann erstelle ich die Anzeige.");
      return;
    }
    return generateAndPresent(msg.from, session);
  }

  if (text) {
    // Freitext als Zusatzinfo merken
    session.note += (session.note ? " " : "") + text;
    if (session.images.length > 0) {
      await sendText(msg.from, 'Notiert. Schreib "fertig", wenn ich die Anzeige erstellen soll.');
    } else {
      await sendText(
        msg.from,
        "Hallo! 👋 Schick mir einfach ein Foto von dem, was du verkaufen möchtest. Ich mache daraus eine Anzeige mit Titel, Beschreibung und Preisvorschlag – du musst sie nur freigeben.",
      );
    }
    return;
  }
}

async function generateAndPresent(from, session) {
  await sendText(from, "Einen Moment, ich schaue mir die Fotos an … 🔎");
  let draft;
  try {
    draft = await generateListing(session.images, session.note);
  } catch (err) {
    console.error("generateListing error:", err);
    await sendText(from, "Da ist leider etwas schiefgelaufen. Schick die Fotos bitte noch einmal.");
    resetSession(from);
    return;
  }
  session.draft = draft;
  session.phase = "awaiting_approval";

  const price = draft.price_eur != null ? `${draft.price_eur} €` : "offen (bitte selbst festlegen)";
  const lines = [
    "So würde die Anzeige aussehen:",
    "",
    `📝 *${draft.title}*`,
    "",
    draft.description,
    "",
    `💶 Preisvorschlag: ${price}`,
    draft.price_reasoning ? `(${draft.price_reasoning})` : "",
  ];
  if (draft.missing_info.length) {
    lines.push("", "❓ Hilfreich wäre noch: " + draft.missing_info.join("; "));
  }
  lines.push("", 'Passt das so? Antworte mit "ja", "nein" oder schreib mir, was ich ändern soll.');

  await sendButtons(from, lines.filter((l) => l !== undefined).join("\n"), [
    { id: "approve", title: "Ja, einstellen" },
    { id: "edit", title: "Ändern" },
    { id: "reject", title: "Verwerfen" },
  ]);
}

async function handleApprovalAction(from, session, action, correctionText) {
  if (!session.draft) {
    await sendText(from, "Es gibt gerade keinen Entwurf. Schick mir ein Foto, dann geht's los.");
    resetSession(from);
    return;
  }

  if (action === "approve") {
    const file = await saveApprovedListing(from, session.draft, session.images);
    console.log(`Anzeige freigegeben, gespeichert unter: ${file}`);
    await notifyOperator(from, session.draft);
    await sendText(
      from,
      "Super, die Anzeige ist freigegeben. ✅ Ich kümmere mich ums Einstellen und melde mich, sobald jemand Interesse hat.",
    );
    resetSession(from);
    return;
  }

  if (action === "reject") {
    await sendText(from, "Alles klar, verworfen. Schick mir jederzeit neue Fotos.");
    resetSession(from);
    return;
  }

  if (action === "edit") {
    if (!correctionText) {
      await sendText(from, "Klar – schreib mir kurz, was ich ändern soll (z. B. Preis, Zustand, Details).");
      return; // bleibt in awaiting_approval; naechster Text ist die Korrektur
    }
    session.note += (session.note ? " " : "") + `Korrekturwunsch: ${correctionText}`;
    session.phase = "collecting";
    return generateAndPresent(from, session);
  }
}

async function notifyOperator(from, draft) {
  if (!config.operatorWhatsapp) return;
  const price = draft.price_eur != null ? `${draft.price_eur} €` : "offen";
  try {
    await sendText(
      config.operatorWhatsapp,
      `🆕 Neue freigegebene Anzeige von ${from}:\n\n${draft.title}\n${price} · ${draft.condition}\n\n${draft.description}\n\n→ In AnzeigenChef eintragen. Fotos liegen im drafts/-Ordner.`,
    );
  } catch (err) {
    console.error("notifyOperator error:", err);
  }
}

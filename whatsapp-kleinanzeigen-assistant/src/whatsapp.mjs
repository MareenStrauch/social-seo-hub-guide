import { config } from "./config.mjs";

const graphBase = () =>
  `https://graph.facebook.com/${config.graphApiVersion}`;

function authHeaders() {
  return { Authorization: `Bearer ${config.whatsappToken}` };
}

/** Sendet eine einfache Textnachricht an eine WhatsApp-Nummer. */
export async function sendText(to, body) {
  const res = await fetch(
    `${graphBase()}/${config.whatsappPhoneNumberId}/messages`,
    {
      method: "POST",
      headers: { ...authHeaders(), "Content-Type": "application/json" },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to,
        type: "text",
        text: { body: body.slice(0, 4096) },
      }),
    },
  );
  if (!res.ok) {
    throw new Error(`WhatsApp sendText fehlgeschlagen: ${res.status} ${await res.text()}`);
  }
  return res.json();
}

/**
 * Sendet eine Nachricht mit bis zu 3 Antwort-Buttons.
 * @param {string} to
 * @param {string} body
 * @param {{id: string, title: string}[]} buttons  title max. 20 Zeichen
 */
export async function sendButtons(to, body, buttons) {
  const res = await fetch(
    `${graphBase()}/${config.whatsappPhoneNumberId}/messages`,
    {
      method: "POST",
      headers: { ...authHeaders(), "Content-Type": "application/json" },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to,
        type: "interactive",
        interactive: {
          type: "button",
          body: { text: body.slice(0, 1024) },
          action: {
            buttons: buttons.slice(0, 3).map((b) => ({
              type: "reply",
              reply: { id: b.id, title: b.title.slice(0, 20) },
            })),
          },
        },
      }),
    },
  );
  if (!res.ok) {
    throw new Error(`WhatsApp sendButtons fehlgeschlagen: ${res.status} ${await res.text()}`);
  }
  return res.json();
}

/**
 * Laedt ein per WhatsApp gesendetes Medium herunter.
 * @param {string} mediaId
 * @returns {Promise<{base64: string, mediaType: string}>}
 */
export async function downloadMedia(mediaId) {
  // 1) Metadaten (enthaelt temporaere Download-URL)
  const metaRes = await fetch(`${graphBase()}/${mediaId}`, {
    headers: authHeaders(),
  });
  if (!metaRes.ok) {
    throw new Error(`Media-Metadaten fehlgeschlagen: ${metaRes.status} ${await metaRes.text()}`);
  }
  const meta = await metaRes.json();

  // 2) Binaerdatei laden (URL nur mit Token erreichbar)
  const binRes = await fetch(meta.url, { headers: authHeaders() });
  if (!binRes.ok) {
    throw new Error(`Media-Download fehlgeschlagen: ${binRes.status}`);
  }
  const buf = Buffer.from(await binRes.arrayBuffer());
  return {
    base64: buf.toString("base64"),
    mediaType: meta.mime_type || "image/jpeg",
  };
}

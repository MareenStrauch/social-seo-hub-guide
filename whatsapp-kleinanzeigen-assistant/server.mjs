import express from "express";
import { config, assertServerConfig } from "./src/config.mjs";
import { downloadMedia } from "./src/whatsapp.mjs";
import { handleIncoming } from "./src/flow.mjs";

assertServerConfig();

const app = express();
app.use(express.json());

app.get("/", (_req, res) => res.send("WhatsApp-Kleinanzeigen-Assistent laeuft."));

// --- Webhook-Verifizierung (Meta ruft das einmalig beim Einrichten auf) ---
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];
  if (mode === "subscribe" && token === config.whatsappVerifyToken) {
    return res.status(200).send(challenge);
  }
  return res.sendStatus(403);
});

// --- Eingehende Nachrichten ---
app.post("/webhook", async (req, res) => {
  // Sofort 200 zurueck, damit Meta nicht erneut zustellt; Arbeit danach.
  res.sendStatus(200);
  try {
    const messages = extractMessages(req.body);
    for (const raw of messages) {
      const msg = await normalize(raw);
      if (msg) await handleIncoming(msg);
    }
  } catch (err) {
    console.error("Webhook-Verarbeitung fehlgeschlagen:", err);
  }
});

function extractMessages(body) {
  const out = [];
  for (const entry of body?.entry || []) {
    for (const change of entry.changes || []) {
      for (const m of change.value?.messages || []) out.push(m);
    }
  }
  return out;
}

async function normalize(m) {
  const from = m.from;
  if (m.type === "text") {
    return { from, type: "text", text: m.text?.body || "" };
  }
  if (m.type === "image" && m.image?.id) {
    const image = await downloadMedia(m.image.id);
    return { from, type: "image", image, caption: m.image.caption || "" };
  }
  if (m.type === "interactive" && m.interactive?.button_reply) {
    return { from, type: "button", buttonId: m.interactive.button_reply.id };
  }
  // andere Typen (Sticker, Standort, ...) im MVP ignorieren
  return null;
}

app.listen(config.port, () => {
  console.log(`Server hoert auf Port ${config.port} (Modell: ${config.claudeModel})`);
});

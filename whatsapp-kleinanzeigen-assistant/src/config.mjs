// Zentrale Konfiguration. Liest .env (via `node --env-file` oder Prozess-Env).
// Node >= 20.6 unterstuetzt `node --env-file=.env`; deshalb keine dotenv-Abhaengigkeit.

function required(name) {
  const v = process.env[name];
  if (!v) {
    throw new Error(
      `Fehlende Umgebungsvariable: ${name}. Siehe .env.example und starte mit "node --env-file=.env server.mjs".`,
    );
  }
  return v;
}

export const config = {
  anthropicApiKey: process.env.ANTHROPIC_API_KEY,
  claudeModel: process.env.CLAUDE_MODEL || "claude-opus-5",

  whatsappToken: process.env.WHATSAPP_TOKEN,
  whatsappPhoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID,
  whatsappWabaId: process.env.WHATSAPP_WABA_ID || null,
  whatsappVerifyToken: process.env.WHATSAPP_VERIFY_TOKEN,
  graphApiVersion: process.env.GRAPH_API_VERSION || "v21.0",

  operatorWhatsapp: process.env.OPERATOR_WHATSAPP || null,

  port: Number(process.env.PORT || 3000),
};

// Prueft die Variablen, die der WhatsApp-Server zwingend braucht.
// (Der Simulate-Modus braucht nur den Anthropic-Key und ruft das hier nicht auf.)
export function assertServerConfig() {
  required("ANTHROPIC_API_KEY");
  required("WHATSAPP_TOKEN");
  required("WHATSAPP_PHONE_NUMBER_ID");
  required("WHATSAPP_VERIFY_TOKEN");
}

// Verknuepft die App mit dem WhatsApp Business Account (WABA), damit ECHTE
// eingehende Nachrichten an den Webhook zugestellt werden.
//
// Hintergrund: Metas "Test"-Knopf schickt ein Beispiel direkt an die Callback-URL
// und umgeht die WABA-Pruefung. Echte Nachrichten vom Handy werden aber nur
// zugestellt, wenn die App beim WABA abonniert ist. Diese Verknuepfung versteckt
// Meta in der aktuellen Oberflaeche - deshalb dieser einmalige API-Aufruf.
//
// Nutzung: node --env-file=.env scripts/subscribe-waba.mjs

import { config } from "../src/config.mjs";

if (!config.whatsappWabaId) {
  console.error(
    "WHATSAPP_WABA_ID fehlt in der .env (WhatsApp Business Account ID aus API Setup).",
  );
  process.exit(1);
}
if (!config.whatsappToken) {
  console.error("WHATSAPP_TOKEN fehlt in der .env.");
  process.exit(1);
}

const url = `https://graph.facebook.com/${config.graphApiVersion}/${config.whatsappWabaId}/subscribed_apps`;

const res = await fetch(url, {
  method: "POST",
  headers: { Authorization: `Bearer ${config.whatsappToken}` },
});
const body = await res.json().catch(() => ({}));

console.log("HTTP", res.status);
console.log(JSON.stringify(body, null, 2));

if (body.success === true) {
  console.log(
    "\n✅ App ist jetzt mit dem WABA verknuepft. Echte Nachrichten sollten nun am Webhook ankommen.",
  );
} else {
  console.log(
    "\n⚠️  Nicht erfolgreich. Pruefe: stimmt die WABA-ID? Hat das Token die Rechte whatsapp_business_management?",
  );
}

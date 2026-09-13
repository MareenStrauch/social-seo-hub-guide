# WhatsApp-Kleinanzeigen-Assistent (MVP)

Ein älterer Mensch schickt per WhatsApp Fotos → Claude erstellt Titel,
Beschreibung und Preisvorschlag → er gibt per WhatsApp frei → die fertige Anzeige
wird abgelegt (und du als Betreiber wirst benachrichtigt).

**Bewusste MVP-Grenze:** Das *finale Einstellen* bei Kleinanzeigen passiert im MVP
**manuell** – über [AnzeigenChef](https://anzeigenchef-online.de/), das eine
offiziell genehmigte Kleinanzeigen-Anbindung hat. Grund: Kleinanzeigen bietet
**keine offene API** und **verbietet eigenmächtige Automatisierung** (Akamai-Bot-Schutz,
Konto-Sperre-Risiko). Ob wir das Einstellen später voll automatisieren, hängt an
der Antwort von Kleinanzeigen bzw. AnzeigenChef – siehe `docs/emails.md`.

## Ablauf

```
Opa ──Fotos + Notiz──▶ WhatsApp Business API ──▶ Webhook (dieser Server)
                                                      │
                                     Claude Vision → Titel/Beschreibung/Preis
                                                      │
                              Freigabe-Dialog per WhatsApp ("Ja / Ändern / Verwerfen")
                                                      │
                                    freigegeben → drafts/ + Push an Betreiber
                                                      │
                          Betreiber trägt Anzeige regelkonform in AnzeigenChef ein
```

## Sofort testbar – ohne WhatsApp/Meta

Nur der Anthropic-Key nötig. Testet die eigentliche Intelligenz (Foto → Anzeige):

```bash
cd whatsapp-kleinanzeigen-assistant
npm install
cp .env.example .env        # ANTHROPIC_API_KEY eintragen
node --env-file=.env scripts/simulate.mjs ./irgendein-foto.jpg -- "ist von 2019, kleiner Kratzer"
```

## Vollständiger WhatsApp-Betrieb

1. **Meta-Konto:** Unter [developers.facebook.com](https://developers.facebook.com)
   eine App (Typ „Business") anlegen → Produkt **WhatsApp** hinzufügen.
2. **Test mit Opa OHNE Firmenprüfung:** Die WhatsApp Cloud API stellt eine
   **Test-Telefonnummer** bereit, die an eine kleine Zahl verifizierter Empfänger
   senden darf. Opas Nummer dort als Empfänger hinzufügen – so kann er sofort testen,
   bevor irgendeine Business-Verifizierung nötig ist.
   *(Die genaue Empfänger-Obergrenze legt Meta fest und ändert sich gelegentlich –
   im Zweifel im Dashboard prüfen.)*
3. **.env füllen:** `WHATSAPP_TOKEN`, `WHATSAPP_PHONE_NUMBER_ID`,
   `WHATSAPP_VERIFY_TOKEN` (frei wählbar), optional `OPERATOR_WHATSAPP`.
4. **Server starten & öffentlich erreichbar machen:**
   ```bash
   node --env-file=.env server.mjs
   # in einem zweiten Terminal, fuer lokale Tests:
   npx ngrok http 3000
   ```
5. **Webhook in Meta eintragen:** Callback-URL `https://<deine-domain>/webhook`,
   Verify-Token = `WHATSAPP_VERIFY_TOKEN`, Feld **messages** abonnieren.

Danach: Opa schickt ein Foto → Assistent antwortet mit dem Entwurf und den Buttons
**Ja / Ändern / Verwerfen**.

## Projektstruktur

| Datei | Zweck |
|---|---|
| `server.mjs` | Express-Webhook, normalisiert Meta-Payloads |
| `src/anthropic.mjs` | Claude Vision → strukturierter Anzeigen-Entwurf (JSON) |
| `src/whatsapp.mjs` | Cloud-API-Helfer: Text/Buttons senden, Medien laden |
| `src/flow.mjs` | Gesprächslogik: sammeln → erzeugen → freigeben |
| `src/store.mjs` | Sitzungszustand (In-Memory) + Ablage freigegebener Anzeigen |
| `scripts/simulate.mjs` | Lokaler Test der Anzeigenerstellung ohne WhatsApp |
| `docs/emails.md` | Anfrage-Mails an Kleinanzeigen & AnzeigenChef |

## Roadmap zur Vollautomatisierung

1. **Preis besser fundieren:** Vergleichsanzeigen über die (lese-only) API von
   [kleinanzeigen-agent.de](https://kleinanzeigen-agent.de/) ziehen und Claude als
   Kontext geben, statt frei zu schätzen.
2. **Zustand persistent:** In-Memory-Store → Supabase (das Haupt-Repo nutzt bereits
   Supabase), inkl. Verkäuferprofilen und Anzeigen-Historie.
3. **Einstellen automatisieren:** *Nur wenn* Kleinanzeigen/AnzeigenChef eine
   programmierbare Schnittstelle bestätigen (siehe `docs/emails.md`). Bis dahin
   bleibt der manuelle Schritt – bewusst, wegen Konto-Sperre-Risiko.
4. **Nachrichten-Rückkanal:** Eingehende Kaufanfragen an den Verkäufer per WhatsApp
   pushen (setzt Schnittstellen-Zugang zum Postfach voraus).
5. **Versand:** Adress-/Label-Workflow ergänzen.

## Nur Schätzung / noch zu prüfen

- Genaue Empfänger-Obergrenze der Meta-Test-Nummer (Meta-seitig, ändert sich).
- Ob AnzeigenChef eine programmierbare API zum *Anlegen* von Anzeigen bietet
  (die Mail in `docs/emails.md` klärt das).

import { Navigation } from "@/components/layout/navigation";
import { useSeo } from "@/hooks/use-seo";

const Datenschutz = () => {
  useSeo({
    title: "Datenschutzerklärung – MareenSocialUp",
    description: "Datenschutzerklärung von MareenSocialUp gemäß DSGVO.",
    canonical: "https://social-seo-hub-guide.lovable.app/datenschutz",
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="py-16 px-4 sm:px-6 lg:px-8 pt-24">
        <div className="max-w-3xl mx-auto prose prose-lg">
          <h1 className="text-3xl font-headline font-bold text-secondary mb-8">Datenschutzerklärung</h1>

          <div className="bg-card p-6 rounded-soft shadow-float space-y-8 text-muted-foreground text-sm">

            {/* 1 */}
            <div>
              <h2 className="text-xl font-semibold text-secondary mb-2">1. Datenschutz auf einen Blick</h2>
              <p>
                Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer nachfolgenden Datenschutzerklärung.
              </p>
            </div>

            {/* 2 */}
            <div>
              <h2 className="text-xl font-semibold text-secondary mb-2">2. Verantwortliche Stelle</h2>
              <p>
                Verantwortlich für die Datenverarbeitung auf dieser Website ist:
              </p>
              <p className="mt-2">
                <strong className="text-foreground">Mareen Strauch</strong><br />
                Kirchlinder Feld 4<br />
                44379 Dortmund<br />
                E-Mail: hallo@mareensocialup.de
              </p>
            </div>

            {/* 3 */}
            <div>
              <h2 className="text-xl font-semibold text-secondary mb-2">3. Hosting</h2>
              <p>
                Diese Website wird bei einem externen Dienstleister gehostet (Hoster). Die personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf den Servern des Hosters gespeichert. Hierbei kann es sich v.&nbsp;a. um IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten, Vertragsdaten, Kontaktdaten, Namen, Websitezugriffe und sonstige Daten, die über eine Website generiert werden, handeln.
              </p>
              <p className="mt-2">
                Der Einsatz des Hosters erfolgt im Interesse einer sicheren, schnellen und effizienten Bereitstellung unseres Online-Angebots (Art. 6 Abs. 1 lit. f DSGVO).
              </p>
            </div>

            {/* 4 */}
            <div>
              <h2 className="text-xl font-semibold text-secondary mb-2">4. Allgemeine Hinweise und Pflichtinformationen</h2>
              <h3 className="text-lg font-semibold text-secondary mb-1">Datenschutz</h3>
              <p>
                Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
              </p>
              <h3 className="text-lg font-semibold text-secondary mb-1 mt-4">Widerruf Ihrer Einwilligung</h3>
              <p>
                Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können eine bereits erteilte Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.
              </p>
              <h3 className="text-lg font-semibold text-secondary mb-1 mt-4">Beschwerderecht bei der Aufsichtsbehörde</h3>
              <p>
                Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein Beschwerderecht bei einer Aufsichtsbehörde zu. Die zuständige Aufsichtsbehörde ist die Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen (LDI NRW).
              </p>
            </div>

            {/* 5 */}
            <div>
              <h2 className="text-xl font-semibold text-secondary mb-2">5. Datenerfassung auf dieser Website</h2>
              <h3 className="text-lg font-semibold text-secondary mb-1">Cookies</h3>
              <p>
                Diese Website verwendet Cookies. Dabei handelt es sich um kleine Textdateien, die Ihr Webbrowser auf Ihrem Endgerät speichert. Wir verwenden ein Cookie-Consent-Banner, über das Sie der Nutzung von Analyse-Cookies zustimmen oder diese ablehnen können. Ihre Einstellung wird im Local Storage Ihres Browsers gespeichert.
              </p>
              <h3 className="text-lg font-semibold text-secondary mb-1 mt-4">Server-Log-Dateien</h3>
              <p>
                Der Provider dieser Website erhebt und speichert automatisch Informationen in sogenannten Server-Log-Dateien, die Ihr Browser automatisch übermittelt. Dies sind: Browsertyp und -version, verwendetes Betriebssystem, Referrer-URL, Hostname des zugreifenden Rechners, Uhrzeit der Serveranfrage und IP-Adresse. Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen.
              </p>
            </div>

            {/* 6 */}
            <div>
              <h2 className="text-xl font-semibold text-secondary mb-2">6. Analyse-Tools</h2>
              <h3 className="text-lg font-semibold text-secondary mb-1">Google Analytics 4</h3>
              <p>
                Diese Website nutzt Google Analytics 4, einen Webanalysedienst der Google Ireland Limited („Google"), Gordon House, Barrow Street, Dublin 4, Irland. Google Analytics verwendet Cookies, die eine Analyse der Benutzung der Website durch Sie ermöglichen.
              </p>
              <p className="mt-2">
                <strong className="text-foreground">Wir nutzen Google Analytics ausschließlich mit aktivierter IP-Anonymisierung.</strong> Das bedeutet, Ihre IP-Adresse wird von Google innerhalb von Mitgliedstaaten der EU oder in anderen Vertragsstaaten des EWR zuvor gekürzt. Google Analytics wird nur geladen, wenn Sie über unser Cookie-Banner aktiv eingewilligt haben (Art. 6 Abs. 1 lit. a DSGVO).
              </p>
              <p className="mt-2">
                Unsere Measurement ID lautet: G-5HB3L36YFZ. Wir nutzen derzeit keine Google Ads oder Remarketing-Funktionen.
              </p>
              <p className="mt-2">
                Sie können die Erfassung durch Google Analytics verhindern, indem Sie in unserem Cookie-Banner auf „Ablehnen" klicken. Alternativ können Sie das Browser-Add-on zur Deaktivierung von Google Analytics herunterladen unter:{" "}
                <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="underline text-primary hover:text-primary/80">
                  https://tools.google.com/dlpage/gaoptout
                </a>
              </p>
            </div>

            {/* 7 */}
            <div>
              <h2 className="text-xl font-semibold text-secondary mb-2">7. YouTube-Einbettungen</h2>
              <p>
                Auf dieser Website sind Videos des Videoportals YouTube eingebettet. Betreiber ist die Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland. Wenn Sie eine Seite mit einem YouTube-Video besuchen, wird eine Verbindung zu den Servern von YouTube hergestellt. Dabei wird dem YouTube-Server mitgeteilt, welche Seiten Sie besucht haben.
              </p>
              <p className="mt-2">
                Wenn Sie in Ihrem YouTube-Account eingeloggt sind, ermöglichen Sie YouTube, Ihr Surfverhalten direkt Ihrem persönlichen Profil zuzuordnen. Dies können Sie verhindern, indem Sie sich aus YouTube ausloggen.
              </p>
              <p className="mt-2">
                Die Nutzung von YouTube erfolgt im Interesse einer ansprechenden Darstellung unserer Online-Angebote (Art. 6 Abs. 1 lit. f DSGVO). Weitere Informationen zum Umgang mit Nutzerdaten finden Sie in der Datenschutzerklärung von Google:{" "}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline text-primary hover:text-primary/80">
                  https://policies.google.com/privacy
                </a>
              </p>
            </div>

            {/* 8 */}
            <div>
              <h2 className="text-xl font-semibold text-secondary mb-2">8. Betroffenenrechte</h2>
              <p>Sie haben das Recht:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Auskunft über Ihre gespeicherten Daten zu erhalten (Art. 15 DSGVO)</li>
                <li>Berichtigung unrichtiger Daten zu verlangen (Art. 16 DSGVO)</li>
                <li>Löschung Ihrer Daten zu verlangen (Art. 17 DSGVO)</li>
                <li>Einschränkung der Verarbeitung zu verlangen (Art. 18 DSGVO)</li>
                <li>Datenübertragbarkeit zu verlangen (Art. 20 DSGVO)</li>
                <li>Widerspruch gegen die Verarbeitung einzulegen (Art. 21 DSGVO)</li>
              </ul>
              <p className="mt-2">
                Zur Ausübung Ihrer Rechte wenden Sie sich bitte an: hallo@mareensocialup.de
              </p>
            </div>

            {/* 9 */}
            <div>
              <h2 className="text-xl font-semibold text-secondary mb-2">9. Aktualität und Änderung dieser Datenschutzerklärung</h2>
              <p>
                Diese Datenschutzerklärung ist aktuell gültig und hat den Stand April 2026. Durch die Weiterentwicklung unserer Website oder aufgrund geänderter gesetzlicher bzw. behördlicher Vorgaben kann es notwendig werden, diese Datenschutzerklärung zu ändern.
              </p>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Datenschutz;

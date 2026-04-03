import { Navigation } from "@/components/layout/navigation";
import { useSeo } from "@/hooks/use-seo";

const Impressum = () => {
  useSeo({
    title: "Impressum – MareenSocialUp",
    description: "Impressum von MareenSocialUp. Angaben gemäß § 5 TMG.",
    canonical: "https://social-seo-hub-guide.lovable.app/impressum",
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="py-16 px-4 sm:px-6 lg:px-8 pt-24">
        <div className="max-w-3xl mx-auto prose prose-lg">
          <h1 className="text-3xl font-headline font-bold text-secondary mb-8">Impressum</h1>

          <div className="bg-card p-6 rounded-soft shadow-float space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-secondary mb-2">Angaben gemäß § 5 TMG</h2>
              <p className="text-foreground font-semibold">Mareen Strauch</p>
              <address className="not-italic text-muted-foreground space-y-1">
                Kirchlinder Feld 4<br />
                44379 Dortmund<br />
                Deutschland
              </address>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-secondary mb-2">Kontakt</h2>
              <p className="text-muted-foreground">
                E-Mail: hallo@mareensocialup.de
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-secondary mb-2">Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
              <p className="text-muted-foreground">
                Mareen Strauch<br />
                Kirchlinder Feld 4<br />
                44379 Dortmund
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-secondary mb-2">Haftungsausschluss</h2>
              <h3 className="text-lg font-semibold text-secondary mb-1">Haftung für Inhalte</h3>
              <p className="text-muted-foreground text-sm">
                Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen.
              </p>
              <h3 className="text-lg font-semibold text-secondary mb-1 mt-4">Haftung für Links</h3>
              <p className="text-muted-foreground text-sm">
                Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber verantwortlich.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-secondary mb-2">Urheberrecht</h2>
              <p className="text-muted-foreground text-sm">
                Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung von Mareen Strauch.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Impressum;

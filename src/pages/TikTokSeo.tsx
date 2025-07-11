
import { Navigation } from "@/components/layout/navigation";
import { Accordion } from "@/components/ui/accordion";
import { FAQ } from "@/components/ui/faq";

const TikTokSeo = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <article itemScope itemType="https://schema.org/Article" className="pt-24">
        {/* Hero Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-tertiary to-background">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-headline font-bold text-secondary mb-6">
              TikTok-SEO: Caption-Keyword, CC-Index & Clips nutzen
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              So wird TikTok zur Suchmaschine für deine Zielgruppe – Keyword-Strategien für maximale Reichweite.
            </p>
            <meta itemProp="author" content="Mareen Musterfrau" />
            <meta itemProp="dateModified" content="2025-07-30" />
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            
            {/* Section 1: TikTok Keywords */}
            <section id="tiktok-keywords" className="prose prose-lg max-w-none mt-16 scroll-mt-20">
              <h2 className="text-3xl font-headline font-bold text-secondary mb-6">
                Wie optimiere ich TikTok-Videos für die Suche?
              </h2>
              
              <p className="font-semibold text-lg text-foreground mb-6" data-ai-summary>
                **Caption-Keywords in den ersten 3 Sekunden, CC-Index durch Untertitel und Clip-Struktur** – so wird dein Content in TikToks Suchfunktion gefunden.
              </p>
              
              <div className="text-foreground leading-relaxed space-y-4">
                <p>
                  Platziere das <strong>Haupt-Keyword in der Caption</strong> und sprich es in den ersten 3 Sekunden aus. 
                  Nutze <strong>Untertitel-Features</strong> für bessere Indexierung und strukturiere Videos in 
                  kurze <strong>Clips mit eigenständigen Themen</strong>. TikTok wird zur Suchmaschine – 
                  deine Videos brauchen SEO-Optimierung.
                </p>
                
                <p>
                  Hashtags ergänzen, aber <code className="bg-muted px-2 py-1 rounded text-sm">#trending</code> vermeiden. 
                  Setze auf <code className="bg-muted px-2 py-1 rounded text-sm">#nischenkeyword</code> statt Masse.
                </p>
              </div>

              {/* Video Placeholder */}
              <figure className="my-8 bg-muted rounded-soft p-8 text-center">
                <div className="aspect-video bg-muted-foreground/10 rounded flex items-center justify-center mb-4">
                  <svg className="w-16 h-16 text-muted-foreground" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
                <figcaption className="text-sm text-muted-foreground">
                  Video: TikTok-Keyword-Strategie (Placeholder für id="tiktok-keywords")
                </figcaption>
              </figure>

              {/* FAQ Section */}
              <div className="mt-12">
                <h3 className="text-2xl font-headline font-semibold text-secondary mb-6">
                  Häufig gestellte Fragen
                </h3>
                <Accordion type="single" collapsible className="w-full">
                  <FAQ 
                    q="Wie viele Hashtags sollte ich verwenden?" 
                    a="3-5 relevante Hashtags sind optimal – Qualität vor Quantität." 
                  />
                  <FAQ 
                    q="Muss ich Trends mitmachen?" 
                    a="Nur wenn sie zu deiner Nische passen – authentischer Content rankt langfristig besser." 
                  />
                  <FAQ 
                    q="Sind Untertitel wichtig für SEO?" 
                    a="Ja, sie helfen TikToks Algorithmus beim Verstehen deines Contents." 
                  />
                </Accordion>
              </div>
            </section>

            {/* Navigation to other guides */}
            <section className="mt-16 pt-8 border-t border-border">
              <div className="flex flex-wrap gap-4 justify-center">
                <a 
                  href="/hub" 
                  className="inline-flex items-center px-4 py-2 rounded-soft bg-secondary/10 text-secondary hover:bg-secondary/20 transition-colors"
                >
                  ← Alle Guides
                </a>
                <a 
                  href="/hub/ai-overviews" 
                  className="inline-flex items-center px-4 py-2 rounded-soft bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                >
                  AI Overviews →
                </a>
              </div>
            </section>
          </div>
        </section>
      </article>
    </div>
  );
};

export default TikTokSeo;

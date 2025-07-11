
import { Navigation } from "@/components/layout/navigation";
import { Accordion } from "@/components/ui/accordion";
import { FAQ } from "@/components/ui/faq";

const YouTubeSeo = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <article itemScope itemType="https://schema.org/Article" className="pt-24">
        {/* Hero Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-tertiary to-background">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-headline font-bold text-secondary mb-6">
              YouTube-SEO 2025: So ranken deine Videos in Google & Shorts
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Praxisleitfaden: Titel-Formel, Kapitel-Schema & KI-Snippet – der schnelle Weg zu Top-10 & AI Overviews.
            </p>
            <meta itemProp="author" content="Mareen Musterfrau" />
            <meta itemProp="dateModified" content="2025-07-30" />
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            
            {/* Section 1: Titel optimieren */}
            <section id="titel-optimieren" className="prose prose-lg max-w-none mt-16 scroll-mt-20">
              <h2 className="text-3xl font-headline font-bold text-secondary mb-6">
                Wie optimiere ich YouTube-Titel für SEO?
              </h2>
              
              <p className="font-semibold text-lg text-foreground mb-6" data-ai-summary>
                Der Titel entscheidet über Klick & Ranking. Platziere das Haupt-Keyword in den ersten 40 Zeichen und liefere ein klares Nutzen-Versprechen.
              </p>
              
              <div className="text-foreground leading-relaxed space-y-4">
                <p>
                  Setze das Keyword vorn: <strong>YouTube SEO – +15 % Klickrate</strong>. Behalte den Titel unter 60 Zeichen, damit nichts abgeschnitten wird. Ergänze in der Beschreibung zwei Synonyme und Kapitel-Timestamps (0:00, 0:45 …). 
                </p>
                
                <p>
                  Hinterlege <code className="bg-muted px-2 py-1 rounded text-sm">&lt;VideoObject&gt;</code>-Schema samt <code className="bg-muted px-2 py-1 rounded text-sm">seekToAction</code>, damit Google <em>Key Moments</em> erkennt.
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
                  Video: YouTube Titel-Hack (Placeholder für id="yt-title-hack")
                </figcaption>
              </figure>

              {/* FAQ Section */}
              <div className="mt-12">
                <h3 className="text-2xl font-headline font-semibold text-secondary mb-6">
                  Häufig gestellte Fragen
                </h3>
                <Accordion type="single" collapsible className="w-full">
                  <FAQ 
                    q="Wie lang darf der Titel sein?" 
                    a="Maximal 60 Zeichen; optimal 40 sichtbare Zeichen." 
                  />
                  <FAQ 
                    q="Brauche ich Emojis im Titel?" 
                    a="Nur, wenn sie Thema und Nutzen stärken – sonst kann die CTR leiden." 
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
                  href="/hub/chatgpt-marketing" 
                  className="inline-flex items-center px-4 py-2 rounded-soft bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                >
                  ChatGPT-Marketing →
                </a>
              </div>
            </section>
          </div>
        </section>
      </article>
    </div>
  );
};

export default YouTubeSeo;

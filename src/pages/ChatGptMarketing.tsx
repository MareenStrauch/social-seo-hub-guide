
import { Navigation } from "@/components/layout/navigation";
import { Accordion } from "@/components/ui/accordion";
import { FAQ } from "@/components/ui/faq";
import { useSeo } from "@/hooks/use-seo";

const SITE_URL = "https://mareensocialup.de";

const ChatGptMarketing = () => {
  useSeo({
    title: "ChatGPT-Marketing: R-O-I-Prompt für punktgenaue Inhalte",
    description: "Rolle-Output-Input – die 3-Schritt-Prompt-Formel für effizienten KI-Content ohne Korrekturschleifen.",
    canonical: `${SITE_URL}/hub/chatgpt-marketing`,
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <article itemScope itemType="https://schema.org/Article" className="pt-24">
        {/* Hero Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-tertiary to-background">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-headline font-bold text-secondary mb-6">
              ChatGPT-Marketing: R-O-I-Prompt für punktgenaue Inhalte
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Rolle-Output-Input – die 3-Schritt-Prompt-Formel für effizienten KI-Content ohne Korrekturschleifen.
            </p>
            <div className="mt-6 text-lg text-foreground max-w-3xl mx-auto">
              Lerne die <strong>R-O-I-Prompt-Struktur</strong>, um in Minuten statt Stunden einen Content-Plan zu erzeugen – präzise und im richtigen Ton.
            </div>
            <meta itemProp="headline" content="ChatGPT-Marketing: R-O-I-Prompt für punktgenaue Inhalte" />
            <meta itemProp="author" content="Mareen" />
            <meta itemProp="datePublished" content="2025-07-01" />
            <meta itemProp="dateModified" content="2025-07-30" />
            <meta itemProp="image" content={`${SITE_URL}/lovable-uploads/7349c7f8-f691-401f-abf6-8518c723d7db.png`} />
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            
            {/* Section 1: ROI-Prompt */}
            <section id="roi-prompt" className="prose prose-lg max-w-none mt-16 scroll-mt-20">
              <h2 className="text-3xl font-headline font-bold text-secondary mb-6">
                Welche Prompt-Struktur liefert verlässliche Marketing-Outputs?
              </h2>
              
              <p className="font-semibold text-lg text-foreground mb-6" data-ai-summary>
                <strong>R-O-I: Rolle – Output – Input.</strong> Definiere zuerst die Rolle, dann das präzise Output-Format und schließlich das nötige Input-Material.
              </p>
              
              <div className="text-foreground leading-relaxed space-y-4">
                <p>
                  Starte mit der <strong>Rolle</strong>: „Du bist Senior Copywriter für Tech-Start-ups". Lege das <strong>Output-Format</strong> fest, z. B. „30-Tage-Content-Plan als Tabelle". Liefere <strong>Input</strong> wie Zielgruppe, Tone und Beispiele. Die klare Dreiteilung spart Korrekturen und liefert konsistente Ergebnisse.
                </p>
              </div>

              {/* Video Placeholder */}
              <figure className="my-8 bg-muted rounded-soft p-8 flex justify-center">
                <div className="max-w-xs">
                  <div className="aspect-[9/16] bg-muted-foreground/10 rounded flex items-center justify-center mb-4">
                    <svg className="w-16 h-16 text-muted-foreground" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  <figcaption className="text-sm text-muted-foreground text-center">
                    Video: ROI-Prompt erklärt (Placeholder für id="roi-prompt-explain")
                  </figcaption>
                </div>
              </figure>

              {/* FAQ Section */}
              <div className="mt-12">
                <h3 className="text-2xl font-headline font-semibold text-secondary mb-6">
                  Häufig gestellte Fragen
                </h3>
                <Accordion type="single" collapsible className="w-full">
                  <FAQ 
                    q="Kann ein Prompt zweisprachig sein?" 
                    a="Ja, solange Rolle und Output klar in einer Sprache definiert sind." 
                  />
                  <FAQ 
                    q="Wie lang sollte ein Prompt maximal sein?" 
                    a="So kurz wie möglich, so detailliert wie nötig; Bullet-Points helfen bei der Struktur." 
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
                  href="/hub/tiktok-seo" 
                  className="inline-flex items-center px-4 py-2 rounded-soft bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                >
                  TikTok-SEO →
                </a>
              </div>
            </section>
          </div>
        </section>
      </article>

      {/* BreadcrumbList Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
            { "@type": "ListItem", "position": 2, "name": "Guides", "item": `${SITE_URL}/hub` },
            { "@type": "ListItem", "position": 3, "name": "ChatGPT Marketing", "item": `${SITE_URL}/hub/chatgpt-marketing` }
          ]
        })
      }} />

      {/* Article Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "ChatGPT-Marketing: R-O-I-Prompt für punktgenaue Inhalte",
          "description": "Rolle-Output-Input – die 3-Schritt-Prompt-Formel für effizienten KI-Content ohne Korrekturschleifen.",
          "image": `${SITE_URL}/lovable-uploads/7349c7f8-f691-401f-abf6-8518c723d7db.png`,
          "datePublished": "2025-07-01",
          "dateModified": "2025-07-30",
          "author": { "@type": "Person", "name": "Mareen", "url": SITE_URL },
          "publisher": { "@type": "Organization", "name": "MareenSocialUp", "logo": { "@type": "ImageObject", "url": `${SITE_URL}/lovable-uploads/mareen-logo.png` } },
          "mainEntityOfPage": { "@type": "WebPage", "@id": `${SITE_URL}/hub/chatgpt-marketing` }
        })
      }} />

      {/* FAQ Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            { "@type": "Question", "name": "Kann ein Prompt zweisprachig sein?", "acceptedAnswer": { "@type": "Answer", "text": "Ja, solange Rolle und Output klar in einer Sprache definiert sind." } },
            { "@type": "Question", "name": "Wie lang sollte ein Prompt maximal sein?", "acceptedAnswer": { "@type": "Answer", "text": "So kurz wie möglich, so detailliert wie nötig; Bullet-Points helfen bei der Struktur." } }
          ]
        })
      }} />
    </div>
  );
};

export default ChatGptMarketing;

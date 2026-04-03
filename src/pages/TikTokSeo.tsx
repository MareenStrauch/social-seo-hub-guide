
import { Navigation } from "@/components/layout/navigation";
import { Accordion } from "@/components/ui/accordion";
import { FAQ } from "@/components/ui/faq";
import { useSeo } from "@/hooks/use-seo";

const SITE_URL = "https://mareensocialup.de";

const TikTokSeo = () => {
  useSeo({
    title: "TikTok-SEO 2025: Ranken in der In-App-Suche & Google",
    description: "Keyword-Caption, Auto-Untertitel & Frage-Hook – die 3 Sofort-Hebel für mehr Sichtbarkeit deiner TikTok-Clips.",
    canonical: `${SITE_URL}/hub/tiktok-seo`,
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <article itemScope itemType="https://schema.org/Article" className="pt-24">
        {/* Hero Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-tertiary to-background">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-headline font-bold text-secondary mb-6">
              TikTok-SEO 2025: Ranken in der In-App-Suche & in Google Perspectives
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Keyword-Caption, Auto-Untertitel & Frage-Hook – die 3 Sofort-Hebel für mehr Sichtbarkeit deiner Clips.
            </p>
            <div className="mt-6 text-lg text-foreground max-w-3xl mx-auto">
              TikTok wird zur Suchmaschine. Dieser Guide zeigt dir, wie deine Kurzvideos oben erscheinen – auch in Googles Perspectives-Tab.
            </div>
            <meta itemProp="headline" content="TikTok-SEO 2025: Ranken in der In-App-Suche & in Google Perspectives" />
            <meta itemProp="author" content="Mareen" />
            <meta itemProp="datePublished" content="2025-07-01" />
            <meta itemProp="dateModified" content="2025-07-30" />
            <meta itemProp="image" content={`${SITE_URL}/lovable-uploads/7349c7f8-f691-401f-abf6-8518c723d7db.png`} />
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            
            {/* Section 1: Ranking Hebel */}
            <section id="ranking-hebel" className="prose prose-lg max-w-none mt-16 scroll-mt-20">
              <h2 className="text-3xl font-headline font-bold text-secondary mb-6">
                Wie bringe ich mein TikTok-Video in die In-App-Suche?
              </h2>
              
              <p className="font-semibold text-lg text-foreground mb-6" data-ai-summary>
                <strong>Drei Schritte reichen:</strong> Keyword in die ersten 60 Caption-Zeichen, Auto-Untertitel aktivieren und mit einer Frage-Hook starten.
              </p>
              
              <div className="text-foreground leading-relaxed space-y-4">
                <p>
                  Platziere dein Haupt-Keyword am Beginn der Caption (≤60 Zeichen). Schalte Auto-Untertitel ein: TikTok indexiert jedes Wort, Google übernimmt sie häufig binnen 48 h. Starte das Video mit einer Frage – das trifft Such-Intent und erhöht die Watch-Time. Hinterlege das Video zusätzlich als <code className="bg-muted px-2 py-1 rounded text-sm">VideoObject</code> auf der Watch-Page, um Chancen im Google-Video-Karussell zu maximieren.
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
                    Video: TikTok SEO in 3 Schritten (Placeholder für id="tiktok-seo-3steps")
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
                    q="Wie viele Hashtags sind ideal?" 
                    a="Zwei bis drei präzise Nischen-Hashtags; zu viele wirken spammy." 
                  />
                  <FAQ 
                    q="Brauche ich eine zusätzliche Beschreibung?" 
                    a="Ja, 200–300 Zeichen reichen – wichtig für Google Perspectives." 
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
                  href="/hub/youtube-seo" 
                  className="inline-flex items-center px-4 py-2 rounded-soft bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                >
                  YouTube-SEO →
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
            { "@type": "ListItem", "position": 3, "name": "TikTok SEO", "item": `${SITE_URL}/hub/tiktok-seo` }
          ]
        })
      }} />

      {/* Article Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "TikTok-SEO 2025: Ranken in der In-App-Suche & in Google Perspectives",
          "description": "Keyword-Caption, Auto-Untertitel & Frage-Hook – die 3 Sofort-Hebel für mehr Sichtbarkeit deiner TikTok-Clips.",
          "image": `${SITE_URL}/lovable-uploads/7349c7f8-f691-401f-abf6-8518c723d7db.png`,
          "datePublished": "2025-07-01",
          "dateModified": "2025-07-30",
          "author": { "@type": "Person", "name": "Mareen", "url": SITE_URL },
          "publisher": { "@type": "Organization", "name": "MareenSocialUp", "logo": { "@type": "ImageObject", "url": `${SITE_URL}/lovable-uploads/mareen-logo.png` } },
          "mainEntityOfPage": { "@type": "WebPage", "@id": `${SITE_URL}/hub/tiktok-seo` }
        })
      }} />

      {/* FAQ Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            { "@type": "Question", "name": "Wie viele Hashtags sind ideal?", "acceptedAnswer": { "@type": "Answer", "text": "Zwei bis drei präzise Nischen-Hashtags; zu viele wirken spammy." } },
            { "@type": "Question", "name": "Brauche ich eine zusätzliche Beschreibung?", "acceptedAnswer": { "@type": "Answer", "text": "Ja, 200–300 Zeichen reichen – wichtig für Google Perspectives." } }
          ]
        })
      }} />
    </div>
  );
};

export default TikTokSeo;

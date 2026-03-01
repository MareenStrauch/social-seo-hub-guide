
import { Navigation } from "@/components/layout/navigation";
import { Accordion } from "@/components/ui/accordion";
import { FAQ } from "@/components/ui/faq";
import { useSeo } from "@/hooks/use-seo";

const SITE_URL = "https://social-seo-hub-guide.lovable.app";

const YouTubeSeo = () => {
  useSeo({
    title: "YouTube-SEO 2025: Videos in Google & Shorts ranken",
    description: "Praxisleitfaden: Titel-Formel, Kapitel-Schema & KI-Snippet – der schnelle Weg zu Top-10 & AI Overviews.",
    canonical: `${SITE_URL}/hub/youtube-seo`,
  });

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
            <meta itemProp="headline" content="YouTube-SEO 2025: So ranken deine Videos in Google & Shorts" />
            <meta itemProp="author" content="Mareen" />
            <meta itemProp="datePublished" content="2025-07-01" />
            <meta itemProp="dateModified" content="2025-07-30" />
            <meta itemProp="image" content={`${SITE_URL}/lovable-uploads/7349c7f8-f691-401f-abf6-8518c723d7db.png`} />
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

              {/* YouTube Shorts Video */}
              <figure className="my-8 bg-muted rounded-soft p-8 flex justify-center" itemScope itemType="https://schema.org/VideoObject">
                <div className="max-w-xs w-full">
                  <div className="aspect-[9/16] rounded overflow-hidden mb-4">
                    <iframe
                      src="https://www.youtube.com/embed/AjXVOQ2P7jQ"
                      title="R-O-I Promptformel: Rolle → Output → Input"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                  <figcaption className="text-sm text-muted-foreground text-center">
                    Video: R-O-I Promptformel für ChatGPT
                  </figcaption>
                  
                  {/* VideoObject Structured Data */}
                  <meta itemProp="name" content="R-O-I Promptformel: Rolle → Output → Input" />
                  <meta itemProp="description" content="Mit dieser 3-Schritt-Struktur versteht ChatGPT deine Aufgabe sofort – ohne endloses Nach-Prompten." />
                  <meta itemProp="uploadDate" content="2025-07-21" />
                  <meta itemProp="duration" content="PT43S" />
                  <meta itemProp="thumbnailUrl" content="https://i.ytimg.com/vi/AjXVOQ2P7jQ/maxresdefault.jpg" />
                  <meta itemProp="contentUrl" content="https://youtube.com/shorts/AjXVOQ2P7jQ" />
                  <meta itemProp="embedUrl" content="https://www.youtube.com/embed/AjXVOQ2P7jQ" />
                  <link itemProp="url" href="https://youtube.com/shorts/AjXVOQ2P7jQ" />
                </div>
              </figure>
              
              {/* JSON-LD VideoObject */}
              <script type="application/ld+json" dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "VideoObject",
                  "name": "R-O-I Promptformel: Rolle → Output → Input",
                  "description": "Mit dieser 3-Schritt-Struktur versteht ChatGPT deine Aufgabe sofort – ohne endloses Nach-Prompten. In 60 Sekunden erfährst du, wie du mit klaren Rollen, präzisem Output-Format und gezieltem Input einen kompletten Content-Plan generierst.",
                  "thumbnailUrl": "https://i.ytimg.com/vi/AjXVOQ2P7jQ/maxresdefault.jpg",
                  "uploadDate": "2025-07-21",
                  "duration": "PT43S",
                  "contentUrl": "https://youtube.com/shorts/AjXVOQ2P7jQ",
                  "embedUrl": "https://www.youtube.com/embed/AjXVOQ2P7jQ",
                  "transcript": "Chatp ist das absolute Wundermittel und es liefert, wenn du richtig briefst. Hier der Shortcut dazu. Merke dir R o I. R wie Rolle. Z.B. du bist Performance Marketer für eine Modemarke, dann weiß die KI, wer sprechen soll. O für Output. Gebe mir 20 Meterite und Meterbeschreibung in einer Tabelle. Das ist der Output. Und damit hat ich kein Rätselraten mehr. I für Input. Gebe der KI Tonalität, Zielgruppe und vielleicht alte Post. Je mehr Input, desto weniger Nacharbeit für dich selber. Einmal richtig gebrief und du musst nicht fünf mal mehr am Pompte. jetzt das Prom Playbook immer hab, gönnt den Workflow Turbo.",
                  "interactionStatistic": {
                    "@type": "InteractionCounter",
                    "interactionType": { "@type": "WatchAction" },
                    "userInteractionCount": 0
                  }
                })
              }} />

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

      {/* BreadcrumbList Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
            { "@type": "ListItem", "position": 2, "name": "Guides", "item": `${SITE_URL}/hub` },
            { "@type": "ListItem", "position": 3, "name": "YouTube SEO", "item": `${SITE_URL}/hub/youtube-seo` }
          ]
        })
      }} />

      {/* Article Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "YouTube-SEO 2025: So ranken deine Videos in Google & Shorts",
          "description": "Praxisleitfaden: Titel-Formel, Kapitel-Schema & KI-Snippet – der schnelle Weg zu Top-10 & AI Overviews.",
          "image": `${SITE_URL}/lovable-uploads/7349c7f8-f691-401f-abf6-8518c723d7db.png`,
          "datePublished": "2025-07-01",
          "dateModified": "2025-07-30",
          "author": { "@type": "Person", "name": "Mareen", "url": SITE_URL },
          "publisher": { "@type": "Organization", "name": "MareenSocialUp", "logo": { "@type": "ImageObject", "url": `${SITE_URL}/lovable-uploads/mareen-logo.png` } },
          "mainEntityOfPage": { "@type": "WebPage", "@id": `${SITE_URL}/hub/youtube-seo` }
        })
      }} />

      {/* FAQ Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            { "@type": "Question", "name": "Wie lang darf der Titel sein?", "acceptedAnswer": { "@type": "Answer", "text": "Maximal 60 Zeichen; optimal 40 sichtbare Zeichen." } },
            { "@type": "Question", "name": "Brauche ich Emojis im Titel?", "acceptedAnswer": { "@type": "Answer", "text": "Nur, wenn sie Thema und Nutzen stärken – sonst kann die CTR leiden." } }
          ]
        })
      }} />
    </div>
  );
};

export default YouTubeSeo;

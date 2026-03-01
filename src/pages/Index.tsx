import { Navigation } from "@/components/layout/navigation";
import { GuideCard } from "@/components/ui/guide-card";
import { InfoTile } from "@/components/ui/info-tile";
import { VideoMasonry } from "@/components/ui/video-masonry";
import { CTARibbon } from "@/components/ui/cta-ribbon";
import { SocialIcons } from "@/components/ui/social-icons";
import { FAQ } from "@/components/ui/faq";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Search, Download, Brain, MousePointer, Smartphone, Youtube, MessageSquare, TrendingUp } from "lucide-react";
import { useSeo } from "@/hooks/use-seo";

const SITE_URL = "https://social-seo-hub-guide.lovable.app";

const Index = () => {
  useSeo({
    title: "MareenSocialUp – Technical Video SEO & GEO Audits für Creator",
    description: "Optimiere deine Videos technisch für Google Video SERPs und AI Overviews. Kostenlose Checkliste für YouTube SEO, TikTok SEO & GEO Readiness.",
    canonical: SITE_URL,
  });
  return <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-tertiary/30">
      <Navigation />
      
      {/* Hero Section */}
      <header className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="py-20 gradient-peach rounded-b-[3rem] text-center px-8 shadow-float relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.08),transparent_50%)]" />
            <div className="relative z-10">
              <img src="/lovable-uploads/7349c7f8-f691-401f-abf6-8518c723d7db.png" alt="Mareen – Technical Video SEO Expertin" className="w-32 h-32 mx-auto rounded-full shadow-float ring-4 ring-primary object-cover" />
              <h1 className="mt-6 text-4xl md:text-5xl font-headline font-bold leading-snug text-secondary max-w-4xl mx-auto">
                Deine Videos verdienen Platz 1 –<br className="hidden md:block" /> nicht Seite 3.
              </h1>
              <p className="mt-4 text-lg text-neutral-900 max-w-xl mx-auto" data-ai-summary>
                Technical Video SEO &amp; GEO Audits: Wir optimieren deine YouTube- und TikTok-Profile technisch für Google Video SERPs und die Zitatfähigkeit in AI Overviews.
              </p>
              <Button asChild variant="gradient" className="mt-8 px-6 py-10 font-semibold rounded-soft shadow-float w-full sm:w-auto">
                <a href="/dl/social-seo-checkliste.pdf" className="inline-flex flex-col items-center gap-2">
                  <Download className="w-5 h-5" />
                  <span className="text-center">
                    KOSTENLOS: Technical Video SEO Audit Checkliste sichern
                  </span>
                </a>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Content Hub Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-headline font-bold text-center text-primary mb-4">
            Warum deine Videos nicht in der Suche auftauchen
          </h2>
          <p className="text-center text-lg text-muted-foreground mb-12 max-w-3xl mx-auto" data-ai-summary>
            KI-Modelle zitieren nur technisch saubere Quellen. Wir beheben die Barrieren für Google Video SERPs, Social Search und Generative Engine Optimization (GEO).
          </p>
          <div className="grid gap-8 md:grid-cols-3">
            <GuideCard slug="youtube-seo" title="YouTube SEO Audit" text="Titel, Chapters, VideoObject-Schema & Thumbnails – technisch optimiert für Platz 1–10 in Google Video." icon={Youtube} iconBgColor="bg-red-100" />
            <GuideCard slug="chatgpt-marketing" title="GEO Readiness Check" text="Ist dein Content zitierfähig für ChatGPT, Perplexity und Google AI Overviews? Wir prüfen es." icon={MessageSquare} iconBgColor="bg-blue-100" />
            <GuideCard slug="tiktok-seo" title="TikTok SEO Audit" text="Caption-Keywords, Closed Captions & Hashtag-Strategie: TikTok als Suchmaschine nutzen." icon={TrendingUp} iconBgColor="bg-orange-100" />
          </div>
        </div>
      </section>

      {/* Awareness Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-b from-background to-tertiary/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center gap-3 mb-4">
              <div className="p-3 rounded-full gradient-primary shadow-glow">
                <Search className="w-6 h-6 text-white" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-secondary mb-3">
              So hat sich Suche verändert
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Die Suchlandschaft entwickelt sich rasant – bleib sichtbar mit den richtigen Strategien
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <InfoTile icon={Brain} title="AI Overviews" stat="90%" statLabel="aller Google-Suchen" text="zeigen bereits KI-generierte Antworten. Werde zur zitierten Quelle statt unsichtbar zu bleiben." />
            <InfoTile icon={MousePointer} title="Zero-Click Search" stat="65%" statLabel="ohne Klick" text="der Suchanfragen enden ohne Website-Besuch. Nur zitierfähiger Content sichert deine Sichtbarkeit." />
            <InfoTile icon={Smartphone} title="Social Search" stat="40%" statLabel="der Gen Z" text="nutzen TikTok & Instagram statt Google. Deine Kurzvideos brauchen technisches SEO." />
          </div>
        </div>
      </section>

      {/* Videos Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-headline font-bold text-secondary text-center mb-8">Video-Sammlung</h2>
          <VideoMasonry count={6} lazy={true} />
          <div className="text-center mt-8">
            <a href="/hub/videos" className="text-secondary underline hover:text-primary transition-colors">
              Alle Videos ansehen →
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section with Schema */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-tertiary/20 to-background" itemScope itemType="https://schema.org/FAQPage">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-secondary mb-3">
              Häufig gestellte Fragen
            </h2>
            <p className="text-muted-foreground">
              Die wichtigsten Fragen zu Technical Video SEO und GEO Readiness
            </p>
          </div>
          <Accordion type="single" collapsible className="space-y-4">
            <FAQ q="Was ist Technical Video SEO?" a="Technical Video SEO optimiert die technische Struktur deiner Videos – Schema-Markup, Kapitelzeitstempel, Closed Captions und Metadaten – damit Google sie in Video SERPs und AI Overviews als beste Antwort auswählt." />
            <FAQ q="Was bedeutet GEO Readiness?" a="GEO (Generative Engine Optimization) stellt sicher, dass dein Content von KI-Modellen wie ChatGPT, Perplexity und Google AI Overviews als vertrauenswürdige Quelle zitiert wird. Das erfordert strukturierte Daten, klare Kernaussagen und technische Sauberkeit." />
            <FAQ q="Wie starte ich mit YouTube SEO?" a="Setze dein Haupt-Keyword an den Anfang des Titels, ergänze VideoObject-Schema-Markup, füge Kapitelzeitstempel hinzu und optimiere Thumbnail sowie Description. Unsere kostenlose Checkliste führt dich Schritt für Schritt." />
            <FAQ q="Warum brauche ich als Creator jetzt AEO?" a="Answer-Engine-Optimierung (AEO) bringt deine Inhalte gezielt in AI Overviews und Chatbot-Antworten. Klassisches SEO allein reicht nicht mehr – KI-Modelle bevorzugen strukturierte, zitierfähige Quellen." />
          </Accordion>
        </div>
        
        {/* JSON-LD Structured Data for FAQ */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [{
            "@type": "Question",
            "name": "Was ist Technical Video SEO?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Technical Video SEO optimiert die technische Struktur deiner Videos – Schema-Markup, Kapitelzeitstempel, Closed Captions und Metadaten – damit Google sie in Video SERPs und AI Overviews als beste Antwort auswählt."
            }
          }, {
            "@type": "Question",
            "name": "Was bedeutet GEO Readiness?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "GEO (Generative Engine Optimization) stellt sicher, dass dein Content von KI-Modellen wie ChatGPT, Perplexity und Google AI Overviews als vertrauenswürdige Quelle zitiert wird. Das erfordert strukturierte Daten, klare Kernaussagen und technische Sauberkeit."
            }
          }, {
            "@type": "Question",
            "name": "Wie starte ich mit YouTube SEO?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Setze dein Haupt-Keyword an den Anfang des Titels, ergänze VideoObject-Schema-Markup, füge Kapitelzeitstempel hinzu und optimiere Thumbnail sowie Description. Unsere kostenlose Checkliste führt dich Schritt für Schritt."
            }
          }, {
            "@type": "Question",
            "name": "Warum brauche ich als Creator jetzt AEO?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Answer-Engine-Optimierung (AEO) bringt deine Inhalte gezielt in AI Overviews und Chatbot-Antworten. Klassisches SEO allein reicht nicht mehr – KI-Modelle bevorzugen strukturierte, zitierfähige Quellen."
            }
          }]
        })
      }} />
      </section>

      {/* Footer with SEO Structure */}
      <footer className="bg-secondary text-secondary-foreground py-16 mt-16 px-4 sm:px-6 lg:px-8" role="contentinfo">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-10 md:grid-cols-4 mb-12">
            {/* Brand Section */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <img src="/lovable-uploads/mareen-logo.png" alt="MareenSocialUp Logo" className="w-10 h-10" />
                <span className="font-headline text-xl font-bold">MareenSocialUp</span>
              </div>
              <p className="text-secondary-foreground/80 mb-6 max-w-md">
                Deine Expertin für Social SEO, Video-Optimierung und KI-gestütztes Content Marketing. 
                Hilft Creator*innen und Marketing-Teams, in Google, TikTok und AI-Overviews gefunden zu werden.
              </p>
              <SocialIcons />
            </div>
            
            {/* Quick Links */}
            <div>
              <h3 className="font-headline text-lg font-bold mb-4">SEO Guides</h3>
              <nav aria-label="SEO Guides Navigation">
                <ul className="space-y-3">
                  <li><a href="/hub/youtube-seo" className="text-secondary-foreground/80 hover:text-primary transition-colors">YouTube SEO Guide</a></li>
                  <li><a href="/hub/chatgpt-marketing" className="text-secondary-foreground/80 hover:text-primary transition-colors">ChatGPT Marketing</a></li>
                  <li><a href="/hub/tiktok-seo" className="text-secondary-foreground/80 hover:text-primary transition-colors">TikTok SEO Tipps</a></li>
                  <li><a href="/hub/videos" className="text-secondary-foreground/80 hover:text-primary transition-colors">Video-Sammlung</a></li>
                </ul>
              </nav>
            </div>
            
            {/* Legal & Info */}
            <div>
              <h3 className="font-headline text-lg font-bold mb-4">Rechtliches</h3>
              <nav aria-label="Legal Navigation">
                <ul className="space-y-3">
                  <li><a href="/impressum" className="text-secondary-foreground/80 hover:text-primary transition-colors">Impressum</a></li>
                  <li><a href="/datenschutz" className="text-secondary-foreground/80 hover:text-primary transition-colors">Datenschutz</a></li>
                  <li><a href="/hub" className="text-secondary-foreground/80 hover:text-primary transition-colors">Alle Guides</a></li>
                </ul>
              </nav>
            </div>
          </div>
          
          {/* Copyright */}
          <div className="border-t border-secondary-foreground/20 pt-8 text-center text-sm text-secondary-foreground/60">
            <p>&copy; {new Date().getFullYear()} MareenSocialUp. Alle Rechte vorbehalten.</p>
          </div>
        </div>
      </footer>

      {/* Organization Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "MareenSocialUp",
          "url": SITE_URL,
          "logo": `${SITE_URL}/lovable-uploads/mareen-logo.png`,
          "description": "Technical Video SEO & GEO Readiness Audits für Creator und Marketing-Teams.",
          "sameAs": [
            "https://www.youtube.com/@MareenSocialUp",
            "https://www.tiktok.com/@mareensocialup",
            "https://www.instagram.com/mareensocialup"
          ],
          "founder": {
            "@type": "Person",
            "name": "Mareen",
            "url": SITE_URL
          }
        })
      }} />

      {/* Mobile CTA Ribbon */}
      <CTARibbon text="SEO-Checkliste gratis laden" href="/dl/social-seo-checkliste.pdf" />
    </div>;
};
export default Index;
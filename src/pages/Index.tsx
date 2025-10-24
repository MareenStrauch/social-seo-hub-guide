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
const Index = () => {
  return <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-tertiary/30">
      <Navigation />
      
      {/* Hero Section */}
      <header className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="py-20 gradient-peach rounded-b-[3rem] text-center px-8 shadow-float">
            <img src="/lovable-uploads/7349c7f8-f691-401f-abf6-8518c723d7db.png" alt="Mareen" className="w-32 h-32 mx-auto rounded-full shadow-float ring-4 ring-primary object-cover" />
            <h1 className="mt-6 text-4xl md:text-5xl font-headline font-bold leading-snug text-secondary max-w-4xl mx-auto">
              Social SEO & Video Visibility – damit dein Content über Plattformgrenzen hinweg gefunden wird.
            </h1>
            <p className="mt-4 text-lg text-neutral-900 max-w-xl mx-auto">
              Social SEO & Video-Strategien für Nischen-Creator*innen und Marketing-Teams.
            </p>
            <Button asChild variant="gradient" className="mt-8 px-6 py-10 font-semibold rounded-soft shadow-float w-full sm:w-auto">
              <a href="/dl/social-seo-checkliste.pdf" className="inline-flex flex-col items-center gap-2">
                <Download className="w-5 h-5" />
                <span className="text-center">
                  🚀 SEO-Checkliste<br />gratis herunterladen
                </span>
              </a>
            </Button>
          </div>
        </div>
      </header>

      {/* Content Hub Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-headline font-bold text-center text-primary mb-4">
            Google & TikTok suchen jetzt anders
          </h2>
          <p className="text-center text-lg text-muted-foreground mb-12 max-w-3xl mx-auto">
            AI Overviews, Zero-Click, Social-as-Search: Wenn du nicht antwortest, wirst du übersprungen.
          </p>
          <div className="grid gap-8 md:grid-cols-3">
            <GuideCard 
              slug="youtube-seo" 
              title="YouTube SEO" 
              text="Titel, Chapters & Schema – so rankt dein nächstes Video auf Platz 1-10." 
              icon={Youtube}
              iconBgColor="bg-red-100"
            />
            <GuideCard 
              slug="chatgpt-marketing" 
              title="ChatGPT Marketing" 
              text="Prompts, Rollen & Workflow: KI-Content in 30 Min statt 3 Stunden." 
              icon={MessageSquare}
              iconBgColor="bg-blue-100"
            />
            <GuideCard 
              slug="tiktok-seo" 
              title="TikTok SEO" 
              text="Caption-Keyword, CC-Index & Clips: nutze TikTok als Suchmaschine." 
              icon={TrendingUp}
              iconBgColor="bg-orange-100"
            />
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
            <InfoTile icon={Brain} title="AI Overviews" text="90 % der Google-Suchen zeigen KI-Antworten. Werde zur zitierten Quelle." />
            <InfoTile icon={MousePointer} title="Zero-Click" text="Antworten ohne Klick – kurzer, zitierfähiger Content sichert Sichtbarkeit." />
            <InfoTile icon={Smartphone} title="Social Search" text="TikTok & Reels werden zur Suchmaschine. Deine Kurzvideos brauchen SEO." />
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
              Alles, was du über Social SEO und Video-Optimierung wissen musst
            </p>
          </div>
          <Accordion type="single" collapsible className="space-y-4">
            <FAQ q="Was ist Social SEO?" a="Social SEO optimiert deine Videos und Posts so, dass Algorithmen von Google, TikTok und KI-Bots sie als beste Antwort wählen." />
            <FAQ q="Wie starte ich YouTube-SEO?" a="Keyword vorn in den Titel, VideoObject-Schema & Kapitelzeitstempel ergänzen. Die gratis Checkliste hilft Schritt für Schritt." />
            <FAQ q="Warum brauchen Creator jetzt AEO?" a="Answer-Engine-Optimierung bringt deine Inhalte gezielt in AI-Overviews & Chatbots – klassisches SEO reicht nicht mehr." />
          </Accordion>
        </div>
        
        {/* JSON-LD Structured Data for FAQ */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Was ist Social SEO?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Social SEO optimiert deine Videos und Posts so, dass Algorithmen von Google, TikTok und KI-Bots sie als beste Antwort wählen."
                }
              },
              {
                "@type": "Question",
                "name": "Wie starte ich YouTube-SEO?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Keyword vorn in den Titel, VideoObject-Schema & Kapitelzeitstempel ergänzen. Die gratis Checkliste hilft Schritt für Schritt."
                }
              },
              {
                "@type": "Question",
                "name": "Warum brauchen Creator jetzt AEO?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Answer-Engine-Optimierung bringt deine Inhalte gezielt in AI-Overviews & Chatbots – klassisches SEO reicht nicht mehr."
                }
              }
            ]
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

      {/* Mobile CTA Ribbon */}
      <CTARibbon text="SEO-Checkliste gratis laden" href="/dl/social-seo-checkliste.pdf" />
    </div>;
};
export default Index;
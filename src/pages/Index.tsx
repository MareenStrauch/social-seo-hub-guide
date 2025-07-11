
import { Navigation } from "@/components/layout/navigation";
import { GuideCard } from "@/components/ui/guide-card";
import { InfoTile } from "@/components/ui/info-tile";
import { VideoMasonry } from "@/components/ui/video-masonry";
import { CTARibbon } from "@/components/ui/cta-ribbon";
import { SocialIcons } from "@/components/ui/social-icons";
import { FAQ } from "@/components/ui/faq";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Search, Download } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-tertiary/30">
      <Navigation />
      
      {/* Hero Section */}
      <header className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="py-20 gradient-peach rounded-b-[3rem] text-center px-8 shadow-float">
            <img 
              src="/lovable-uploads/7349c7f8-f691-401f-abf6-8518c723d7db.png" 
              alt="Mareen" 
              className="w-32 h-32 mx-auto rounded-full shadow-float ring-4 ring-primary object-cover"
            />
            <h1 className="mt-6 text-4xl md:text-5xl font-headline font-bold leading-snug text-secondary max-w-4xl mx-auto">
              Social SEO, Video SEO & KI-Content-Strategien für Creator und Marketing-Teams
            </h1>
            <p className="mt-4 text-lg text-neutral-900 max-w-xl mx-auto">
              Social SEO & Video-Strategien für Nischen-Creator*innen und Marketing-Teams.
            </p>
            <Button asChild variant="gradient" className="mt-8 px-6 py-3 font-semibold rounded-soft shadow-float">
              <a href="/dl/social-seo-checkliste.pdf" className="inline-flex items-center gap-2">
                <Download className="w-5 h-5" />
                🚀 SEO-Checkliste gratis herunterladen
              </a>
            </Button>
          </div>
        </div>
      </header>

      {/* Content Hub Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-8 md:grid-cols-3">
            <GuideCard 
              slug="youtube-seo" 
              title="YouTube-SEO"
              text="Titel, Chapters & Schema – so rankt dein nächstes Video auf Platz 1-10."
            />
            <GuideCard 
              slug="chatgpt-marketing" 
              title="ChatGPT-Marketing"
              text="Prompts, Rollen & Workflow: KI-Content in 30 Min statt 3 Stunden."
            />
            <GuideCard 
              slug="tiktok-seo" 
              title="TikTok-SEO"
              text="Caption-Keyword, CC-Index & Clips: nutze TikTok als Suchmaschine."
            />
          </div>
        </div>
      </section>

      {/* Awareness Section */}
      <section className="py-16 bg-background/60 backdrop-blur-sm px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-background/80 backdrop-blur-sm rounded-[2rem] p-8 mb-10 shadow-float">
            <div className="flex flex-col items-center">
              <Search className="w-24 h-24 text-secondary mb-6" />
              <h2 className="text-2xl font-headline font-bold text-secondary">So hat sich Suche verändert</h2>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <InfoTile 
              title="AI Overviews" 
              text="90 % der Google-Suchen zeigen KI-Antworten. Werde zur zitierten Quelle."
            />
            <InfoTile 
              title="Zero-Click" 
              text="Antworten ohne Klick – kurzer, zitierfähiger Content sichert Sichtbarkeit."
            />
            <InfoTile 
              title="Social Search" 
              text="TikTok & Reels werden zur Suchmaschine. Deine Kurzvideos brauchen SEO."
            />
          </div>
        </div>
      </section>

      {/* Videos Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-background/80 backdrop-blur-sm rounded-[2rem] p-8 mb-8 shadow-float">
            <h2 className="text-2xl font-headline font-bold text-secondary text-center">Video-Sammlung</h2>
          </div>
          <VideoMasonry count={6} lazy={true} />
          <div className="text-center mt-8">
            <a href="/hub/videos" className="text-secondary underline hover:text-primary transition-colors">
              Alle Videos ansehen →
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background/60 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto">
          <div className="bg-background/80 backdrop-blur-sm rounded-[2rem] p-8 mb-8 shadow-float">
            <h2 className="text-2xl font-headline font-bold text-secondary text-center">Häufig gefragt</h2>
          </div>
          <Accordion type="single" collapsible className="space-y-4">
            <FAQ 
              q="Was ist Social SEO?" 
              a="Social SEO optimiert deine Videos und Posts so, dass Algorithmen von Google, TikTok und KI-Bots sie als beste Antwort wählen."
            />
            <FAQ 
              q="Wie starte ich YouTube-SEO?" 
              a="Keyword vorn in den Titel, VideoObject-Schema & Kapitelzeitstempel ergänzen. Die gratis Checkliste hilft Schritt für Schritt."
            />
            <FAQ 
              q="Warum brauchen Creator jetzt AEO?" 
              a="Answer-Engine-Optimierung bringt deine Inhalte gezielt in AI-Overviews & Chatbots – klassisches SEO reicht nicht mehr."
            />
          </Accordion>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background/80 backdrop-blur-sm py-12 mt-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid gap-10 md:grid-cols-2">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="/lovable-uploads/8c51aaad-523b-424a-b6bf-8fa8f23fdb37.png" alt="MareenSocialUp" className="w-8 h-8" />
              <span className="font-headline text-xl font-bold text-secondary">MareenSocialUp</span>
            </div>
            <p className="text-muted-foreground">Mareen hilft Creator*innen, in Google, TikTok und AI-Overviews gefunden zu werden.</p>
            <SocialIcons />
          </div>
          <ul className="space-y-2 text-secondary font-medium">
            <li><a href="/hub" className="hover:text-primary transition-colors">Guides</a></li>
            <li><a href="/hub/videos" className="hover:text-primary transition-colors">Videos</a></li>
            <li><a href="/impressum" className="hover:text-primary transition-colors">Impressum</a></li>
            <li><a href="/datenschutz" className="hover:text-primary transition-colors">Datenschutz</a></li>
          </ul>
        </div>
      </footer>

      {/* Mobile CTA Ribbon */}
      <CTARibbon text="SEO-Checkliste gratis laden" href="/dl/social-seo-checkliste.pdf" />
    </div>
  );
};

export default Index;

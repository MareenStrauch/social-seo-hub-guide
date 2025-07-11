import { Navigation } from "@/components/layout/navigation";
import { GuideCard } from "@/components/ui/guide-card";

const Hub = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <section className="py-16 px-4 sm:px-6 lg:px-8 pt-24">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-headline font-bold text-secondary text-center mb-10">
            Alle Guides auf einen Blick
          </h1>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
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
            <GuideCard 
              slug="ai-overviews" 
              title="AI Overviews"
              text="90% der Google-Suchen zeigen KI-Antworten. Werde zur zitierten Quelle."
            />
            <GuideCard 
              slug="zero-click-seo" 
              title="Zero-Click Search"
              text="Antworten ohne Klick – kurzer, zitierfähiger Content sichert Sichtbarkeit."
            />
            <GuideCard 
              slug="social-media-seo" 
              title="Social Search"
              text="TikTok & Reels werden zur Suchmaschine. Deine Kurzvideos brauchen SEO."
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hub;
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
              title="YouTube-SEO Masterclass"
              text="Vollständiger Guide zu YouTube-Optimierung: Titel, Thumbnails, Beschreibungen und Schema Markup für maximale Reichweite."
            />
            <GuideCard 
              slug="chatgpt-marketing" 
              title="ChatGPT für Content Marketing"
              text="Effektive Prompts und Workflows für die Content-Erstellung mit KI. Von Ideenfindung bis zur finalen Umsetzung."
            />
            <GuideCard 
              slug="tiktok-seo" 
              title="TikTok SEO Strategie"
              text="Wie du TikTok als Suchmaschine nutzt. Keywords, Hashtags und Algorithmus-Optimierung für viral content."
            />
            <GuideCard 
              slug="ai-overviews" 
              title="AI Overview Optimierung"
              text="Deine Inhalte in Google's AI-Antworten platzieren. Strukturierte Daten und Answer Engine Optimization."
            />
            <GuideCard 
              slug="zero-click-seo" 
              title="Zero-Click SEO"
              text="Sichtbarkeit ohne Klicks maximieren. Featured Snippets, Knowledge Panels und Direct Answers erobern."
            />
            <GuideCard 
              slug="social-media-seo" 
              title="Social Media SEO"
              text="Cross-Platform Optimierung für Instagram, LinkedIn und Co. Hashtag-Strategien und Plattform-spezifische Tipps."
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hub;
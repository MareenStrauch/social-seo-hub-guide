
import { Navigation } from "@/components/layout/navigation";
import { GuideCard } from "@/components/ui/guide-card";
import { Youtube, MessageSquare, TrendingUp, Brain, MousePointer, Smartphone, Layers } from "lucide-react";
import { useSeo } from "@/hooks/use-seo";

const SITE_URL = "https://mareensocialup.de";

const Hub = () => {
  useSeo({
    title: "Social SEO Guides – YouTube, TikTok & GEO Readiness",
    description: "Praxisleitfäden für bessere Sichtbarkeit in Google, TikTok und YouTube. Technical Video SEO & GEO Audits.",
    canonical: `${SITE_URL}/guides`,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-tertiary/20">
      <Navigation />
      
      <section className="py-16 px-4 sm:px-6 lg:px-8 pt-24">
        <div className="max-w-6xl mx-auto">
          <div className="bg-secondary/10 backdrop-blur-sm rounded-xl p-6 mb-12">
            <h1 className="text-2xl font-headline font-bold text-secondary text-center mb-2">
              Alle Guides auf einen Blick
            </h1>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto text-sm">
              Praxisleitfäden für bessere Sichtbarkeit in Google, TikTok und YouTube.
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <GuideCard slug="/guides/youtube-seo-2025" title="YouTube-SEO" text="Titel, Chapters & Schema – so rankt dein nächstes Video auf Platz 1-10." icon={Youtube} iconBgColor="bg-red-100" />
            <GuideCard slug="/guides/chatgpt-marketing-roi-prompt" title="ChatGPT-Marketing" text="Prompts, Rollen & Workflow: KI-Content in 30 Min statt 3 Stunden." icon={MessageSquare} iconBgColor="bg-blue-100" />
            <GuideCard slug="/guides/tiktok-seo-2025" title="TikTok-SEO" text="Caption-Keyword, CC-Index & Clips: nutze TikTok als Suchmaschine." icon={TrendingUp} iconBgColor="bg-orange-100" />
            <GuideCard slug="/guides/multi-platform-seo-2026" title="Multi-Platform SEO" text="Ein Video – vier Plattformen. So maximierst du Reichweite auf Google, YouTube, TikTok & LinkedIn." icon={Layers} iconBgColor="bg-indigo-100" />
            <GuideCard title="AI Overviews" text="90% der Google-Suchen zeigen KI-Antworten. Werde zur zitierten Quelle." icon={Brain} iconBgColor="bg-purple-100" />
            <GuideCard title="Zero-Click Search" text="Antworten ohne Klick – kurzer, zitierfähiger Content sichert Sichtbarkeit." icon={MousePointer} iconBgColor="bg-green-100" />
            <GuideCard title="Social Search" text="TikTok & Reels werden zur Suchmaschine. Deine Kurzvideos brauchen SEO." icon={Smartphone} iconBgColor="bg-pink-100" />
          </div>
        </div>
      </section>

      {/* BreadcrumbList Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
            { "@type": "ListItem", "position": 2, "name": "Guides", "item": `${SITE_URL}/hub` }
          ]
        })
      }} />
    </div>
  );
};

export default Hub;

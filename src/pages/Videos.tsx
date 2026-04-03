import { Navigation } from "@/components/layout/navigation";
import { VideoMasonry } from "@/components/ui/video-masonry";
import { useSeo } from "@/hooks/use-seo";

const Videos = () => {
  useSeo({
    title: "Video-Bibliothek – MareenSocialUp",
    description: "Alle Videos zu Social SEO, YouTube-Optimierung, TikTok-SEO und KI-Content-Strategien auf einen Blick.",
    canonical: "https://mareensocialup.de/videos",
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <section className="py-16 px-4 sm:px-6 lg:px-8 pt-24">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-headline font-bold text-secondary mb-10 text-center">
            Video-Bibliothek
          </h1>
          <VideoMasonry count="all" lazy={false} />
        </div>
      </section>
    </div>
  );
};

export default Videos;
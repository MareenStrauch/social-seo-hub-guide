import { Navigation } from "@/components/layout/navigation";
import { VideoMasonry } from "@/components/ui/video-masonry";

const Videos = () => {
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
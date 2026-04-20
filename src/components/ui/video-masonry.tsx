import guidesData from "@/data/guides-content.json";

interface VideoMasonryProps {
  count: number | "all";
  lazy?: boolean;
}

type GuideVideo = {
  id: string;
  youtubeId: string;
  title: string;
  caption?: string;
  thumbnail: string;
  durationLabel: string;
  guideSlug: string;
};

// ISO 8601 duration (PT0M27S) -> "0:27"
function formatDuration(iso: string): string {
  const m = iso.match(/PT(?:(\d+)M)?(?:(\d+)S)?/);
  const minutes = parseInt(m?.[1] ?? "0", 10);
  const seconds = parseInt(m?.[2] ?? "0", 10);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

const realVideos: GuideVideo[] = guidesData.guides
  .filter((g: any) => g.video?.youtubeId)
  .map((g: any) => ({
    id: g.id,
    youtubeId: g.video.youtubeId,
    title: g.video.title,
    caption: g.video.caption,
    thumbnail: g.video.thumbnailUrl || `https://i.ytimg.com/vi/${g.video.youtubeId}/hqdefault.jpg`,
    durationLabel: formatDuration(g.video.duration || "PT0M0S"),
    guideSlug: g.slug,
  }));

export function VideoMasonry({ count, lazy = true }: VideoMasonryProps) {
  const displayVideos = count === "all" ? realVideos : realVideos.slice(0, count);

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {displayVideos.map((video) => (
        <a
          key={video.id}
          href={video.guideSlug}
          className="group block"
          aria-label={`Zum Guide: ${video.title}`}
        >
          <div className="relative aspect-[9/16] bg-muted rounded-soft overflow-hidden mb-3 group-hover:shadow-float transition-all duration-300">
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading={lazy ? "lazy" : "eager"}
            />
            <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded font-numbers">
              {video.durationLabel}
            </div>
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
              <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center opacity-90 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100 shadow-lg">
                <svg className="w-6 h-6 text-primary-foreground ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>
          <h3 className="font-medium text-foreground group-hover:text-secondary transition-colors line-clamp-2">
            {video.title}
          </h3>
          {video.caption && (
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{video.caption}</p>
          )}
        </a>
      ))}
    </div>
  );
}

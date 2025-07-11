
interface VideoMasonryProps {
  count: number | "all";
  lazy?: boolean;
}

const mockVideos = [
  {
    id: "abc123",
    title: "YouTube SEO in 5 Minuten erklärt",
    thumbnail: "https://img.youtube.com/vi/abc123/maxresdefault.jpg",
    duration: "5:24",
    slug: "youtube-seo-basics"
  },
  {
    id: "def456", 
    title: "TikTok als Suchmaschine nutzen",
    thumbnail: "https://img.youtube.com/vi/def456/maxresdefault.jpg",
    duration: "8:17",
    slug: "tiktok-seo-guide"
  },
  {
    id: "ghi789",
    title: "ChatGPT für Content Marketing",
    thumbnail: "https://img.youtube.com/vi/ghi789/maxresdefault.jpg", 
    duration: "12:45",
    slug: "chatgpt-marketing"
  },
  {
    id: "jkl012",
    title: "AI Overviews optimieren",
    thumbnail: "https://img.youtube.com/vi/jkl012/maxresdefault.jpg",
    duration: "6:33",
    slug: "ai-overviews"
  },
  {
    id: "mno345",
    title: "Zero-Click Search verstehen", 
    thumbnail: "https://img.youtube.com/vi/mno345/maxresdefault.jpg",
    duration: "9:12",
    slug: "zero-click-search"
  },
  {
    id: "pqr678",
    title: "Schema Markup für Videos",
    thumbnail: "https://img.youtube.com/vi/pqr678/maxresdefault.jpg",
    duration: "15:28",
    slug: "schema-markup"
  }
];

export function VideoMasonry({ count, lazy = true }: VideoMasonryProps) {
  const displayVideos = count === "all" ? mockVideos : mockVideos.slice(0, count);

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {displayVideos.map((video) => (
        <div key={video.id} className="group cursor-pointer">
          <a href={`/videos/${video.slug}`} className="block">
            <div className="relative aspect-[9/16] bg-muted rounded-soft overflow-hidden mb-3 group-hover:shadow-float transition-all duration-300">
              <img 
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading={lazy ? "lazy" : "eager"}
              />
              <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded font-numbers">
                {video.duration}
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
                  <svg className="w-5 h-5 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
            </div>
            <h3 className="font-medium text-foreground group-hover:text-secondary transition-colors line-clamp-2">
              {video.title}
            </h3>
          </a>
        </div>
      ))}
    </div>
  );
}

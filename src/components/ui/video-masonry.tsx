interface VideoMasonryProps {
  count: number | "all";
  lazy?: boolean;
}

const videos = [
  {
    id: "vLrZ988pPRk",
    title: "YouTube-SEO 2025: 40-Zeichen-Formel",
    text: "Warum die ersten 40 Zeichen deines Titels über Klick und Ranking entscheiden.",
    thumbnail: "https://i.ytimg.com/vi/vLrZ988pPRk/hqdefault.jpg",
    duration: "0:27",
    href: "/guides/youtube-seo-2025",
  },
  {
    id: "ruO63jNcTdk",
    title: "TikTok SEO 2025: 3 Schritte für die In-App-Suche",
    text: "Keyword-Caption, Auto-Untertitel und Frage-Hook - sofort umsetzbar.",
    thumbnail: "https://i.ytimg.com/vi/ruO63jNcTdk/hqdefault.jpg",
    duration: "0:30",
    href: "/guides/tiktok-seo-2025",
  },
  {
    id: "AjXVOQ2P7jQ",
    title: "R-O-I Promptformel: Rolle, Output, Input",
    text: "Die 3-Schritt-Formel für KI-Inhalte ohne Korrekturschleifen.",
    thumbnail: "https://i.ytimg.com/vi/AjXVOQ2P7jQ/hqdefault.jpg",
    duration: "0:30",
    href: "/guides/chatgpt-marketing-roi-prompt",
  },
];

export function VideoMasonry({ count, lazy = true }: VideoMasonryProps) {
  const displayVideos = count === "all" ? videos : videos.slice(0, count);

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {displayVideos.map((video) => (
        <div key={video.id} className="group">
          <a href={video.href} className="block">
            <div className="relative aspect-video bg-muted rounded-soft overflow-hidden mb-3 group-hover:shadow-float transition-all duration-300">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading={lazy ? "lazy" : "eager"}
                width={480}
                height={360}
              />
              <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded font-numbers">
                {video.duration}
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center opacity-90 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-5 h-5 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
            <h3 className="font-medium text-foreground group-hover:text-secondary transition-colors line-clamp-2">
              {video.title}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{video.text}</p>
          </a>
        </div>
      ))}
    </div>
  );
}

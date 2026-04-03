import { useEffect } from "react";

interface SeoProps {
  title: string;
  description: string;
  canonical?: string;
  keywords?: string[];
  ogTitle?: string;
  ogDescription?: string;
}

function upsertMeta(attr: string, value: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${value}"]`) as HTMLMetaElement | null;
  if (el) {
    el.content = content;
  } else {
    el = document.createElement("meta");
    if (attr === "name") el.name = value;
    else el.setAttribute(attr, value);
    el.content = content;
    document.head.appendChild(el);
  }
  return el;
}

export function useSeo({ title, description, canonical, keywords, ogTitle, ogDescription }: SeoProps) {
  useEffect(() => {
    document.title = title;

    const metaDesc = upsertMeta("name", "description", description);
    const metaKeywords = keywords?.length ? upsertMeta("name", "keywords", keywords.join(", ")) : null;
    const metaOgTitle = ogTitle ? upsertMeta("property", "og:title", ogTitle) : null;
    const metaOgDesc = ogDescription ? upsertMeta("property", "og:description", ogDescription) : null;

    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (canonical) {
      if (!link) {
        link = document.createElement("link");
        link.rel = "canonical";
        document.head.appendChild(link);
      }
      link.href = canonical;
    }

    return () => {
      document.title = "MareenSocialUp - Social SEO & Video Strategien für Creator";
      if (metaDesc) metaDesc.content = "Social SEO, Video SEO & KI-Content-Strategien für Creator und Marketing-Teams.";
      if (metaKeywords) metaKeywords.remove();
      if (metaOgTitle) metaOgTitle.remove();
      if (metaOgDesc) metaOgDesc.remove();
      if (link) link.remove();
    };
  }, [title, description, canonical, keywords, ogTitle, ogDescription]);
}

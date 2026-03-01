import { useEffect } from "react";

interface SeoProps {
  title: string;
  description: string;
  canonical?: string;
}

export function useSeo({ title, description, canonical }: SeoProps) {
  useEffect(() => {
    document.title = title;

    // Meta description
    let metaDesc = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (metaDesc) {
      metaDesc.content = description;
    } else {
      metaDesc = document.createElement("meta");
      metaDesc.name = "description";
      metaDesc.content = description;
      document.head.appendChild(metaDesc);
    }

    // Canonical
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
      // Reset to defaults on unmount
      document.title = "MareenSocialUp - Social SEO & Video Strategien für Creator";
      if (metaDesc) metaDesc.content = "Social SEO, Video SEO & KI-Content-Strategien für Creator und Marketing-Teams.";
      if (link) link.remove();
    };
  }, [title, description, canonical]);
}

/**
 * Vite plugin: Static Meta Pages
 *
 * After build, copies index.html for each defined route and injects
 * route-specific <title>, <meta>, <link rel="canonical">, and OG tags
 * directly into the raw HTML. This makes every page unique for crawlers
 * and LLMs without requiring JavaScript rendering.
 */

import { Plugin } from "vite";
import * as fs from "fs";
import * as path from "path";

interface RouteMeta {
  path: string;
  title: string;
  description: string;
  canonical: string;
  ogTitle?: string;
  ogDescription?: string;
  ogType?: string;
}

const SITE = "https://mareensocialup.de";

const routes: RouteMeta[] = [
  {
    path: "/",
    title: "MareenSocialUp – Technical Video SEO & GEO Audits für Creator",
    description:
      "Optimiere deine Videos technisch für Google Video SERPs und AI Overviews. Kostenlose Checkliste für YouTube SEO, TikTok SEO & GEO Readiness.",
    canonical: `${SITE}/`,
    ogTitle: "MareenSocialUp – Technical Video SEO & GEO Audits für Creator",
    ogDescription:
      "Optimiere deine Videos technisch für Google Video SERPs und AI Overviews.",
    ogType: "website",
  },
  {
    path: "/guides",
    title: "Social SEO Guides – YouTube, TikTok & GEO Readiness",
    description:
      "Praxisleitfäden für bessere Sichtbarkeit in Google, TikTok und YouTube. Technical Video SEO & GEO Audits.",
    canonical: `${SITE}/guides`,
    ogTitle: "Social SEO Guides – YouTube, TikTok & GEO Readiness",
    ogDescription:
      "Praxisleitfäden für bessere Sichtbarkeit in Google, TikTok und YouTube.",
    ogType: "website",
  },
  {
    path: "/guides/youtube-seo-2025",
    title: "YouTube-SEO 2025: So ranken deine Videos in Google & Shorts",
    description:
      "Titel-Formel, Kapitel-Schema & KI-Snippet – der schnelle Weg zu Top-10 & AI Overviews.",
    canonical: `${SITE}/guides/youtube-seo-2025`,
    ogTitle: "YouTube-SEO 2025: So ranken deine Videos in Google & Shorts",
    ogDescription:
      "Titel-Formel, Kapitel-Schema & KI-Snippet – der schnelle Weg zu Top-10 & AI Overviews.",
    ogType: "article",
  },
  {
    path: "/guides/chatgpt-marketing-roi-prompt",
    title: "ChatGPT-Marketing: R-O-I-Prompt für punktgenaue Inhalte",
    description:
      "Rolle-Output-Input: die 3-Schritt-Prompt-Formel für KI-Content ohne Korrekturschleifen.",
    canonical: `${SITE}/guides/chatgpt-marketing-roi-prompt`,
    ogTitle: "ChatGPT-Marketing: R-O-I-Prompt für punktgenaue Inhalte",
    ogDescription:
      "Rolle-Output-Input: die 3-Schritt-Prompt-Formel für KI-Content ohne Korrekturschleifen.",
    ogType: "article",
  },
  {
    path: "/guides/tiktok-seo-2025",
    title:
      "TikTok-SEO 2025: Ranken in der In-App-Suche & Google Perspectives",
    description:
      "Keyword-Caption, Auto-Untertitel & Frage-Hook – 3 Sofort-Hebel für mehr Sichtbarkeit deiner Clips.",
    canonical: `${SITE}/guides/tiktok-seo-2025`,
    ogTitle:
      "TikTok-SEO 2025: Ranken in der In-App-Suche & Google Perspectives",
    ogDescription:
      "Keyword-Caption, Auto-Untertitel & Frage-Hook – 3 Sofort-Hebel für mehr Sichtbarkeit.",
    ogType: "article",
  },
  {
    path: "/videos",
    title: "Video-Bibliothek – MareenSocialUp",
    description:
      "Alle Videos zu Social SEO, YouTube-Optimierung, TikTok-SEO und KI-Content-Strategien auf einen Blick.",
    canonical: `${SITE}/videos`,
    ogTitle: "Video-Bibliothek – MareenSocialUp",
    ogDescription:
      "Alle Videos zu Social SEO, YouTube-Optimierung und KI-Content auf einen Blick.",
    ogType: "website",
  },
  {
    path: "/impressum",
    title: "Impressum – MareenSocialUp",
    description: "Impressum von MareenSocialUp. Angaben gemäß § 5 TMG.",
    canonical: `${SITE}/impressum`,
    ogType: "website",
  },
  {
    path: "/datenschutz",
    title: "Datenschutzerklärung – MareenSocialUp",
    description: "Datenschutzerklärung von MareenSocialUp gemäß DSGVO.",
    canonical: `${SITE}/datenschutz`,
    ogType: "website",
  },
];

function escHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

function injectMeta(html: string, route: RouteMeta): string {
  let result = html;

  // Replace <title>
  result = result.replace(
    /<title>[^<]*<\/title>/,
    `<title>${escHtml(route.title)}</title>`
  );

  // Replace meta description
  result = result.replace(
    /<meta name="description" content="[^"]*"/,
    `<meta name="description" content="${escHtml(route.description)}"`
  );

  // Replace or insert canonical
  if (result.includes('rel="canonical"')) {
    result = result.replace(
      /<link rel="canonical" href="[^"]*"/,
      `<link rel="canonical" href="${route.canonical}"`
    );
  } else {
    result = result.replace(
      "</head>",
      `    <link rel="canonical" href="${route.canonical}" />\n  </head>`
    );
  }

  // Replace OG tags
  if (route.ogTitle) {
    result = result.replace(
      /<meta property="og:title" content="[^"]*"/,
      `<meta property="og:title" content="${escHtml(route.ogTitle)}"`
    );
  }
  if (route.ogDescription) {
    result = result.replace(
      /<meta property="og:description" content="[^"]*"/,
      `<meta property="og:description" content="${escHtml(route.ogDescription)}"`
    );
  }
  if (route.ogType) {
    result = result.replace(
      /<meta property="og:type" content="[^"]*"/,
      `<meta property="og:type" content="${route.ogType}"`
    );
  }
  result = result.replace(
    /<meta property="og:url" content="[^"]*"/,
    `<meta property="og:url" content="${route.canonical}"`
  );

  return result;
}

export default function staticMetaPlugin(): Plugin {
  return {
    name: "vite-plugin-static-meta",
    apply: "build",
    closeBundle() {
      const distDir = path.resolve(__dirname, "dist");
      const indexPath = path.join(distDir, "index.html");

      if (!fs.existsSync(indexPath)) {
        console.warn("[static-meta] dist/index.html not found, skipping.");
        return;
      }

      const baseHtml = fs.readFileSync(indexPath, "utf-8");

      for (const route of routes) {
        const customHtml = injectMeta(baseHtml, route);

        if (route.path === "/") {
          // Overwrite root index.html
          fs.writeFileSync(indexPath, customHtml, "utf-8");
          console.log(`[static-meta] ✓ / (index.html)`);
        } else {
          // Create sub-directory with index.html
          const dir = path.join(distDir, route.path);
          fs.mkdirSync(dir, { recursive: true });
          fs.writeFileSync(path.join(dir, "index.html"), customHtml, "utf-8");
          console.log(`[static-meta] ✓ ${route.path}/index.html`);
        }
      }

      console.log(
        `[static-meta] Generated ${routes.length} static HTML files.`
      );
    },
  };
}

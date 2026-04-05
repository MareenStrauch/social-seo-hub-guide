#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const DIST = 'dist';
const SITE = 'https://mareensocialup.de';
const GA_MEASUREMENT_ID = 'G-5HB3L36YFZ';

// --- Read guide data ---
const guidesData = JSON.parse(fs.readFileSync('src/data/guides-content.json', 'utf-8'));

// --- Shared CSS ---
const CSS = `
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@400;500;600;700;800&display=swap');
:root{
  --primary:#D2604C;--secondary:#5C7CE2;--tertiary:#FFDFD8;
  --bg:#F0F0F0;--card:#fff;--text:#1A1A1A;--muted:#757575;--border:#E8E8E8;
  --radius:0.5rem;--radius-soft:1.25rem;
  --font-body:'Inter',system-ui,sans-serif;--font-headline:'Outfit','Inter',sans-serif;
}
html{font-family:var(--font-body);color:var(--text);background:var(--bg);line-height:1.6;-webkit-font-smoothing:antialiased}
body{min-height:100vh}
a{color:var(--secondary);text-decoration:none}a:hover{text-decoration:underline}
img{max-width:100%;height:auto;display:block}
h1,h2,h3,h4{font-family:var(--font-headline);line-height:1.2;color:var(--text)}
h1{font-size:clamp(1.75rem,4vw,2.75rem);font-weight:800}
h2{font-size:clamp(1.35rem,3vw,2rem);font-weight:700;margin-top:2rem}
h3{font-size:1.15rem;font-weight:600;margin-top:1.5rem}
p{margin-top:0.75rem}
ul,ol{margin:0.75rem 0 0 1.5rem}li{margin-top:0.35rem}

/* Layout */
.wrap{max-width:72rem;margin:0 auto;padding:0 1rem}
.wrap-narrow{max-width:48rem;margin:0 auto;padding:0 1rem}

/* Nav */
.nav{position:sticky;top:0;z-index:50;background:rgba(255,255,255,.85);backdrop-filter:blur(12px);border-bottom:1px solid var(--border);padding:.75rem 0}
.nav-inner{display:flex;align-items:center;justify-content:space-between;max-width:72rem;margin:0 auto;padding:0 1rem}
.nav-brand{display:flex;align-items:center;gap:.5rem;font-family:var(--font-headline);font-weight:700;font-size:1.15rem;color:var(--secondary)}
.nav-brand img{height:3rem;width:auto}
.nav-links{display:flex;align-items:center;gap:1.5rem}
.nav-links a{color:var(--text);font-size:.95rem}
.nav-links a:hover{color:var(--secondary);text-decoration:none}
.btn-cta{display:inline-flex;align-items:center;gap:.5rem;background:linear-gradient(135deg,var(--primary),var(--secondary));color:#fff;padding:.55rem 1.25rem;border-radius:var(--radius-soft);font-weight:600;font-size:.9rem;text-decoration:none;transition:opacity .2s}
.btn-cta:hover{opacity:.9;text-decoration:none}

/* Hero */
.hero{padding:3rem 0;text-align:center}
.hero-card{background:var(--tertiary);border-radius:2rem;padding:3rem 2rem;position:relative;overflow:hidden}
.hero-card::before{content:'';position:absolute;inset:0;background:linear-gradient(to bottom,rgba(255,255,255,.4),transparent);pointer-events:none}
.hero-card>*{position:relative}
.hero img.avatar{width:7rem;height:7rem;border-radius:50%;margin:0 auto;object-fit:cover;border:4px solid var(--primary);box-shadow:0 0 30px rgba(92,124,226,.15)}
.hero h1{margin-top:1.5rem;color:var(--secondary)}
.hero p{margin-top:1rem;color:var(--muted);max-width:36rem;margin-left:auto;margin-right:auto;font-size:1.05rem}

/* Cards Grid */
.grid3{display:grid;gap:1.5rem;grid-template-columns:repeat(auto-fit,minmax(280px,1fr))}
.card{background:var(--card);border-radius:var(--radius-soft);padding:1.75rem;box-shadow:0 4px 20px -8px rgba(0,0,0,.08);transition:transform .2s,box-shadow .2s}
.card:hover{transform:translateY(-2px);box-shadow:0 8px 32px -12px rgba(0,0,0,.12)}
.card h3{margin-top:.75rem;color:var(--secondary)}
.card p{color:var(--muted);font-size:.95rem}
.card a{display:block;text-decoration:none;color:inherit}
.card a:hover{text-decoration:none}

/* Sections */
.section{padding:3rem 0}
.section-alt{background:linear-gradient(to bottom,var(--bg),#f7f2f0)}
.section-title{text-align:center;margin-bottom:2rem}
.section-title h2{color:var(--primary)}
.section-title p{color:var(--muted);max-width:40rem;margin:0.5rem auto 0}

/* Info tiles */
.tile{background:var(--card);border-radius:var(--radius-soft);padding:1.5rem;text-align:center}
.tile h3{color:var(--secondary);margin-top:.75rem}
.tile p{color:var(--muted);font-size:.9rem}

/* Guide specific */
.guide-hero{padding:4rem 0 2rem;text-align:center}
.guide-hero h1{color:var(--secondary)}
.guide-hero .sub{color:var(--muted);font-size:1.05rem;margin-top:.5rem}
.guide-intro{font-size:1.05rem;line-height:1.7;margin-top:1.5rem;color:var(--text)}
.personal-note{background:var(--tertiary);border-radius:var(--radius-soft);padding:1.25rem 1.5rem;margin:2rem 0;font-size:.95rem}
.personal-note strong{color:var(--primary)}

.capsule{background:var(--card);border-radius:var(--radius-soft);padding:1.5rem;margin:2rem 0;border-left:4px solid var(--primary);box-shadow:0 2px 12px -4px rgba(0,0,0,.06)}
.capsule .answer{background:#fef9f7;padding:.75rem 1rem;border-radius:.5rem;margin:.75rem 0;font-weight:500;color:var(--text);font-size:.95rem}
.capsule .body{color:var(--muted);font-size:.95rem;white-space:pre-line}
.data-point{background:linear-gradient(135deg,var(--secondary),#4a6bd4);color:#fff;border-radius:.75rem;padding:1rem 1.25rem;margin:1rem 0;font-size:.9rem;font-weight:500}

/* Comparison */
.comparison{display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;margin:2rem 0}
@media(max-width:640px){.comparison{grid-template-columns:1fr}}
.comp-bad{background:#fef2f2;border-radius:var(--radius-soft);padding:1.25rem}
.comp-good{background:#f0fdf4;border-radius:var(--radius-soft);padding:1.25rem}
.comp-bad h3{color:#dc2626}.comp-good h3{color:#16a34a}
.comp-example{font-style:italic;margin:.5rem 0;padding:.5rem;background:rgba(0,0,0,.03);border-radius:.25rem;font-size:.9rem}

/* Checklist */
.checklist{background:var(--card);border-radius:var(--radius-soft);padding:1.5rem;margin:2rem 0}
.checklist li{padding:.25rem 0}
.checklist li::marker{content:'☐ '}

/* FAQ */
.faq{margin:2rem 0}
.faq details{background:var(--card);border-radius:var(--radius);margin:.5rem 0;padding:1rem 1.25rem;box-shadow:0 1px 4px rgba(0,0,0,.04)}
.faq summary{cursor:pointer;font-weight:600;font-size:.95rem;color:var(--secondary);list-style:none}
.faq summary::before{content:'▸ ';color:var(--primary)}
.faq details[open] summary::before{content:'▾ '}
.faq details p{font-size:.9rem;color:var(--muted);margin-top:.5rem}

/* Video embed */
.video-embed{margin:2rem auto;max-width:20rem;text-align:center}
.video-embed iframe{width:100%;aspect-ratio:9/16;border:none;border-radius:var(--radius-soft)}
.video-embed p{font-size:.85rem;color:var(--muted);margin-top:.5rem}

/* Footer */
.footer{background:var(--text);color:#fff;padding:3rem 0 2rem;margin-top:3rem}
.footer a{color:rgba(255,255,255,.8)}
.footer a:hover{color:var(--primary)}
.footer-grid{display:grid;grid-template-columns:2fr 1fr 1fr;gap:2rem}
@media(max-width:768px){.footer-grid{grid-template-columns:1fr}}
.footer h3{font-family:var(--font-headline);font-size:1rem;font-weight:700;margin-bottom:1rem}
.footer ul{list-style:none;margin:0;padding:0}.footer li{margin:.5rem 0}
.footer-copy{border-top:1px solid rgba(255,255,255,.15);margin-top:2rem;padding-top:1.5rem;text-align:center;font-size:.85rem;color:rgba(255,255,255,.5)}
.footer-brand{font-family:var(--font-headline);font-size:1.15rem;font-weight:700;margin-bottom:.75rem}
.footer-brand img{height:2.5rem;width:auto;display:inline-block;vertical-align:middle;margin-right:.5rem}
.footer-desc{color:rgba(255,255,255,.7);font-size:.9rem;max-width:28rem;line-height:1.6}
.social-links{display:flex;gap:.75rem;margin-top:1rem}
.social-links a{color:rgba(255,255,255,.7);font-size:.85rem;padding:.4rem .75rem;border-radius:2rem;background:rgba(255,255,255,.08)}
.social-links a:hover{background:rgba(255,255,255,.15);color:#fff;text-decoration:none}

/* Prose for legal pages */
.prose{line-height:1.7}.prose h2{margin-top:2rem}.prose h3{margin-top:1.25rem}
.prose p{margin-top:.6rem;font-size:.95rem;color:var(--muted)}
.prose strong{color:var(--text)}
.prose address{font-style:normal}
.prose ul{margin:.5rem 0 0 1.5rem}.prose li{font-size:.95rem;color:var(--muted)}
.legal-card{background:var(--card);border-radius:var(--radius-soft);padding:2rem;box-shadow:0 4px 20px -8px rgba(0,0,0,.08)}

/* Mobile nav toggle */
.nav-toggle{display:none;background:none;border:none;font-size:1.5rem;cursor:pointer;color:var(--text);padding:.25rem}
@media(max-width:768px){
  .nav-links{display:none}.nav-toggle{display:block}
  .nav-mobile{display:flex;flex-direction:column;gap:.75rem;padding:1rem 0;border-top:1px solid var(--border)}
}

/* Guide navigation */
.guide-pagination{display:flex;justify-content:space-between;gap:1rem;flex-wrap:wrap;margin:2.5rem 0 0;padding-top:2rem;border-top:1px solid var(--border)}
.nav-pill{display:inline-flex;align-items:center;padding:.7rem 1rem;border-radius:var(--radius-soft);font-weight:600;transition:background .2s ease,transform .2s ease}
.nav-pill:hover{text-decoration:none;transform:translateY(-1px)}
.nav-pill-secondary{background:rgba(92,124,226,.1);color:var(--secondary)}
.nav-pill-secondary:hover{background:rgba(92,124,226,.16)}
.nav-pill-primary{background:rgba(210,96,76,.1);color:var(--primary)}
.nav-pill-primary:hover{background:rgba(210,96,76,.16)}

/* Cookie banner */
.cookie-banner{position:fixed;left:0;right:0;bottom:0;z-index:100;padding:1rem}
.cookie-banner[hidden]{display:none}
.cookie-banner-card{max-width:48rem;margin:0 auto;background:var(--card);border:1px solid var(--border);border-radius:1.25rem;box-shadow:0 18px 40px -24px rgba(0,0,0,.28);padding:1rem 1.25rem;display:flex;gap:1rem;align-items:center}
.cookie-banner-copy{flex:1;font-size:.92rem;color:var(--muted);line-height:1.55}
.cookie-banner-actions{display:flex;gap:.75rem;flex-shrink:0}
.cookie-btn{appearance:none;border:none;border-radius:999px;padding:.7rem 1rem;font:inherit;font-weight:600;cursor:pointer;transition:opacity .2s ease,transform .2s ease}
.cookie-btn:hover{opacity:.95;transform:translateY(-1px)}
.cookie-btn-secondary{background:#f3f4f6;color:var(--text)}
.cookie-btn-primary{background:linear-gradient(135deg,var(--primary),var(--secondary));color:#fff}
@media(max-width:640px){
  .cookie-banner-card{flex-direction:column;align-items:flex-start}
  .cookie-banner-actions{width:100%}
  .cookie-btn{flex:1;text-align:center;justify-content:center}
}
`;

// --- Shared HTML parts ---
function head(title, description, canonical, extra = '') {
  return `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta name="author" content="Mareen Strauch">
<meta name="robots" content="index, follow">
<link rel="canonical" href="${esc(canonical)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:type" content="website">
<meta property="og:url" content="${esc(canonical)}">
<style>${CSS}</style>
${extra}
</head>
<body>`;
}

function nav() {
  return `
<nav class="nav">
  <div class="nav-inner">
    <a href="/" class="nav-brand">
      <img src="/lovable-uploads/mareen-logo.png" alt="MareenSocialUp Logo">
      <span>MareenSocialUp</span>
    </a>
    <div class="nav-links">
      <a href="/guides">Guides</a>
      <a href="/videos">Videos</a>
      <a href="/dl/social-seo-checkliste.pdf" class="btn-cta">Gratis Checkliste</a>
    </div>
  </div>
</nav>`;
}

function footer() {
  const year = new Date().getFullYear();
  return `
<footer class="footer">
  <div class="wrap">
    <div class="footer-grid">
      <div>
        <div class="footer-brand"><img src="/lovable-uploads/mareen-logo.png" alt="Logo">MareenSocialUp</div>
        <p class="footer-desc">Deine Expertin für Social SEO, Video-Optimierung und KI-gestütztes Content Marketing. Hilft Creator*innen und Marketing-Teams, in Google, TikTok und AI-Overviews gefunden zu werden.</p>
        <div class="social-links">
          <a href="https://youtube.com/@mareensocialup">YouTube</a>
          <a href="https://instagram.com/mareensocialup">Instagram</a>
          <a href="https://linkedin.com/in/mareen">LinkedIn</a>
        </div>
      </div>
      <div>
        <h3>SEO Guides</h3>
        <ul>
          <li><a href="/guides/youtube-seo-2025">YouTube SEO Guide</a></li>
          <li><a href="/guides/chatgpt-marketing-roi-prompt">ChatGPT Marketing</a></li>
          <li><a href="/guides/tiktok-seo-2025">TikTok SEO Tipps</a></li>
          <li><a href="/videos">Video-Sammlung</a></li>
        </ul>
      </div>
      <div>
        <h3>Rechtliches</h3>
        <ul>
          <li><a href="/impressum">Impressum</a></li>
          <li><a href="/datenschutz">Datenschutz</a></li>
          <li><a href="/guides">Alle Guides</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-copy">&copy; ${year} MareenSocialUp. Alle Rechte vorbehalten.</div>
  </div>
</footer>`;
}

function cookieBanner() {
  return `
<div id="cookie-banner" class="cookie-banner" hidden>
  <div class="cookie-banner-card">
    <p class="cookie-banner-copy">Wir nutzen Cookies zur Analyse unserer Website. Google Analytics wird nur nach deiner Zustimmung aktiviert. Mehr dazu in unserer <a href="/datenschutz">Datenschutzerklärung</a>.</p>
    <div class="cookie-banner-actions">
      <button id="cookie-decline" class="cookie-btn cookie-btn-secondary" type="button">Ablehnen</button>
      <button id="cookie-accept" class="cookie-btn cookie-btn-primary" type="button">Akzeptieren</button>
    </div>
  </div>
</div>`;
}

function analyticsScript() {
  return `<script>
(function () {
  var GA_ID = '${GA_MEASUREMENT_ID}';
  var STORAGE_KEY = 'cookie-consent';

  function loadAnalytics() {
    if (window.__msuGaLoaded) return;
    window.__msuGaLoaded = true;
    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(script);
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function(){ window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', GA_ID, { anonymize_ip: true });
  }

  function syncConsent() {
    var banner = document.getElementById('cookie-banner');
    var consent = localStorage.getItem(STORAGE_KEY);
    if (banner) banner.hidden = consent !== null;
    if (consent === 'accepted') loadAnalytics();
  }

  document.addEventListener('DOMContentLoaded', function () {
    var acceptButton = document.getElementById('cookie-accept');
    var declineButton = document.getElementById('cookie-decline');
    if (acceptButton) acceptButton.addEventListener('click', function () {
      localStorage.setItem(STORAGE_KEY, 'accepted');
      syncConsent();
    });
    if (declineButton) declineButton.addEventListener('click', function () {
      localStorage.setItem(STORAGE_KEY, 'declined');
      syncConsent();
    });
    syncConsent();
  });
})();
</script>`;
}

function bodyEnd() {
  return cookieBanner() + analyticsScript() + '\n</body>\n</html>';
}

function esc(s) {
  return s.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function nl2p(text) {
  return text.split('\n\n').map(p => `<p>${p.replace(/\n/g,' ')}</p>`).join('\n');
}

// --- Page builders ---

function buildHome() {
  const faqSchema = JSON.stringify({
    "@context":"https://schema.org","@type":"FAQPage",
    "mainEntity":[
      {"@type":"Question","name":"Was ist Social SEO?","acceptedAnswer":{"@type":"Answer","text":"Social SEO optimiert deine Videos und Posts so, dass Algorithmen von Google, TikTok und KI-Bots sie als beste Antwort wählen."}},
      {"@type":"Question","name":"Wie starte ich YouTube-SEO?","acceptedAnswer":{"@type":"Answer","text":"Keyword vorn in den Titel, VideoObject-Schema & Kapitelzeitstempel ergänzen. Die gratis Checkliste hilft Schritt für Schritt."}},
      {"@type":"Question","name":"Warum brauchen Creator jetzt AEO?","acceptedAnswer":{"@type":"Answer","text":"Answer-Engine-Optimierung bringt deine Inhalte gezielt in AI-Overviews & Chatbots – klassisches SEO reicht nicht mehr."}}
    ]
  });
  const orgSchema = JSON.stringify({
    "@context":"https://schema.org","@type":"Organization",
    "name":"MareenSocialUp","url":SITE,
    "logo":`${SITE}/lovable-uploads/mareen-logo.png`,
    "description":"Technical Video SEO & GEO Readiness Audits für Creator und Marketing-Teams.",
    "sameAs":["https://www.youtube.com/@MareenSocialUp","https://www.tiktok.com/@mareensocialup","https://www.instagram.com/mareensocialup"],
    "founder":{"@type":"Person","name":"Mareen","url":SITE}
  });

  return head(
    'MareenSocialUp – Technical Video SEO & GEO Audits für Creator',
    'Optimiere deine Videos technisch für Google Video SERPs und AI Overviews. Kostenlose Checkliste für YouTube SEO, TikTok SEO & GEO Readiness.',
    `${SITE}/`,
    `<script type="application/ld+json">${faqSchema}</script>\n<script type="application/ld+json">${orgSchema}</script>`
  ) + nav() + `

<header class="hero">
  <div class="wrap">
    <div class="hero-card">
      <img class="avatar" src="/lovable-uploads/7349c7f8-f691-401f-abf6-8518c723d7db.png" alt="Mareen Strauch">
      <h1>Technical Video SEO &amp; GEO Readiness: Die Audits für Creator und Marketing-Teams</h1>
      <p>Wir beweisen den ROI deines Contents: Optimiere deine Profile technisch für Google Video SERPs und die Zitatfähigkeit in AI Overviews.</p>
      <p style="margin-top:2rem"><a href="/dl/social-seo-checkliste.pdf" class="btn-cta" style="padding:.85rem 2rem;font-size:1rem">⬇ KOSTENLOS: Deine Technical Video SEO Audit Checkliste sichern</a></p>
    </div>
  </div>
</header>

<section class="section">
  <div class="wrap">
    <div class="section-title">
      <h2>Discovery &amp; Trust: Deshalb ranken deine Videos nicht in der Suche.</h2>
      <p>KI-Modelle zitieren nur Quellen, denen sie vertrauen. Wir beheben die technischen Barrieren für Social Search und Generative Engine Optimization (GEO).</p>
    </div>
    <div class="grid3">
      <div class="card"><a href="/guides/youtube-seo-2025"><h3>🎬 YouTube SEO</h3><p>Titel, Chapters &amp; Schema – so rankt dein nächstes Video auf Platz 1-10.</p></a></div>
      <div class="card"><a href="/guides/chatgpt-marketing-roi-prompt"><h3>🤖 Generative Engine Optimization (GEO) Check</h3><p>Prompts, Rollen &amp; Workflow: KI-Content in 30 Min statt 3 Stunden.</p></a></div>
      <div class="card"><a href="/guides/tiktok-seo-2025"><h3>📈 TikTok SEO</h3><p>Caption-Keyword, CC-Index &amp; Clips: nutze TikTok als Suchmaschine.</p></a></div>
    </div>
  </div>
</section>

<section class="section section-alt">
  <div class="wrap">
    <div class="section-title">
      <h2>So hat sich Suche verändert</h2>
      <p>Die Suchlandschaft entwickelt sich rasant – bleib sichtbar mit den richtigen Strategien</p>
    </div>
    <div class="grid3">
      <div class="tile"><h3>🧠 AI Overviews</h3><p>90 % der Google-Suchen zeigen KI-Antworten. Werde zur zitierten Quelle.</p></div>
      <div class="tile"><h3>🖱️ Zero-Click</h3><p>Antworten ohne Klick – kurzer, zitierfähiger Content sichert Sichtbarkeit.</p></div>
      <div class="tile"><h3>📱 Social Search</h3><p>TikTok &amp; Reels werden zur Suchmaschine. Deine Kurzvideos brauchen SEO.</p></div>
    </div>
  </div>
</section>

<section class="section" itemscope itemtype="https://schema.org/FAQPage">
  <div class="wrap-narrow">
    <div class="section-title">
      <h2>Häufig gestellte Fragen</h2>
      <p>Alles, was du über Social SEO und Video-Optimierung wissen musst</p>
    </div>
    <div class="faq">
      <details itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
        <summary itemprop="name">Was ist Social SEO?</summary>
        <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer"><p itemprop="text">Social SEO optimiert deine Videos und Posts so, dass Algorithmen von Google, TikTok und KI-Bots sie als beste Antwort wählen.</p></div>
      </details>
      <details itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
        <summary itemprop="name">Wie starte ich YouTube-SEO?</summary>
        <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer"><p itemprop="text">Keyword vorn in den Titel, VideoObject-Schema &amp; Kapitelzeitstempel ergänzen. Die gratis Checkliste hilft Schritt für Schritt.</p></div>
      </details>
      <details itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
        <summary itemprop="name">Warum brauchen Creator jetzt AEO?</summary>
        <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer"><p itemprop="text">Answer-Engine-Optimierung bringt deine Inhalte gezielt in AI-Overviews &amp; Chatbots – klassisches SEO reicht nicht mehr.</p></div>
      </details>
    </div>
  </div>
</section>

` + footer() + bodyEnd();
}

function buildHub() {
  const breadcrumb = JSON.stringify({
    "@context":"https://schema.org","@type":"BreadcrumbList",
    "itemListElement":[
      {"@type":"ListItem","position":1,"name":"Home","item":SITE},
      {"@type":"ListItem","position":2,"name":"Guides","item":`${SITE}/guides`}
    ]
  });
  return head(
    'Social SEO Guides – YouTube, TikTok & GEO Readiness',
    'Praxisleitfäden für bessere Sichtbarkeit in Google, TikTok und YouTube. Technical Video SEO & GEO Audits.',
    `${SITE}/guides`,
    `<script type="application/ld+json">${breadcrumb}</script>`
  ) + nav() + `

<section class="section" style="padding-top:5rem">
  <div class="wrap">
    <div class="section-title" style="margin-bottom:3rem">
      <h1>Alle Guides auf einen Blick</h1>
      <p>Praxisleitfäden für bessere Sichtbarkeit in Google, TikTok und YouTube.</p>
    </div>
    <div class="grid3">
      <div class="card"><a href="/guides/youtube-seo-2025"><h3>🎬 YouTube-SEO</h3><p>Titel, Chapters &amp; Schema – so rankt dein nächstes Video auf Platz 1-10.</p></a></div>
      <div class="card"><a href="/guides/chatgpt-marketing-roi-prompt"><h3>🤖 ChatGPT-Marketing</h3><p>Prompts, Rollen &amp; Workflow: KI-Content in 30 Min statt 3 Stunden.</p></a></div>
      <div class="card"><a href="/guides/tiktok-seo-2025"><h3>📈 TikTok-SEO</h3><p>Caption-Keyword, CC-Index &amp; Clips: nutze TikTok als Suchmaschine.</p></a></div>
      <div class="card"><h3>🧠 AI Overviews</h3><p>90% der Google-Suchen zeigen KI-Antworten. Werde zur zitierten Quelle.</p></div>
      <div class="card"><h3>🖱️ Zero-Click Search</h3><p>Antworten ohne Klick – kurzer, zitierfähiger Content sichert Sichtbarkeit.</p></div>
      <div class="card"><h3>📱 Social Search</h3><p>TikTok &amp; Reels werden zur Suchmaschine. Deine Kurzvideos brauchen SEO.</p></div>
    </div>
  </div>
</section>

` + footer() + bodyEnd();
}

function buildGuide(guide) {
  const prevGuide = guide.navigation?.prev
    ? guidesData.guides.find((entry) => entry.id === guide.navigation.prev) ?? null
    : null;
  const nextGuide = guide.navigation?.next
    ? guidesData.guides.find((entry) => entry.id === guide.navigation.next) ?? null
    : null;

  const schemaTag = guide.schema
    ? `<script type="application/ld+json">${JSON.stringify(guide.schema)}</script>`
    : '';

  let html = head(
    guide.meta.title,
    guide.meta.description,
    `${SITE}${guide.slug}`,
    `<meta name="keywords" content="${guide.meta.keywords.join(', ')}">\n${schemaTag}`
  ) + nav();

  // Hero
  html += `
<header class="guide-hero">
  <div class="wrap-narrow">
    <h1>${esc(guide.hero.headline)}</h1>
    <p class="sub">${esc(guide.hero.subheadline)}</p>
    <p class="guide-intro">${esc(guide.hero.intro)}</p>
  </div>
</header>`;

  // Personal note
  if (guide.personalNote) {
    html += `
<div class="wrap-narrow">
  <div class="personal-note">
    <strong>${esc(guide.personalNote.label)}</strong>
    <p>${esc(guide.personalNote.text)}</p>
  </div>
</div>`;
  }

  // Sections
  html += '<div class="wrap-narrow">';
  for (const sec of guide.sections) {
    html += `
<section class="capsule" id="${sec.id}">
  <h2>${esc(sec.heading)}</h2>
  <div class="answer">${esc(sec.capsule)}</div>
  <div class="body">${nl2p(sec.body)}</div>
  ${sec.dataPoint ? `<div class="data-point">📊 ${esc(sec.dataPoint)}</div>` : ''}
</section>`;
  }

  // Video
  if (guide.video) {
    html += `
<div class="video-embed">
  <iframe src="${guide.video.embedUrl}" title="${esc(guide.video.title)}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>
  <p>${esc(guide.video.caption)}</p>
</div>`;
  }

  // Comparison
  if (guide.comparison) {
    const c = guide.comparison;
    html += `
<div class="comparison">
  <div class="comp-bad">
    <h3>❌ ${esc(c.bad.label)}</h3>
    <div class="comp-example">${esc(c.bad.example)}</div>
    <ul>${c.bad.issues.map(i => `<li>${esc(i)}</li>`).join('')}</ul>
  </div>
  <div class="comp-good">
    <h3>✅ ${esc(c.good.label)}</h3>
    <div class="comp-example">${esc(c.good.example)}</div>
    <ul>${c.good.benefits.map(b => `<li>${esc(b)}</li>`).join('')}</ul>
  </div>
</div>`;
  }

  // Checklist
  if (guide.checklist) {
    html += `
<div class="checklist">
  <h2>Checkliste</h2>
  <ul>${guide.checklist.map(item => `<li>${esc(item)}</li>`).join('\n')}</ul>
</div>`;
  }

  // FAQ
  if (guide.faq) {
    html += `
<div class="faq" itemscope itemtype="https://schema.org/FAQPage">
  <h2>Häufig gestellte Fragen</h2>
  ${guide.faq.map(f => `
  <details itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
    <summary itemprop="name">${esc(f.question)}</summary>
    <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
      <p itemprop="text">${esc(f.answer)}</p>
    </div>
  </details>`).join('')}
</div>`;
  }

  html += `
<nav class="guide-pagination" aria-label="Guide Navigation">
  ${prevGuide
    ? `<a class="nav-pill nav-pill-secondary" href="${prevGuide.slug}">← ${esc(prevGuide.meta.title.split(':')[0])}</a>`
    : '<a class="nav-pill nav-pill-secondary" href="/guides">← Alle Guides</a>'}
  ${nextGuide
    ? `<a class="nav-pill nav-pill-primary" href="${nextGuide.slug}">${esc(nextGuide.meta.title.split(':')[0])} →</a>`
    : '<a class="nav-pill nav-pill-primary" href="/guides">Alle Guides →</a>'}
</nav>`;

  html += '</div>'; // close wrap-narrow

  html += footer() + bodyEnd();
  return html;
}

function buildVideos() {
  return head(
    'Video-Bibliothek – MareenSocialUp',
    'Alle Videos zu Social SEO, YouTube-Optimierung, TikTok-SEO und KI-Content-Strategien auf einen Blick.',
    `${SITE}/videos`
  ) + nav() + `

<section class="section" style="padding-top:5rem">
  <div class="wrap">
    <h1 style="text-align:center;margin-bottom:2rem">Video-Bibliothek</h1>
    <div class="grid3">
      <div class="video-embed"><iframe src="https://www.youtube.com/embed/vLrZ988pPRk" title="YouTube-SEO 2025" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><p>YouTube-SEO 2025: 40-Zeichen-Formel</p></div>
      <div class="video-embed"><iframe src="https://www.youtube.com/embed/ruO63jNcTdk" title="TikTok SEO 2025" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><p>TikTok SEO 2025: 3 Schritte</p></div>
      <div class="video-embed"><iframe src="https://www.youtube.com/embed/AjXVOQ2P7jQ" title="R-O-I Promptformel" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><p>R-O-I Promptformel</p></div>
    </div>
  </div>
</section>

` + footer() + bodyEnd();
}

function buildImpressum() {
  return head(
    'Impressum – MareenSocialUp',
    'Impressum von MareenSocialUp. Angaben gemäß § 5 TMG.',
    `${SITE}/impressum`
  ) + nav() + `

<section class="section prose" style="padding-top:5rem">
  <div class="wrap-narrow">
    <h1>Impressum</h1>
    <div class="legal-card">
      <h2>Angaben gemäß § 5 TMG</h2>
      <p><strong>Mareen Strauch</strong></p>
      <address>Kirchlinder Feld 4<br>44379 Dortmund<br>Deutschland</address>

      <h2>Kontakt</h2>
      <p>E-Mail: hallo@mareensocialup.de</p>

      <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
      <p>Mareen Strauch<br>Kirchlinder Feld 4<br>44379 Dortmund</p>

      <h2>Haftungsausschluss</h2>
      <h3>Haftung für Inhalte</h3>
      <p>Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen.</p>
      <h3>Haftung für Links</h3>
      <p>Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber verantwortlich.</p>

      <h2>Urheberrecht</h2>
      <p>Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung von Mareen Strauch.</p>
    </div>
  </div>
</section>

` + footer() + bodyEnd();
}

function buildDatenschutz() {
  return head(
    'Datenschutzerklärung – MareenSocialUp',
    'Datenschutzerklärung von MareenSocialUp gemäß DSGVO.',
    `${SITE}/datenschutz`
  ) + nav() + `

<section class="section prose" style="padding-top:5rem">
  <div class="wrap-narrow">
    <h1>Datenschutzerklärung</h1>
    <div class="legal-card">
      <h2>1. Datenschutz auf einen Blick</h2>
      <p>Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen.</p>

      <h2>2. Verantwortliche Stelle</h2>
      <p>Verantwortlich für die Datenverarbeitung auf dieser Website ist:</p>
      <p><strong>Mareen Strauch</strong><br>Kirchlinder Feld 4<br>44379 Dortmund<br>E-Mail: hallo@mareensocialup.de</p>

      <h2>3. Hosting</h2>
      <p>Diese Website wird bei einem externen Dienstleister gehostet (Hoster). Die personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf den Servern des Hosters gespeichert. Der Einsatz des Hosters erfolgt im Interesse einer sicheren, schnellen und effizienten Bereitstellung unseres Online-Angebots (Art. 6 Abs. 1 lit. f DSGVO).</p>

      <h2>4. Allgemeine Hinweise und Pflichtinformationen</h2>
      <h3>Datenschutz</h3>
      <p>Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.</p>
      <h3>Widerruf Ihrer Einwilligung</h3>
      <p>Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können eine bereits erteilte Einwilligung jederzeit widerrufen.</p>
      <h3>Beschwerderecht bei der Aufsichtsbehörde</h3>
      <p>Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein Beschwerderecht bei einer Aufsichtsbehörde zu. Die zuständige Aufsichtsbehörde ist die Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen (LDI NRW).</p>

      <h2>5. Datenerfassung auf dieser Website</h2>
      <h3>Cookies</h3>
      <p>Diese Website verwendet Cookies. Wir verwenden ein Cookie-Consent-Banner, über das Sie der Nutzung von Analyse-Cookies zustimmen oder diese ablehnen können.</p>
      <h3>Server-Log-Dateien</h3>
      <p>Der Provider dieser Website erhebt und speichert automatisch Informationen in sogenannten Server-Log-Dateien: Browsertyp und -version, verwendetes Betriebssystem, Referrer-URL, Hostname des zugreifenden Rechners, Uhrzeit der Serveranfrage und IP-Adresse.</p>

      <h2>6. Analyse-Tools</h2>
      <h3>Google Analytics 4</h3>
      <p>Diese Website nutzt Google Analytics 4. <strong>Wir nutzen Google Analytics ausschließlich mit aktivierter IP-Anonymisierung.</strong> Google Analytics wird nur geladen, wenn Sie über unser Cookie-Banner aktiv eingewilligt haben (Art. 6 Abs. 1 lit. a DSGVO). Unsere Measurement ID lautet: G-5HB3L36YFZ.</p>
      <p>Sie können die Erfassung verhindern: <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">Browser-Add-on zur Deaktivierung</a></p>

      <h2>7. YouTube-Einbettungen</h2>
      <p>Auf dieser Website sind Videos des Videoportals YouTube eingebettet. Die Nutzung erfolgt im Interesse einer ansprechenden Darstellung (Art. 6 Abs. 1 lit. f DSGVO). <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google Datenschutzerklärung</a></p>

      <h2>8. Betroffenenrechte</h2>
      <p>Sie haben das Recht:</p>
      <ul>
        <li>Auskunft über Ihre gespeicherten Daten zu erhalten (Art. 15 DSGVO)</li>
        <li>Berichtigung unrichtiger Daten zu verlangen (Art. 16 DSGVO)</li>
        <li>Löschung Ihrer Daten zu verlangen (Art. 17 DSGVO)</li>
        <li>Einschränkung der Verarbeitung zu verlangen (Art. 18 DSGVO)</li>
        <li>Datenübertragbarkeit zu verlangen (Art. 20 DSGVO)</li>
        <li>Widerspruch gegen die Verarbeitung einzulegen (Art. 21 DSGVO)</li>
      </ul>
      <p>Zur Ausübung Ihrer Rechte: hallo@mareensocialup.de</p>

      <h2>9. Aktualität und Änderung dieser Datenschutzerklärung</h2>
      <p>Diese Datenschutzerklärung ist aktuell gültig und hat den Stand April 2026.</p>
    </div>
  </div>
</section>

` + footer() + bodyEnd();
}

// --- Build ---
function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  if (fs.statSync(src).isDirectory()) {
    ensureDir(dest);
    for (const f of fs.readdirSync(src)) {
      copyRecursive(path.join(src, f), path.join(dest, f));
    }
  } else {
    fs.copyFileSync(src, dest);
  }
}

console.log('🔨 Building static site...');

// Clean dist
if (fs.existsSync(DIST)) fs.rmSync(DIST, { recursive: true });
ensureDir(DIST);

// Generate pages
const pages = [
  ['index.html', buildHome()],
  ['guides/index.html', buildHub()],
  ['videos/index.html', buildVideos()],
  ['impressum/index.html', buildImpressum()],
  ['datenschutz/index.html', buildDatenschutz()],
];

// Add guide pages
for (const guide of guidesData.guides) {
  const slugPath = guide.slug.replace(/^\//, '');
  pages.push([`${slugPath}/index.html`, buildGuide(guide)]);
}

for (const [filePath, content] of pages) {
  const fullPath = path.join(DIST, filePath);
  ensureDir(path.dirname(fullPath));
  fs.writeFileSync(fullPath, content, 'utf-8');
  console.log(`  ✅ ${filePath}`);
}

// Copy static assets
copyRecursive('public/lovable-uploads', path.join(DIST, 'lovable-uploads'));
copyRecursive('public/robots.txt', path.join(DIST, 'robots.txt'));
copyRecursive('public/sitemap.xml', path.join(DIST, 'sitemap.xml'));
copyRecursive('public/placeholder.svg', path.join(DIST, 'placeholder.svg'));

// Copy dl folder if exists
if (fs.existsSync('public/dl')) {
  copyRecursive('public/dl', path.join(DIST, 'dl'));
}

console.log('✨ Static site built successfully!');
console.log(`   ${pages.length} pages generated in dist/`);

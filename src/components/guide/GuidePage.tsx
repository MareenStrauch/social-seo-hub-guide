import { Link } from "react-router-dom";
import { Navigation } from "@/components/layout/navigation";
import { Accordion } from "@/components/ui/accordion";
import { FAQ } from "@/components/ui/faq";
import { Checkbox } from "@/components/ui/checkbox";
import { useSeo } from "@/hooks/use-seo";
import { BarChart3, Mail, ArrowRight } from "lucide-react";

const SITE_URL = "https://mareensocialup.de";

/* ─── Types ─── */
interface GuideSection {
  id: string;
  type?: string;
  heading: string;
  capsule?: string;
  body: string;
  codeExample?: string;
  dataPoint?: string;
  steps?: { number?: number; letter?: string; title: string; text: string; example?: string }[];
  comparison?: GuideComparison;
  table?: { headers: string[]; rows: string[][] };
  toolList?: { color: string; name: string; description: string; url?: string }[];
  cta?: {
    headline: string;
    text: string;
    actions: { label: string; url: string; type: "email" | "link" }[];
  };
}

interface GuideComparison {
  bad: { label: string; example: string; issues: string[] };
  good: { label: string; example: string; benefits: string[] };
}

export interface GuideData {
  id: string;
  slug: string;
  meta: {
    title: string;
    description: string;
    keywords?: string[];
    ogTitle?: string;
    ogDescription?: string;
  };
  hero: { headline: string; subheadline: string; intro: string };
  personalNote: { label: string; text: string };
  video?: {
    youtubeId: string;
    url: string;
    embedUrl: string;
    title: string;
    duration: string;
    thumbnailUrl: string;
    caption: string;
  };
  sections: GuideSection[];
  comparison?: GuideComparison;
  checklist: string[];
  faq: { question: string; answer: string }[];
  schema: Record<string, unknown>;
  navigation: { prev: string | null; next: string | null };
}

interface GuidePageProps {
  guide: GuideData;
  allGuides: GuideData[];
}

function findGuideById(guides: GuideData[], id: string | null) {
  if (!id) return null;
  return guides.find((g) => g.id === id) ?? null;
}

/* ─── Parse markdown-style links [text](url) ─── */
function renderInlineLinks(text: string) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (match) {
      return (
        <a key={i} href={match[2]} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
          {match[1]}
        </a>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

/* ─── Render body with \n\n as separate <p> tags ─── */
function BodyText({ text }: { text: string }) {
  const paragraphs = text.split("\n\n");
  return (
    <>
      {paragraphs.map((p, i) => (
        <p key={i} className="text-foreground leading-relaxed mb-4 last:mb-0">
          {renderInlineLinks(p)}
        </p>
      ))}
    </>
  );
}

/* ─── Highlight [ERGÄNZE: ...] placeholders ─── */
function PersonalNoteText({ text }: { text: string }) {
  const parts = text.split(/(\[ERGÄNZE:[^\]]*\])/g);
  return (
    <p className="text-foreground leading-relaxed italic">
      {parts.map((part, i) =>
        part.startsWith("[ERGÄNZE:") ? (
          <span
            key={i}
            className="bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-200 border border-dashed border-amber-400 dark:border-amber-600 rounded px-1.5 py-0.5 not-italic text-sm"
          >
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </p>
  );
}

/* ─── Answer Capsule – consistent primary border, supports links ─── */
function AnswerCapsule({ text }: { text: string }) {
  return (
    <p
      className="text-lg font-semibold leading-relaxed bg-secondary/5 border-l-4 border-primary rounded-xl px-5 py-4 mb-6"
      data-ai-summary
    >
      {renderInlineLinks(text)}
    </p>
  );
}

/* ─── Steps as visual cards ─── */
function StepsCards({ steps }: { steps: { title: string; text: string; example?: string }[] }) {
  return (
    <div className="my-8 grid gap-4 sm:grid-cols-2">
      {steps.map((step, i) => (
        <div key={i} className="rounded-xl border border-border bg-background p-5 shadow-sm">
          <p className="text-xs font-mono text-primary font-semibold uppercase tracking-wider mb-2">{step.title}</p>
          <p className="text-foreground leading-relaxed text-sm">{renderInlineLinks(step.text)}</p>
          {step.example && (
            <p className="mt-2 text-xs text-muted-foreground italic">{step.example}</p>
          )}
        </div>
      ))}
    </div>
  );
}

/* ─── Data Point Aside – supports links ─── */
function DataPoint({ text }: { text: string }) {
  return (
    <aside className="my-6 flex items-start gap-3 bg-secondary/5 border border-secondary/20 rounded-xl p-5">
      <BarChart3 className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
      <p className="text-sm text-foreground/80 leading-relaxed font-medium">{renderInlineLinks(text)}</p>
    </aside>
  );
}

/* ─── Tool List with colored accents ─── */
const toolColorMap: Record<string, string> = {
  red: "bg-red-500",
  cyan: "bg-cyan-500",
  blue: "bg-blue-500",
  indigo: "bg-indigo-500",
  green: "bg-green-500",
  amber: "bg-amber-500",
};

function ToolList({ tools }: { tools: { color: string; name: string; description: string; url?: string }[] }) {
  return (
    <ul className="my-6 space-y-4">
      {tools.map((tool, i) => (
        <li key={i} className="flex items-start gap-4">
          <span className={`mt-1.5 w-3 h-3 rounded-full shrink-0 ${toolColorMap[tool.color] || "bg-primary"}`} />
          <div>
            {tool.url ? (
              <a href={tool.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-foreground hover:text-primary transition-colors">
                {tool.name}
              </a>
            ) : (
              <span className="font-semibold text-foreground">{tool.name}</span>
            )}
            <p className="text-sm text-muted-foreground leading-relaxed mt-0.5">{tool.description}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
function ComparisonTable({ comparison }: { comparison: GuideComparison }) {
  return (
    <div className="my-10">
      <h3 className="text-2xl font-headline font-semibold text-secondary mb-6">
        Vorher / Nachher
      </h3>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-xl border border-red-200 bg-red-50 p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-bold text-red-600">❌ {comparison.bad.label}</span>
          </div>
          <blockquote className="italic text-foreground/80 border-l-4 border-red-300 pl-4 mb-4 text-sm">
            „{comparison.bad.example}"
          </blockquote>
          <ul className="space-y-1">
            {comparison.bad.issues.map((issue, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-red-500 shrink-0 mt-0.5">–</span>
                {issue}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-green-200 bg-green-50 p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-bold text-green-700">✅ {comparison.good.label}</span>
          </div>
          <blockquote className="italic text-foreground/80 border-l-4 border-green-400 pl-4 mb-4 text-sm">
            „{comparison.good.example}"
          </blockquote>
          <ul className="space-y-1">
            {comparison.good.benefits.map((b, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-green-600 shrink-0 mt-0.5">+</span>
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ─── Responsive Table ─── */
function SectionTable({ table }: { table: { headers: string[]; rows: string[][] } }) {
  return (
    <div className="my-8 overflow-x-auto -mx-4 px-4">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr>
            {table.headers.map((h, i) => (
              <th
                key={i}
                className="text-left font-semibold text-secondary bg-tertiary/30 px-4 py-3 border-b border-border first:rounded-tl-lg last:rounded-tr-lg"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, ri) => (
            <tr key={ri} className="border-b border-border/50 last:border-0">
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  className={`px-4 py-3 leading-relaxed ${ci === 0 ? "font-medium text-foreground" : "text-muted-foreground"}`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ─── Checklist – primary/terrakotta checkboxes ─── */
function ChecklistSection({ items }: { items: string[] }) {
  return (
    <div className="my-10">
      <h3 className="text-2xl font-headline font-semibold text-secondary mb-6">
        Checkliste
      </h3>
      <ol className="space-y-3">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <Checkbox
              id={`check-${i}`}
              className="mt-0.5 border-primary data-[state=checked]:bg-primary data-[state=checked]:border-primary"
            />
            <label htmlFor={`check-${i}`} className="text-foreground leading-relaxed cursor-pointer">
              {item}
            </label>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ─── Main Component ─── */
export function GuidePage({ guide, allGuides }: GuidePageProps) {
  const prevGuide = findGuideById(allGuides, guide.navigation.prev);
  const nextGuide = findGuideById(allGuides, guide.navigation.next);

  useSeo({
    title: guide.meta.title,
    description: guide.meta.description,
    canonical: `${SITE_URL}${guide.slug}`,
    keywords: guide.meta.keywords,
    ogTitle: guide.meta.ogTitle || guide.meta.title,
    ogDescription: guide.meta.ogDescription || guide.meta.description,
  });

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}/hub` },
      { "@type": "ListItem", position: 3, name: guide.meta.title, item: `${SITE_URL}${guide.slug}` },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: guide.faq.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };


  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <article itemScope itemType="https://schema.org/Article" className="pt-24">
        {/* Hero with gradient fade */}
        <section className="relative px-4 sm:px-6 lg:px-8 pt-16 pb-24">
          {/* Background gradient that fades out */}
          <div className="absolute inset-0 bg-gradient-to-b from-tertiary via-tertiary/40 to-transparent pointer-events-none" />
          <div className="relative max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-headline font-bold text-secondary mb-6">
              {guide.hero.headline}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              {guide.hero.subheadline}
            </p>
            <p className="mt-4 text-sm text-muted-foreground font-medium">
              Zuletzt aktualisiert: April 2026
            </p>
            <div className="mt-6 text-lg text-foreground max-w-3xl mx-auto leading-relaxed" data-ai-summary>
              {guide.hero.intro}
            </div>
            <meta itemProp="headline" content={guide.meta.title} />
            <meta itemProp="dateModified" content="2026-04-08" />
            <meta itemProp="author" content="Mareen Strauch" />
            {guide.video && <meta itemProp="image" content={guide.video.thumbnailUrl} />}
          </div>
        </section>

        {/* Content */}
        <section className="px-4 sm:px-6 lg:px-8 pb-16">
          <div className="max-w-4xl mx-auto">
            {/* Personal Note – lighter bg, subtle border */}
            <aside className="my-10 bg-tertiary/20 border border-primary/15 rounded-xl p-6">
              <p className="text-sm font-semibold text-primary/80 mb-2">{guide.personalNote.label}</p>
              <PersonalNoteText text={guide.personalNote.text} />
            </aside>

            {/* Video Embed – directly after personal note */}
            {guide.video && (
            <figure className="my-10">
              <div className="max-w-sm mx-auto">
                <div className="aspect-[9/16] rounded-xl overflow-hidden shadow-float">
                  <iframe
                    src={guide.video.embedUrl}
                    title={guide.video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                    loading="lazy"
                  />
                </div>
                <figcaption className="text-sm text-muted-foreground text-center mt-3">
                  {guide.video.caption}
                </figcaption>
              </div>
            </figure>
            )}

            {/* Sections */}
            {guide.sections.map((section) => (
                <section key={section.id} id={section.id} className="mt-16 scroll-mt-20">
                  <h2 className="text-3xl font-headline font-bold text-secondary mb-6">
                    {section.heading}
                  </h2>
                  {section.capsule && <AnswerCapsule text={section.capsule} />}
                  {section.body && <BodyText text={section.body} />}
                  {section.codeExample && (
                    <pre className="my-6 rounded-xl bg-secondary/5 border border-border p-5 overflow-x-auto text-sm font-mono text-foreground/90 leading-relaxed whitespace-pre">
                      {section.codeExample}
                    </pre>
                  )}
                  {section.steps && <StepsCards steps={section.steps} />}
                  {section.table && <SectionTable table={section.table} />}
                  {section.dataPoint && <DataPoint text={section.dataPoint} />}
                  {section.toolList && <ToolList tools={section.toolList} />}
                  {section.comparison && <ComparisonTable comparison={section.comparison} />}
                </section>
            ))}

            {/* Was ist neu in 2026 – positioned after main content */}
            <aside className="mt-16 mb-10 bg-accent/30 border border-accent rounded-xl p-6">
              <h2 className="text-lg font-headline font-bold text-secondary mb-2">🆕 Was ist neu in 2026?</h2>
              <p className="text-foreground leading-relaxed text-sm">
                KI-Systeme bevorzugen Quellen, die im Schnitt 25 % frischer sind als klassische Google-Ergebnisse. 
                Alle Inhalte auf dieser Seite wurden im April 2026 auf aktuelle Algorithmus-Änderungen, neue Plattform-Features 
                und die neuesten Best Practices überprüft und aktualisiert.
              </p>
            </aside>

            {/* Top-level Comparison */}
            {guide.comparison && <ComparisonTable comparison={guide.comparison} />}

            {/* Checklist */}
            <ChecklistSection items={guide.checklist} />

            {/* FAQ */}
            <div className="mt-12 faq-schema">
              <h3 className="text-2xl font-headline font-semibold text-secondary mb-6">
                Häufig gestellte Fragen
              </h3>
              <Accordion type="single" collapsible className="w-full">
                {guide.faq.map((f) => (
                  <FAQ key={f.question} q={f.question} a={f.answer} />
                ))}
              </Accordion>
            </div>

            {/* Navigation – different font */}
            <nav className="mt-16 pt-8 border-t border-border">
              <div className="flex flex-wrap gap-4 justify-between">
                {prevGuide ? (
                  <Link
                    to={prevGuide.slug}
                    className="inline-flex items-center px-4 py-2 rounded-xl bg-secondary/10 text-secondary hover:bg-secondary/20 transition-colors font-mono text-sm"
                  >
                    ← {prevGuide.meta.title.split(":")[0]}
                  </Link>
                ) : (
                  <Link
                    to="/hub"
                    className="inline-flex items-center px-4 py-2 rounded-xl bg-secondary/10 text-secondary hover:bg-secondary/20 transition-colors font-mono text-sm"
                  >
                    ← Alle Guides
                  </Link>
                )}
                {nextGuide ? (
                  <Link
                    to={nextGuide.slug}
                    className="inline-flex items-center px-4 py-2 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-colors font-mono text-sm"
                  >
                    {nextGuide.meta.title.split(":")[0]} →
                  </Link>
                ) : (
                  <Link
                    to="/hub"
                    className="inline-flex items-center px-4 py-2 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-colors font-mono text-sm"
                  >
                    Alle Guides →
                  </Link>
                )}
              </div>
            </nav>
          </div>
        </section>
      </article>

      {/* JSON-LD Schemas */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(guide.schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </div>
  );
}

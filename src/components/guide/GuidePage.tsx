import { Link } from "react-router-dom";
import { Navigation } from "@/components/layout/navigation";
import { Accordion } from "@/components/ui/accordion";
import { FAQ } from "@/components/ui/faq";
import { Checkbox } from "@/components/ui/checkbox";
import { useSeo } from "@/hooks/use-seo";
import { CheckCircle2, XCircle, AlertTriangle, BarChart3 } from "lucide-react";

const SITE_URL = "https://mareensocialup.de";

/* ─── Types ─── */
interface GuideSection {
  id: string;
  type?: string;
  heading: string;
  capsule?: string;
  body: string;
  dataPoint?: string;
  steps?: { number?: number; letter?: string; title: string; text: string; example?: string }[];
  comparison?: GuideComparison;
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
  video: {
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

/* ─── Render body with \n\n as separate <p> tags ─── */
function BodyText({ text }: { text: string }) {
  const paragraphs = text.split("\n\n");
  return (
    <>
      {paragraphs.map((p, i) => (
        <p key={i} className="text-foreground leading-relaxed mb-4 last:mb-0">
          {p}
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

/* ─── Answer Capsule ─── */
function AnswerCapsule({ text }: { text: string }) {
  return (
    <p
      className="text-lg font-semibold leading-relaxed bg-accent/50 border-l-4 border-primary rounded-soft px-5 py-4 mb-6"
      data-ai-summary
    >
      {text}
    </p>
  );
}

/* ─── Data Point Aside ─── */
function DataPoint({ text }: { text: string }) {
  return (
    <aside className="my-6 flex items-start gap-3 bg-secondary/5 border border-secondary/20 rounded-soft p-5">
      <BarChart3 className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
      <p className="text-sm text-foreground/80 leading-relaxed font-medium">{text}</p>
    </aside>
  );
}

/* ─── Comparison Table ─── */
function ComparisonTable({ comparison }: { comparison: GuideComparison }) {
  return (
    <div className="my-10">
      <h3 className="text-2xl font-headline font-semibold text-secondary mb-6">
        Vorher / Nachher
      </h3>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-soft border border-destructive/30 bg-destructive/5 p-6">
          <div className="flex items-center gap-2 mb-3">
            <XCircle className="w-5 h-5 text-destructive" />
            <span className="font-bold text-destructive">{comparison.bad.label}</span>
          </div>
          <blockquote className="italic text-foreground/80 border-l-4 border-destructive/30 pl-4 mb-4 text-sm">
            „{comparison.bad.example}"
          </blockquote>
          <ul className="space-y-1">
            {comparison.bad.issues.map((issue, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <AlertTriangle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                {issue}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-soft border border-primary/30 bg-primary/5 p-6">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 className="w-5 h-5 text-primary" />
            <span className="font-bold text-primary">{comparison.good.label}</span>
          </div>
          <blockquote className="italic text-foreground/80 border-l-4 border-primary/30 pl-4 mb-4 text-sm">
            „{comparison.good.example}"
          </blockquote>
          <ul className="space-y-1">
            {comparison.good.benefits.map((b, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ─── Checklist with checkboxes ─── */
function ChecklistSection({ items }: { items: string[] }) {
  return (
    <div className="my-10">
      <h3 className="text-2xl font-headline font-semibold text-secondary mb-6">
        Checkliste
      </h3>
      <ol className="space-y-3">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <Checkbox id={`check-${i}`} className="mt-0.5" />
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
        {/* Hero */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-tertiary to-background">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-headline font-bold text-secondary mb-6">
              {guide.hero.headline}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              {guide.hero.subheadline}
            </p>
            <div className="mt-6 text-lg text-foreground max-w-3xl mx-auto leading-relaxed" data-ai-summary>
              {guide.hero.intro}
            </div>
            <meta itemProp="headline" content={guide.meta.title} />
            <meta itemProp="author" content="Mareen Strauch" />
            <meta itemProp="image" content={guide.video.thumbnailUrl} />
          </div>
        </section>

        {/* Content */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">

            {/* Personal Note */}
            <aside className="my-10 bg-tertiary/40 border border-primary/20 rounded-soft p-6">
              <p className="text-sm font-semibold text-primary mb-2">{guide.personalNote.label}</p>
              <PersonalNoteText text={guide.personalNote.text} />
            </aside>
            {/* Video Embed */}
            <figure className="my-10">
              <div className="max-w-sm mx-auto">
                <div className="aspect-[9/16] rounded-soft overflow-hidden shadow-float">
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

            {/* Sections */}
            {guide.sections.map((section) => (
              <section key={section.id} id={section.id} className="mt-16 scroll-mt-20">
                <h2 className="text-3xl font-headline font-bold text-secondary mb-6">
                  {section.heading}
                </h2>
                {section.capsule && <AnswerCapsule text={section.capsule} />}
                <BodyText text={section.body} />
                {section.dataPoint && <DataPoint text={section.dataPoint} />}
                {section.comparison && <ComparisonTable comparison={section.comparison} />}
              </section>
            ))}

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

            {/* Navigation */}
            <nav className="mt-16 pt-8 border-t border-border">
              <div className="flex flex-wrap gap-4 justify-between">
                {prevGuide ? (
                  <Link
                    to={prevGuide.slug}
                    className="inline-flex items-center px-4 py-2 rounded-soft bg-secondary/10 text-secondary hover:bg-secondary/20 transition-colors"
                  >
                    ← {prevGuide.meta.title.split(":")[0]}
                  </Link>
                ) : (
                  <Link
                    to="/hub"
                    className="inline-flex items-center px-4 py-2 rounded-soft bg-secondary/10 text-secondary hover:bg-secondary/20 transition-colors"
                  >
                    ← Alle Guides
                  </Link>
                )}
                {nextGuide ? (
                  <Link
                    to={nextGuide.slug}
                    className="inline-flex items-center px-4 py-2 rounded-soft bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                  >
                    {nextGuide.meta.title.split(":")[0]} →
                  </Link>
                ) : (
                  <Link
                    to="/hub"
                    className="inline-flex items-center px-4 py-2 rounded-soft bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
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

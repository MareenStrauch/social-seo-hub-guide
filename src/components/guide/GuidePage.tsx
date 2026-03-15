import { Navigation } from "@/components/layout/navigation";
import { Accordion } from "@/components/ui/accordion";
import { FAQ } from "@/components/ui/faq";
import { useSeo } from "@/hooks/use-seo";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircle2, XCircle, AlertTriangle } from "lucide-react";

const SITE_URL = "https://social-seo-hub-guide.lovable.app";

interface GuideStep {
  number?: number;
  letter?: string;
  title: string;
  text: string;
  example?: string;
}

interface GuideSection {
  id: string;
  heading: string;
  body: string;
  steps?: GuideStep[];
  comparison?: {
    bad: { label: string; example: string; issues: string[] };
    good: { label: string; example: string; benefits: string[] };
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
    keywords: string[];
    ogTitle: string;
    ogDescription: string;
  };
  hero: {
    headline: string;
    subheadline: string;
    intro: string;
  };
  personalNote: {
    label: string;
    text: string;
  };
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
  navigation: {
    prev: string | null;
    next: string | null;
  };
}

interface GuidePageProps {
  guide: GuideData;
  allGuides: GuideData[];
}

function findGuideById(guides: GuideData[], id: string | null) {
  if (!id) return null;
  return guides.find((g) => g.id === id) ?? null;
}

/* ─── Comparison Table ─── */
function ComparisonTable({ comparison }: { comparison: GuideComparison }) {
  return (
    <div className="my-10">
      <h3 className="text-2xl font-headline font-semibold text-secondary mb-6">
        Vorher / Nachher
      </h3>
      <div className="grid md:grid-cols-2 gap-6">
        {/* Bad */}
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
        {/* Good */}
        <div className="rounded-soft border border-primary/30 bg-primary/5 p-6">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 className="w-5 h-5 text-primary" />
            <span className="font-bold text-primary">{comparison.good.label}</span>
          </div>
          <blockquote className="italic text-foreground/80 border-l-4 border-green-500/30 pl-4 mb-4 text-sm">
            „{comparison.good.example}"
          </blockquote>
          <ul className="space-y-1">
            {comparison.good.benefits.map((b, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ─── Steps Renderer ─── */
function StepsList({ steps }: { steps: GuideStep[] }) {
  return (
    <div className="my-8 space-y-6">
      {steps.map((step, i) => (
        <div key={i} className="flex gap-4 items-start">
          <div className="shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-lg">
            {step.letter ?? step.number ?? i + 1}
          </div>
          <div>
            <h4 className="font-headline font-semibold text-foreground text-lg mb-1">
              {step.title}
            </h4>
            <p className="text-muted-foreground leading-relaxed">{step.text}</p>
            {step.example && (
              <div className="mt-2 bg-muted rounded-soft px-4 py-3 text-sm text-foreground/80 italic border-l-4 border-primary/30">
                Beispiel: {step.example}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Checklist ─── */
function Checklist({ items }: { items: string[] }) {
  return (
    <div className="my-10">
      <h3 className="text-2xl font-headline font-semibold text-secondary mb-6">
        Checkliste
      </h3>
      <ul className="space-y-3">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <span className="text-foreground leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
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
  });

  // Build breadcrumb schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}/hub` },
      { "@type": "ListItem", position: 3, name: guide.meta.title, item: `${SITE_URL}${guide.slug}` },
    ],
  };

  // FAQ schema
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
            <meta itemProp="headline" content={guide.meta.ogTitle} />
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
              <p className="text-foreground leading-relaxed italic">{guide.personalNote.text}</p>
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
                <p className="text-foreground leading-relaxed" data-ai-summary>
                  {section.body}
                </p>
                {section.steps && <StepsList steps={section.steps} />}
                {section.comparison && <ComparisonTable comparison={section.comparison} />}
              </section>
            ))}

            {/* Top-level Comparison */}
            {guide.comparison && <ComparisonTable comparison={guide.comparison} />}

            {/* Checklist */}
            <Checklist items={guide.checklist} />

            {/* FAQ */}
            <div className="mt-12">
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
                  <a
                    href={prevGuide.slug}
                    className="inline-flex items-center px-4 py-2 rounded-soft bg-secondary/10 text-secondary hover:bg-secondary/20 transition-colors"
                  >
                    ← {prevGuide.meta.title.split(":")[0]}
                  </a>
                ) : (
                  <a
                    href="/hub"
                    className="inline-flex items-center px-4 py-2 rounded-soft bg-secondary/10 text-secondary hover:bg-secondary/20 transition-colors"
                  >
                    ← Alle Guides
                  </a>
                )}
                {nextGuide ? (
                  <a
                    href={nextGuide.slug}
                    className="inline-flex items-center px-4 py-2 rounded-soft bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                  >
                    {nextGuide.meta.title.split(":")[0]} →
                  </a>
                ) : (
                  <a
                    href="/hub"
                    className="inline-flex items-center px-4 py-2 rounded-soft bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                  >
                    Alle Guides →
                  </a>
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

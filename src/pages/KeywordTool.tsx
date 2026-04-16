import { useState } from "react";
import { Search, Sparkles, Youtube, Linkedin, Globe, Loader2, Copy, CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

type KeywordItem = {
  keyword: string;
  type: "short-tail" | "long-tail";
  searchIntent: "informational" | "transactional" | "navigational";
};

type Platform = {
  name: "YouTube" | "TikTok" | "Google" | "LinkedIn";
  keywords: KeywordItem[];
};

type Result = {
  platforms: Platform[];
};

const platformConfig: Record<string, { icon: React.ReactNode; color: string; bg: string; border: string }> = {
  YouTube: {
    icon: <Youtube className="w-5 h-5" />,
    color: "text-red-600",
    bg: "bg-red-50",
    border: "border-red-200",
  },
  TikTok: {
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.73a8.19 8.19 0 004.76 1.52V6.8a4.84 4.84 0 01-1-.11z" />
      </svg>
    ),
    color: "text-cyan-600",
    bg: "bg-cyan-50",
    border: "border-cyan-200",
  },
  Google: {
    icon: <Globe className="w-5 h-5" />,
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
  },
  LinkedIn: {
    icon: <Linkedin className="w-5 h-5" />,
    color: "text-sky-700",
    bg: "bg-sky-50",
    border: "border-sky-200",
  },
};

const intentColors: Record<string, string> = {
  informational: "bg-emerald-100 text-emerald-700",
  transactional: "bg-amber-100 text-amber-700",
  navigational: "bg-violet-100 text-violet-700",
};

const KeywordTool = () => {
  const [topic, setTopic] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim() || loading) return;

    setLoading(true);
    setResult(null);

    try {
      const { data, error } = await supabase.functions.invoke("keyword-suggest", {
        body: { topic: topic.trim() },
      });

      if (error) throw error;
      setResult(data as Result);
    } catch (err: any) {
      toast({
        title: "Fehler",
        description: err?.message || "Keyword-Vorschläge konnten nicht generiert werden.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const copyKeywords = (platformName: string, keywords: KeywordItem[]) => {
    const text = keywords.map((k) => k.keyword).join("\n");
    navigator.clipboard.writeText(text);
    setCopied(platformName);
    setTimeout(() => setCopied(null), 2000);
    toast({ title: `${platformName} Keywords kopiert!` });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[hsl(var(--brand-secondary)/0.08)] via-background to-[hsl(var(--brand-primary)/0.06)] py-16 md:py-24">
        <div className="container max-w-3xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-card rounded-full px-4 py-1.5 text-sm font-medium text-muted-foreground mb-6 border">
            <Sparkles className="w-4 h-4 text-amber-500" />
            AI-powered Keyword Recherche
          </div>
          <h1 className="font-outfit text-3xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
            Social SEO<br />Keyword-Generator
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-10">
            Gib ein Thema ein und erhalte sofort plattformspezifische Keyword-Vorschläge für YouTube, TikTok, Google und LinkedIn.
          </p>

          {/* Search Input */}
          <form onSubmit={handleSubmit} className="relative max-w-xl mx-auto">
            <div className="flex items-center bg-card rounded-xl border shadow-lg overflow-hidden focus-within:ring-2 focus-within:ring-primary/30 transition-shadow">
              <Search className="w-5 h-5 text-muted-foreground ml-4 shrink-0" />
              <Input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder='z.B. "Reels Strategie für Restaurants"'
                className="border-0 shadow-none focus-visible:ring-0 text-base py-6 bg-transparent"
                disabled={loading}
              />
              <Button
                type="submit"
                disabled={loading || !topic.trim()}
                className="m-1.5 rounded-lg shrink-0"
                variant="gradient"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Analysieren"}
              </Button>
            </div>
          </form>
        </div>
      </section>

      {/* Results */}
      {loading && (
        <div className="container max-w-4xl mx-auto px-4 py-16 text-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">AI analysiert Keywords für "{topic}"...</p>
        </div>
      )}

      {result && (
        <section className="container max-w-5xl mx-auto px-4 py-12">
          <h2 className="font-outfit text-xl font-semibold text-foreground mb-6">
            Ergebnisse für: <span className="text-primary">"{topic}"</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {result.platforms.map((platform) => {
              const config = platformConfig[platform.name];
              if (!config) return null;

              return (
                <div
                  key={platform.name}
                  className={`bg-card rounded-xl border ${config.border} p-5 hover:shadow-md transition-shadow`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className={`${config.bg} ${config.color} p-2 rounded-lg`}>
                        {config.icon}
                      </div>
                      <span className="font-outfit font-semibold text-foreground">{platform.name}</span>
                    </div>
                    <button
                      onClick={() => copyKeywords(platform.name, platform.keywords)}
                      className="text-muted-foreground hover:text-foreground transition-colors p-1.5 rounded-md hover:bg-muted"
                      title="Keywords kopieren"
                    >
                      {copied === platform.name ? (
                        <CheckCheck className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  <ul className="space-y-2.5">
                    {platform.keywords.map((kw, i) => (
                      <li key={i} className="flex items-center justify-between gap-2">
                        <span className="text-sm text-foreground truncate">{kw.keyword}</span>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                            {kw.type === "long-tail" ? "long" : "short"}
                          </Badge>
                          <Badge className={`text-[10px] px-1.5 py-0 border-0 ${intentColors[kw.searchIntent] || ""}`}>
                            {kw.searchIntent.slice(0, 5)}
                          </Badge>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <p className="text-xs text-muted-foreground text-center mt-8">
            Ergebnisse werden durch KI generiert und dienen als Inspiration. Validiere Keywords immer mit echten Suchdaten.
          </p>
        </section>
      )}

      {/* Empty state */}
      {!result && !loading && (
        <section className="container max-w-3xl mx-auto px-4 py-16 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["YouTube", "TikTok", "Google", "LinkedIn"].map((name) => {
              const config = platformConfig[name];
              return (
                <div key={name} className={`${config.bg} rounded-xl p-6 flex flex-col items-center gap-3 border ${config.border}`}>
                  <div className={config.color}>{config.icon}</div>
                  <span className="text-sm font-medium text-foreground">{name}</span>
                </div>
              );
            })}
          </div>
          <p className="text-muted-foreground text-sm mt-6">
            Gib oben ein Thema ein, um plattformspezifische Keywords zu erhalten.
          </p>
        </section>
      )}
    </div>
  );
};

export default KeywordTool;

import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

interface GuideCardProps {
  slug: string;
  title: string;
  text: string;
}

export function GuideCard({ slug, title, text }: GuideCardProps) {
  return (
    <Card className="group hover:shadow-float transition-all duration-300 border-0 bg-card/50 backdrop-blur-sm hover:scale-[1.02]">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <h3 className="font-headline text-xl font-semibold text-secondary group-hover:text-primary transition-colors">
            {title}
          </h3>
          <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
        </div>
        <p className="text-muted-foreground leading-relaxed">
          {text}
        </p>
        <div className="mt-6">
          <a 
            href={`/hub/${slug}`}
            className="inline-flex items-center text-sm font-medium text-secondary hover:text-primary transition-colors"
          >
            Guide lesen
            <ArrowRight className="w-4 h-4 ml-1" />
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
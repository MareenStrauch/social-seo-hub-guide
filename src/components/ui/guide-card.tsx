import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface GuideCardProps {
  slug: string;
  title: string;
  text: string;
  icon: LucideIcon;
  iconBgColor?: string;
}

export function GuideCard({ slug, title, text, icon: Icon, iconBgColor = "bg-primary/10" }: GuideCardProps) {
  return (
    <a href={`/hub/${slug}`}>
      <Card className="group hover:shadow-float transition-all duration-300 border border-border/50 bg-card backdrop-blur-sm hover:scale-[1.02] shadow-sm h-full">
        <CardContent className="p-8 text-center">
          <div className="flex justify-center mb-6">
            <div className={`${iconBgColor} rounded-full p-6 group-hover:scale-110 transition-transform`}>
              <Icon className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h3 className="font-headline text-2xl font-bold text-secondary mb-4 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            {text}
          </p>
        </CardContent>
      </Card>
    </a>
  );
}

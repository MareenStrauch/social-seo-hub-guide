import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface GuideCardProps {
  slug?: string;
  title: string;
  text: string;
  icon: LucideIcon;
  iconBgColor?: string;
}

export function GuideCard({ slug, title, text, icon: Icon, iconBgColor = "bg-primary/10" }: GuideCardProps) {
  const content = (
    <Card className="group relative overflow-hidden hover:shadow-glow transition-all duration-500 border border-border/40 bg-card/80 backdrop-blur-md hover:scale-[1.03] hover:-translate-y-1 shadow-float h-full rounded-xl">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <CardContent className="relative p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className={`${iconBgColor} rounded-2xl p-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-sm`}>
            <Icon className="w-8 h-8 text-primary" />
          </div>
        </div>
        <h3 className="font-headline text-2xl font-bold text-secondary mb-3 group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>
        <p className="text-muted-foreground leading-relaxed text-[0.95rem]">
          {text}
        </p>
      </CardContent>
    </Card>
  );

  if (slug) {
    return <Link to={slug} className="block h-full">{content}</Link>;
  }

  return content;
}

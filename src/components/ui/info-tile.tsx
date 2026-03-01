
import { LucideIcon } from "lucide-react";

interface InfoTileProps {
  title: string;
  text: string;
  icon: LucideIcon;
}

export function InfoTile({ title, text, icon: Icon }: InfoTileProps) {
  return (
    <div className="group relative overflow-hidden p-7 rounded-2xl bg-card/70 backdrop-blur-md shadow-float hover:shadow-glow transition-all duration-500 border border-border/30 hover:border-secondary/20 hover:-translate-y-1">
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative flex items-start gap-5">
        <div className="p-3 rounded-xl gradient-primary flex-shrink-0 shadow-sm group-hover:scale-110 transition-transform duration-500">
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-headline text-lg font-bold text-secondary mb-2 group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>
          <p className="text-muted-foreground leading-relaxed text-sm">
            {text}
          </p>
        </div>
      </div>
    </div>
  );
}


import { LucideIcon } from "lucide-react";

interface InfoTileProps {
  title: string;
  text: string;
  icon: LucideIcon;
}

export function InfoTile({ title, text, icon: Icon }: InfoTileProps) {
  return (
    <div className="group p-6 rounded-soft bg-background/80 backdrop-blur-sm shadow-float hover:shadow-lg transition-all duration-300 border border-border/50 hover:border-primary/20">
      <div className="flex items-start gap-4">
        <div className="p-2 rounded-lg gradient-primary flex-shrink-0">
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-headline text-lg font-semibold text-secondary mb-2 group-hover:text-primary transition-colors">
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

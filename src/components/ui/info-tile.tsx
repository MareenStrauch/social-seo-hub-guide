
import { LucideIcon } from "lucide-react";

interface InfoTileProps {
  title: string;
  text: string;
  icon: LucideIcon;
  stat?: string;
  statLabel?: string;
}

export function InfoTile({ title, text, icon: Icon, stat, statLabel }: InfoTileProps) {
  return (
    <div className="group p-6 rounded-soft bg-card backdrop-blur-sm shadow-float hover:shadow-lg transition-all duration-300 border border-border/50 hover:border-primary/20">
      <div className="flex items-start gap-4">
        <div className="p-2 rounded-lg gradient-primary flex-shrink-0">
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-headline text-lg font-semibold text-secondary mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          {stat && (
            <div className="mb-2">
              <span className="font-numbers text-3xl font-bold text-primary">{stat}</span>
              {statLabel && <span className="text-xs text-muted-foreground ml-1">{statLabel}</span>}
            </div>
          )}
          <p className="text-muted-foreground leading-relaxed text-sm">
            {text}
          </p>
        </div>
      </div>
    </div>
  );
}

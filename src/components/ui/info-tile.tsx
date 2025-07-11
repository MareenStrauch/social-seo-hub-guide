
interface InfoTileProps {
  title: string;
  text: string;
}

export function InfoTile({ title, text }: InfoTileProps) {
  return (
    <div className="p-6 rounded-soft bg-background/80 backdrop-blur-sm shadow-float hover:shadow-lg transition-all duration-300 border border-border/50">
      <h3 className="font-headline text-lg font-semibold text-secondary mb-3">
        {title}
      </h3>
      <p className="text-muted-foreground leading-relaxed">
        {text}
      </p>
    </div>
  );
}

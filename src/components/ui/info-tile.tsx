
interface InfoTileProps {
  title: string;
  text: string;
}

export function InfoTile({ title, text }: InfoTileProps) {
  return (
    <div className="p-6 rounded-lg bg-gradient-to-br from-card to-muted/20 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 border border-border hover:border-secondary/50">
      <h3 className="font-headline text-lg font-semibold text-foreground mb-3">
        {title}
      </h3>
      <p className="text-muted-foreground leading-relaxed">
        {text}
      </p>
    </div>
  );
}

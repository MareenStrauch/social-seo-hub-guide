interface InfoTileProps {
  title: string;
  text: string;
}

export function InfoTile({ title, text }: InfoTileProps) {
  return (
    <div className="p-6 rounded-soft bg-background shadow-float hover:shadow-lg transition-all duration-300">
      <h3 className="font-headline text-lg font-semibold text-secondary mb-3">
        {title}
      </h3>
      <p className="text-muted-foreground leading-relaxed">
        {text}
      </p>
    </div>
  );
}
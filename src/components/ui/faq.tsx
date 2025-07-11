import { AccordionContent, AccordionItem, AccordionTrigger } from "./accordion";

interface FAQProps {
  q: string;
  a: string;
}

export function FAQ({ q, a }: FAQProps) {
  return (
    <AccordionItem value={q} className="border-border">
      <AccordionTrigger className="text-left font-medium text-foreground hover:text-secondary transition-colors">
        {q}
      </AccordionTrigger>
      <AccordionContent className="text-muted-foreground leading-relaxed">
        {a}
      </AccordionContent>
    </AccordionItem>
  );
}
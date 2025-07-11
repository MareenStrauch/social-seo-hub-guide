"use client";

import { Download } from "lucide-react";
import { Button } from "./button";

interface CTARibbonProps {
  text: string;
  href: string;
}

export function CTARibbon({ text, href }: CTARibbonProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background border-t border-border shadow-lg">
      <div className="p-4">
        <Button asChild variant="gradient" className="w-full font-semibold rounded-soft shadow-float">
          <a href={href} className="flex items-center justify-center gap-2">
            <Download className="w-4 h-4" />
            {text}
          </a>
        </Button>
      </div>
    </div>
  );
}
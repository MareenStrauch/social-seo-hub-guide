import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <a href="/" className="flex items-center gap-2">
              <img src="/lovable-uploads/8c51aaad-523b-424a-b6bf-8fa8f23fdb37.png" alt="MareenSocialUp" className="h-8 w-auto" />
              <span className="font-headline text-xl font-bold text-secondary">MareenSocialUp</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              <a href="/hub" className="text-foreground hover:text-secondary transition-colors">Guides</a>
              <a href="/hub/videos" className="text-foreground hover:text-secondary transition-colors">Videos</a>
              <Button asChild variant="gradient" className="rounded-soft">
                <a href="/dl/social-seo-checkliste.pdf">Gratis Checkliste</a>
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-background border-t border-border">
              <a href="/hub" className="block px-3 py-2 text-foreground hover:text-secondary">Guides</a>
              <a href="/hub/videos" className="block px-3 py-2 text-foreground hover:text-secondary">Videos</a>
              <div className="px-3 py-2">
                <Button asChild variant="gradient" className="w-full rounded-soft">
                  <a href="/dl/social-seo-checkliste.pdf">Gratis Checkliste</a>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
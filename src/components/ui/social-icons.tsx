import { Youtube, Instagram, Linkedin } from "lucide-react";

export function SocialIcons() {
  return (
    <div className="flex gap-4 mt-4">
      <a 
        href="https://youtube.com/@mareensocialup" 
        className="p-2 rounded-full bg-secondary/10 hover:bg-secondary/20 text-secondary hover:text-primary transition-all"
        aria-label="YouTube"
      >
        <Youtube className="w-5 h-5" />
      </a>
      <a 
        href="https://instagram.com/mareensocialup" 
        className="p-2 rounded-full bg-secondary/10 hover:bg-secondary/20 text-secondary hover:text-primary transition-all"
        aria-label="Instagram"
      >
        <Instagram className="w-5 h-5" />
      </a>
      <a 
        href="https://linkedin.com/in/mareen" 
        className="p-2 rounded-full bg-secondary/10 hover:bg-secondary/20 text-secondary hover:text-primary transition-all"
        aria-label="LinkedIn"
      >
        <Linkedin className="w-5 h-5" />
      </a>
    </div>
  );
}
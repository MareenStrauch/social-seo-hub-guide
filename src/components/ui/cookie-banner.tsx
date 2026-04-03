import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const GA_MEASUREMENT_ID = "G-5HB3L36YFZ";

function loadGoogleAnalytics() {
  if (document.querySelector(`script[src*="googletagmanager.com/gtag"]`)) return;

  const script = document.createElement("script");
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  script.async = true;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  }
  gtag("js", new Date());
  gtag("config", GA_MEASUREMENT_ID, { anonymize_ip: true });
}

declare global {
  interface Window {
    dataLayer: unknown[];
  }
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (consent === "accepted") {
      loadGoogleAnalytics();
    } else if (consent === null) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
    loadGoogleAnalytics();
  };

  const decline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 p-4 sm:p-6">
      <div className="max-w-2xl mx-auto bg-card border border-border rounded-2xl shadow-float p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="text-sm text-muted-foreground flex-1">
          Wir nutzen Cookies zur Analyse unserer Website. Mehr dazu in unserer{" "}
          <a href="/datenschutz" className="underline text-primary hover:text-primary/80">
            Datenschutzerklärung
          </a>.
        </p>
        <div className="flex gap-3 shrink-0">
          <Button variant="outline" size="sm" onClick={decline}>
            Ablehnen
          </Button>
          <Button variant="gradient" size="sm" onClick={accept}>
            Akzeptieren
          </Button>
        </div>
      </div>
    </div>
  );
}

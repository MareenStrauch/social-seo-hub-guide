import { Navigation } from "@/components/layout/navigation";

const Datenschutz = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <section className="py-16 px-4 sm:px-6 lg:px-8 pt-24">
        <div className="max-w-3xl mx-auto prose prose-lg">
          <h1 className="text-3xl font-headline font-bold text-secondary mb-8">Datenschutzerklärung</h1>
          
          <div className="bg-card p-6 rounded-soft shadow-float space-y-6">
            <h2 className="text-xl font-semibold text-secondary">1. Datenschutz auf einen Blick</h2>
            <p className="text-muted-foreground">
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, 
              wenn Sie unsere Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
            </p>
            
            <h2 className="text-xl font-semibold text-secondary">2. YouTube-Einbettungen</h2>
            <p className="text-muted-foreground">
              Auf dieser Website sind Videos des Videoportals YouTube eingebettet. Betreiber der Seiten ist die Google Ireland Limited („Google"), 
              Gordon House, Barrow Street, Dublin 4, Irland. Wenn Sie eine unserer Webseiten besuchen, auf denen YouTube eingebunden ist, 
              wird eine Verbindung zu den Servern von YouTube hergestellt.
            </p>
            
            <h2 className="text-xl font-semibold text-secondary">3. Kontakt</h2>
            <p className="text-muted-foreground">
              Bei Fragen zum Datenschutz können Sie sich jederzeit an uns wenden: hallo@mareensocialup.de
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Datenschutz;
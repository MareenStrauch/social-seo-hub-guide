import { Navigation } from "@/components/layout/navigation";

const Impressum = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <section className="py-16 px-4 sm:px-6 lg:px-8 pt-24">
        <div className="max-w-3xl mx-auto prose prose-lg">
          <h1 className="text-3xl font-headline font-bold text-secondary mb-8">Impressum</h1>
          
          <div className="bg-card p-6 rounded-soft shadow-float">
            <p className="text-lg font-semibold text-foreground mb-4">
              <strong>Mareen Musterfrau</strong>
            </p>
            <address className="not-italic text-muted-foreground space-y-1">
              Musterstraße 1<br/>
              12345 Musterstadt<br/>
              Telefon: +49 30 123456<br/>
              E-Mail: hallo@mareensocialup.de
            </address>
            
            <div className="mt-6 space-y-2 text-muted-foreground">
              <p><strong>USt-ID:</strong> DE123456789</p>
              <p><strong>Verantwortlich für den Inhalt:</strong> Mareen Musterfrau</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Impressum;
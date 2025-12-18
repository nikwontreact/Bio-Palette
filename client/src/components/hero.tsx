import { ChevronDown, FileText, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  const scrollToAbout = () => {
    const element = document.querySelector("#about");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      data-testid="section-hero"
    >
      <div
        className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/10"
        aria-hidden="true"
      />
      
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-accent/30 rounded-full blur-3xl"
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center py-20">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            Open to Research Opportunities
          </div>

          <h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight"
            data-testid="text-hero-title"
          >
            <span className="block">Advancing</span>
            <span className="block text-primary">Biotechnology</span>
            <span className="block">Innovation</span>
          </h1>

          <p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            data-testid="text-hero-subtitle"
          >
            Biotechnology graduate student passionate about molecular biology,
            genetic engineering, and developing sustainable solutions for
            healthcare and agriculture.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Button size="lg" onClick={scrollToContact} data-testid="button-get-in-touch">
              <Mail className="h-4 w-4 mr-2" />
              Get in Touch
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-background/50 backdrop-blur-sm"
              data-testid="button-view-cv"
            >
              <FileText className="h-4 w-4 mr-2" />
              View CV
            </Button>
          </div>
        </div>
      </div>

      <button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground animate-bounce"
        aria-label="Scroll to about section"
        data-testid="button-scroll-down"
      >
        <ChevronDown className="h-8 w-8" />
      </button>
    </section>
  );
}

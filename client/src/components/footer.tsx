import { FlaskConical, Heart } from "lucide-react";
import { SiLinkedin, SiGithub, SiResearchgate } from "react-icons/si";

const footerLinks = [
  {
    title: "Navigation",
    links: [
      { label: "About", href: "#about" },
      { label: "Projects", href: "#projects" },
      { label: "Skills", href: "#skills" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    title: "Research",
    links: [
      { label: "Publications", href: "#" },
      { label: "Presentations", href: "#" },
      { label: "Collaborations", href: "#" },
      { label: "Lab Resources", href: "#" },
    ],
  },
];

const socialLinks = [
  { name: "LinkedIn", icon: SiLinkedin, href: "#" },
  { name: "GitHub", icon: SiGithub, href: "#" },
  { name: "ResearchGate", icon: SiResearchgate, href: "#" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (href: string) => {
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <footer
      className="border-t border-border bg-muted/30"
      data-testid="footer"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="sm:col-span-2 lg:col-span-1 space-y-4">
            <a
              href="#"
              className="flex items-center gap-2"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              data-testid="link-footer-logo"
            >
              <FlaskConical className="h-6 w-6 text-primary" />
              <span className="font-semibold text-lg">Alex Chen</span>
            </a>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Biotechnology researcher passionate about advancing science for a
              better tomorrow.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="p-2 rounded-md bg-muted text-muted-foreground hover-elevate"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  data-testid={`link-footer-social-${social.name.toLowerCase()}`}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title} className="space-y-4">
              <h4 className="font-semibold text-sm">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        if (link.href.startsWith("#")) {
                          e.preventDefault();
                          handleNavClick(link.href);
                        }
                      }}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      data-testid={`link-footer-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="space-y-4">
            <h4 className="font-semibold text-sm">Newsletter</h4>
            <p className="text-sm text-muted-foreground">
              Stay updated on my latest research and publications.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex gap-2"
            >
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 min-w-0 px-3 py-2 text-sm rounded-md border border-input bg-background"
                data-testid="input-newsletter"
              />
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground"
                data-testid="button-newsletter-subscribe"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} Alex Chen. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Made with <Heart className="h-3 w-3 text-destructive" /> for science
          </p>
        </div>
      </div>
    </footer>
  );
}

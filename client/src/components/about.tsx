import { GraduationCap, MapPin, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const education = [
  {
    degree: "M.S. in Biotechnology",
    institution: "Stanford University",
    year: "2023 - Present",
    focus: "Molecular Biology & Genetic Engineering",
  },
  {
    degree: "B.S. in Biochemistry",
    institution: "UC Berkeley",
    year: "2019 - 2023",
    focus: "Summa Cum Laude, Dean's List",
  },
];

const highlights = [
  "Published 3 peer-reviewed papers",
  "NIH Research Fellowship",
  "GPA: 3.92/4.0",
  "Teaching Assistant",
];

export function About() {
  return (
    <section
      id="about"
      className="py-20 md:py-24 bg-muted/30"
      data-testid="section-about"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-4xl font-semibold mb-4"
            data-testid="text-about-title"
          >
            About Me
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Dedicated to pushing the boundaries of biotechnology research
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <div className="relative">
              <div className="w-full aspect-[4/5] max-w-md mx-auto lg:mx-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-4 p-8">
                    <div className="w-32 h-32 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
                      <span className="text-5xl font-bold text-primary">AC</span>
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium text-lg">Alex Chen</p>
                      <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                        <MapPin className="h-3 w-3" />
                        Stanford, CA
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-lg leading-relaxed" data-testid="text-about-bio">
                I'm a graduate researcher at Stanford University specializing in
                CRISPR gene editing and synthetic biology. My work focuses on
                developing novel therapeutic approaches for genetic disorders
                and creating sustainable biotech solutions.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                With a strong foundation in molecular biology and hands-on
                experience in cutting-edge laboratory techniques, I'm passionate
                about translating scientific discoveries into real-world
                applications that improve human health and environmental
                sustainability.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {highlights.map((highlight) => (
                <Badge
                  key={highlight}
                  variant="secondary"
                  className="px-3 py-1"
                  data-testid={`badge-highlight-${highlight.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {highlight}
                </Badge>
              ))}
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-medium flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-primary" />
                Education
              </h3>
              <div className="space-y-4">
                {education.map((edu) => (
                  <Card key={edu.degree} data-testid={`card-education-${edu.degree.toLowerCase().replace(/\s+/g, "-")}`}>
                    <CardContent className="p-4">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <h4 className="font-medium">{edu.degree}</h4>
                          <p className="text-muted-foreground text-sm">
                            {edu.institution}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {edu.focus}
                          </p>
                        </div>
                        <Badge variant="outline" className="text-xs flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {edu.year}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

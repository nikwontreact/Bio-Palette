import {
  Microscope,
  Dna,
  FlaskConical,
  TestTube,
  Beaker,
  Activity,
  BarChart3,
  Database,
  Code,
  FileSpreadsheet,
  Brain,
  Atom,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const skillCategories = [
  {
    title: "Laboratory Techniques",
    icon: Microscope,
    skills: [
      { name: "CRISPR/Cas9 Gene Editing", icon: Dna },
      { name: "PCR & qPCR", icon: FlaskConical },
      { name: "Cell Culture", icon: TestTube },
      { name: "Western Blotting", icon: Activity },
      { name: "Flow Cytometry", icon: Beaker },
      { name: "Protein Purification", icon: Atom },
    ],
  },
  {
    title: "Computational Skills",
    icon: Code,
    skills: [
      { name: "Python", icon: Code },
      { name: "R/Bioconductor", icon: BarChart3 },
      { name: "BLAST/NCBI Tools", icon: Database },
      { name: "GraphPad Prism", icon: FileSpreadsheet },
      { name: "PyMOL", icon: Brain },
      { name: "ImageJ/FIJI", icon: Microscope },
    ],
  },
];

const researchAreas = [
  "Molecular Biology",
  "Genetic Engineering",
  "Synthetic Biology",
  "Immunology",
  "Bioinformatics",
  "Drug Discovery",
  "Vaccine Development",
  "Metabolic Engineering",
];

export function Skills() {
  return (
    <section
      id="skills"
      className="py-20 md:py-24 bg-muted/30"
      data-testid="section-skills"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-4xl font-semibold mb-4"
            data-testid="text-skills-title"
          >
            Skills & Expertise
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Comprehensive expertise across laboratory and computational disciplines
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-12">
          {skillCategories.map((category) => (
            <Card key={category.title} data-testid={`card-skills-${category.title.toLowerCase().replace(/\s+/g, "-")}`}>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 rounded-md bg-primary/10">
                    <category.icon className="h-5 w-5 text-primary" />
                  </div>
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="flex items-center gap-2 p-2 rounded-md bg-muted/50"
                      data-testid={`skill-${skill.name.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      <skill.icon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <span className="text-sm">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card data-testid="card-research-areas">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="p-2 rounded-md bg-primary/10">
                <Brain className="h-5 w-5 text-primary" />
              </div>
              Research Areas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {researchAreas.map((area) => (
                <Badge
                  key={area}
                  variant="outline"
                  className="px-4 py-2 text-sm border-primary/30 bg-primary/5"
                  data-testid={`badge-research-${area.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {area}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

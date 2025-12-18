import { ExternalLink, Github, Microscope, Dna, Leaf, FlaskConical } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const projects = [
  {
    id: 1,
    title: "CRISPR-Based Gene Therapy",
    description:
      "Developed a novel CRISPR-Cas9 delivery system for treating inherited retinal diseases, achieving 85% editing efficiency in preclinical models.",
    icon: Dna,
    tags: ["CRISPR", "Gene Therapy", "Molecular Biology"],
    status: "Published",
    link: "#",
  },
  {
    id: 2,
    title: "Synthetic Biology for Biofuels",
    description:
      "Engineered E. coli strains for enhanced production of sustainable biofuels, resulting in a 3x increase in yield compared to wild-type strains.",
    icon: Leaf,
    tags: ["Synthetic Biology", "Metabolic Engineering", "Sustainability"],
    status: "In Progress",
    link: "#",
  },
  {
    id: 3,
    title: "Protein Structure Prediction",
    description:
      "Applied machine learning algorithms to predict protein folding patterns, contributing to a collaborative database of structural predictions.",
    icon: Microscope,
    tags: ["Bioinformatics", "Machine Learning", "Computational Biology"],
    status: "Completed",
    link: "#",
  },
  {
    id: 4,
    title: "mRNA Vaccine Optimization",
    description:
      "Optimized mRNA sequences for improved stability and translation efficiency in vaccine development, enhancing immune response duration.",
    icon: FlaskConical,
    tags: ["Vaccine Development", "RNA Biology", "Immunology"],
    status: "Published",
    link: "#",
  },
];

const statusColors: Record<string, string> = {
  Published: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
  "In Progress": "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20",
  Completed: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
};

export function Projects() {
  return (
    <section
      id="projects"
      className="py-20 md:py-24"
      data-testid="section-projects"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-4xl font-semibold mb-4"
            data-testid="text-projects-title"
          >
            Research Projects
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Exploring the frontiers of biotechnology through innovative research
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="group overflow-visible hover-elevate"
              data-testid={`card-project-${project.id}`}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-md bg-primary/10">
                      <project.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{project.title}</h3>
                      <Badge
                        variant="outline"
                        className={`text-xs mt-1 ${statusColors[project.status]}`}
                      >
                        {project.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-1 invisible group-hover:visible">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      data-testid={`button-project-link-${project.id}`}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      data-testid={`button-project-github-${project.id}`}
                    >
                      <Github className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-xs"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button variant="outline" data-testid="button-view-all-projects">
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
}

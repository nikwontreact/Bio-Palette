'use client';

import { ExternalLink, Github, Code2, Database, Globe, Server, Layers } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const iconMap = {
  Code2,
  Database,
  Globe,
  Server,
  Layers,
};

const statusColors = {
  Published: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20',
  'In Progress': 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20',
  Completed: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
  Planning: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: {
      duration: 0.2,
    },
  },
};

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [projects, setProjects] = useState([]);
  const [hoveredProject, setHoveredProject] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects');
      const data = await res.json();
      if (data.projects) {
        setProjects(data.projects);
      }
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    }
  };

  return (
    <section
      id="projects"
      className="py-20 md:py-24 bg-muted/30"
      ref={ref}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Featured <span className="text-primary">Projects</span>
          </h2>
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: 80 } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-1 bg-primary mx-auto mb-4 rounded-full"
          />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Building scalable web applications with modern technologies
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {projects.map((project) => {
              const IconComponent = iconMap[project.icon] || Code2;
              return (
                <motion.div 
                  key={project._id} 
                  variants={cardVariants}
                  layout
                  onHoverStart={() => setHoveredProject(project._id)}
                  onHoverEnd={() => setHoveredProject(null)}
                >
                  <Card className="group overflow-hidden hover-elevate hover:border-primary/50 transition-all h-full relative">
                    {/* Hover Gradient Overlay */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                      initial={false}
                      animate={{ opacity: hoveredProject === project._id ? 1 : 0 }}
                    />

                    <CardHeader className="pb-4 relative z-10">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3 flex-1">
                          <motion.div 
                            className="p-2 rounded-md bg-primary/10 group-hover:bg-primary/20 transition-colors"
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.5 }}
                          >
                            <IconComponent className="h-5 w-5 text-primary" />
                          </motion.div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg group-hover:text-primary transition-colors line-clamp-1">
                              {project.title}
                            </h3>
                            <Badge
                              variant="outline"
                              className={`text-xs mt-1 ${statusColors[project.status] || 'bg-gray-500/10 text-gray-600 border-gray-500/20'}`}
                            >
                              {project.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          {project.liveUrl && (
                            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 hover:text-primary hover:bg-primary/10"
                                asChild
                              >
                                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="h-4 w-4" />
                                </a>
                              </Button>
                            </motion.div>
                          )}
                          {project.githubUrl && (
                            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 hover:text-primary hover:bg-primary/10"
                                asChild
                              >
                                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                  <Github className="h-4 w-4" />
                                </a>
                              </Button>
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0 relative z-10">
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
                        {project.shortDescription || project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies?.slice(0, 4).map((tag) => (
                          <motion.div
                            key={tag}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Badge
                              variant="secondary"
                              className="text-xs hover-elevate hover:border-primary/30 transition-colors"
                            >
                              {tag}
                            </Badge>
                          </motion.div>
                        ))}
                        {project.technologies?.length > 4 && (
                          <Badge variant="secondary" className="text-xs">
                            +{project.technologies.length - 4} more
                          </Badge>
                        )}
                      </div>
                    </CardContent>

                    {/* Bottom Accent Line */}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: hoveredProject === project._id ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ transformOrigin: 'left' }}
                    />
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

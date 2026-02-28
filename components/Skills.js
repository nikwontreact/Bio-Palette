'use client';

import {
  Code2,
  Database,
  Server,
  Terminal,
  GitBranch,
  Cloud,
  Wrench,
  Zap,
  Package,
  Settings,
  Brain,
  Globe,
  Layers,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const iconMap = {
  Code2,
  Database,
  Server,
  Terminal,
  GitBranch,
  Cloud,
  Wrench,
  Zap,
  Package,
  Settings,
  Brain,
  Globe,
  Layers,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
    },
  },
};

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.25,
    },
  },
};

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [skills, setSkills] = useState([]);
  const [expandedCategory, setExpandedCategory] = useState(null);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const res = await fetch('/api/skills');
      const data = await res.json();
      if (data.skills) {
        setSkills(data.skills);
      }
    } catch (error) {
      console.error('Failed to fetch skills:', error);
    }
  };

  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});

  const skillCategories = Object.keys(skillsByCategory).map(category => ({
    title: category,
    icon: Wrench,
    skills: skillsByCategory[category],
  }));

  // Proficiency levels with colors
  const proficiencyColors = {
    Expert: 'bg-green-500',
    Advanced: 'bg-blue-500',
    Intermediate: 'bg-yellow-500',
    Beginner: 'bg-orange-500',
  };

  const proficiencyPercentage = {
    Expert: 95,
    Advanced: 80,
    Intermediate: 60,
    Beginner: 40,
  };

  return (
    <section
      id="skills"
      className="py-20 md:py-24"
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
            Skills & <span className="text-primary">Expertise</span>
          </h2>
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: 80 } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-1 bg-primary mx-auto mb-4 rounded-full"
          />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Comprehensive expertise across modern web development technologies
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-6 mb-12"
        >
          {skillCategories.map((category, categoryIndex) => (
            <motion.div key={category.title} variants={cardVariants}>
              <Card className="hover-elevate group hover:border-primary/30 transition-all h-full overflow-hidden">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center justify-between text-xl">
                    <div className="flex items-center gap-3">
                      <motion.div 
                        className="p-2 rounded-md bg-primary/10 group-hover:bg-primary/20 transition-colors"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <category.icon className="h-5 w-5 text-primary" />
                      </motion.div>
                      {category.title}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {category.skills.length} skills
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => {
                      const SkillIcon = iconMap[skill.icon] || Wrench;
                      const proficiency = skill.proficiency || 'Intermediate';
                      const percentage = proficiencyPercentage[proficiency] || 60;
                      const color = proficiencyColors[proficiency] || 'bg-blue-500';

                      return (
                        <motion.div
                          key={skill._id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                          transition={{ delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
                          className="space-y-2"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <SkillIcon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                              <span className="text-sm font-medium">{skill.name}</span>
                            </div>
                            <span className="text-xs text-muted-foreground">{proficiency}</span>
                          </div>
                          <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                            <motion.div
                              className={`absolute inset-y-0 left-0 ${color} rounded-full`}
                              initial={{ width: 0 }}
                              animate={isInView ? { width: `${percentage}%` } : { width: 0 }}
                              transition={{ 
                                duration: 1, 
                                delay: categoryIndex * 0.1 + skillIndex * 0.05 + 0.2,
                                ease: "easeOut"
                              }}
                            />
                            <motion.div
                              className={`absolute inset-y-0 left-0 ${color} opacity-50`}
                              initial={{ width: 0 }}
                              animate={isInView ? { 
                                width: [`${percentage}%`, `${percentage + 5}%`, `${percentage}%`] 
                              } : { width: 0 }}
                              transition={{ 
                                duration: 2, 
                                delay: categoryIndex * 0.1 + skillIndex * 0.05 + 1,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                            />
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Specializations/Tags */}
        {skills.some(s => s.tags && s.tags.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="hover-elevate overflow-hidden relative">
              {/* Animated Background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{ backgroundSize: '200% 200%' }}
              />
              
              <CardHeader className="pb-4 relative z-10">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <motion.div 
                    className="p-2 rounded-md bg-primary/10"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <Brain className="h-5 w-5 text-primary" />
                  </motion.div>
                  Specializations & Technologies
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  className="flex flex-wrap gap-2"
                >
                  {[...new Set(skills.flatMap(s => s.tags || []))].map((tag, index) => (
                    <motion.div 
                      key={tag} 
                      variants={badgeVariants}
                      whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Badge
                        variant="outline"
                        className="px-4 py-2 text-sm border-primary/30 bg-background/50 backdrop-blur-sm hover-elevate hover:bg-primary/10 hover:border-primary/50 transition-all cursor-pointer"
                      >
                        {tag}
                      </Badge>
                    </motion.div>
                  ))}
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Skills Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: 'Total Skills', value: skills.length, icon: Zap },
            { label: 'Categories', value: skillCategories.length, icon: Layers },
            { label: 'Expert Level', value: skills.filter(s => s.proficiency === 'Expert').length, icon: Brain },
            { label: 'Technologies', value: [...new Set(skills.flatMap(s => s.tags || []))].length, icon: Package },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.7 + index * 0.1, type: 'spring' }}
            >
              <Card className="text-center hover-elevate hover:border-primary/30 transition-all">
                <CardContent className="pt-6">
                  <stat.icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

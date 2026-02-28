'use client';

import { GraduationCap, MapPin, Calendar, Award, Briefcase, Code, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
    },
  },
};

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [aboutData, setAboutData] = useState({
    bio: 'I\'m a Full Stack Developer passionate about creating efficient, maintainable, and scalable web solutions. With hands-on experience in React.js, JavaScript, Python, and modern frameworks, I focus on delivering business value through clean code, technical precision, and continuous improvement.\n\nI thrive in collaborative environments where I can contribute to cross-functional teams, optimize UI/UX experiences, and build high-performance applications. Currently expanding my expertise in Node.js, Express, MongoDB, and JWT-based authentication to strengthen my full-stack capabilities.',
    education: [],
    highlights: [],
  });
  const [settings, setSettings] = useState({
    siteName: 'Nikhil Sode',
    location: 'India',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [aboutRes, settingsRes] = await Promise.all([
        fetch('/api/about'),
        fetch('/api/settings'),
      ]);
      
      const aboutData = await aboutRes.json();
      const settingsData = await settingsRes.json();
      
      console.log('About data:', aboutData);
      console.log('Profile image URL:', aboutData.about?.profileImage);
      
      if (aboutData.about) {
        setAboutData(aboutData.about);
      }
      if (settingsData.settings) {
        setSettings(settingsData.settings);
      }
    } catch (error) {
      console.error('Failed to fetch about data:', error);
    }
  };

  const bioLines = aboutData.bio?.split('\n') || [];
  const education = aboutData.education || [];
  const highlights = aboutData.highlights || [];

  return (
    <section
      id="about"
      className="py-20 md:py-24 bg-muted/30 relative overflow-hidden"
      ref={ref}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-50">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-tl from-accent/5 via-transparent to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            About <span className="text-primary">Me</span>
          </h2>
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: 80 } : { width: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="h-1 bg-primary mx-auto mb-4 rounded-full"
          />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Passionate about creating exceptional web experiences
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Profile & Bio */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Profile Card */}
            <Card className="overflow-hidden hover-elevate border-primary/20">
              <div className="relative">
                <div className="w-full aspect-[4/3] bg-gradient-to-br from-primary/20 via-primary/10 to-accent/20 relative overflow-hidden">
                  {/* Profile Content */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-full">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={isInView ? { scale: 1 } : { scale: 0 }}
                        transition={{ duration: 0.4, delay: 0.3, type: "spring", stiffness: 200 }}
                        className="w-full h-full flex items-center justify-center overflow-hidden"
                      >
                        {aboutData.profileImage ? (
                          <img 
                            src={aboutData.profileImage} 
                            alt={settings.siteName || 'Profile'} 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextElementSibling.style.display = 'flex';
                            }}
                          />
                        ) : null}
                        <span 
                          className="text-8xl font-bold text-primary"
                          style={{ display: aboutData.profileImage ? 'none' : 'flex' }}
                        >
                          {settings.siteName?.split(' ').map(n => n[0]).join('').toUpperCase() || 'NS'}
                        </span>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Name and Location below image */}
              <div className="p-6 space-y-2 text-center">
                <motion.h3 
                  className="font-bold text-2xl"
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ delay: 0.4 }}
                >
                  {settings.siteName}
                </motion.h3>
                {settings.location && (
                  <motion.p 
                    className="text-sm text-muted-foreground flex items-center justify-center gap-1"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <MapPin className="h-4 w-4" />
                    {settings.location}
                  </motion.p>
                )}
              </div>
            </Card>

            {/* Bio */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              {bioLines.map((line, index) => (
                <motion.p 
                  key={index} 
                  className={index === 0 ? "text-lg leading-relaxed" : "text-muted-foreground leading-relaxed"}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  {line}
                </motion.p>
              ))}
            </motion.div>

            {/* Highlights */}
            {highlights.length > 0 && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="flex flex-wrap gap-2"
              >
                {highlights.map((highlight, index) => (
                  <motion.div key={`highlight-${index}`} variants={itemVariants}>
                    <Badge
                      variant="secondary"
                      className="px-3 py-1.5 hover-elevate border-primary/20 hover:border-primary/40 transition-colors hover:scale-105"
                    >
                      <Award className="h-3 w-3 mr-1 inline" />
                      {typeof highlight === 'string' ? highlight : highlight.text}
                    </Badge>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>

          {/* Right Column - Education Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="space-y-8"
          >
            {/* Education Section */}
            {education && education.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <motion.div
                    className="p-2 rounded-lg bg-primary/10"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <GraduationCap className="h-6 w-6 text-primary" />
                  </motion.div>
                  <div>
                    <h3 className="text-2xl font-semibold">Education</h3>
                    <p className="text-sm text-muted-foreground">Academic Journey</p>
                  </div>
                </div>

                {/* Timeline */}
                <div className="relative pl-8 space-y-6">
                  {/* Timeline Line */}
                  <motion.div
                    className="absolute left-[11px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent"
                    initial={{ height: 0 }}
                    animate={isInView ? { height: '100%' } : { height: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />

                  {education.map((edu, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="relative"
                    >
                      {/* Timeline Dot */}
                      <motion.div
                        className="absolute -left-8 top-2 w-6 h-6 rounded-full bg-primary border-4 border-background shadow-lg"
                        initial={{ scale: 0 }}
                        animate={isInView ? { scale: 1 } : { scale: 0 }}
                        transition={{ delay: 0.7 + index * 0.1, type: 'spring' }}
                      >
                        <motion.div
                          className="absolute inset-0 rounded-full bg-primary"
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 0, 0.5],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: index * 0.3,
                          }}
                        />
                      </motion.div>

                      <Card className="hover-elevate border-l-4 border-l-primary/50 hover:border-l-primary transition-all">
                        <CardContent className="p-4">
                          <div className="space-y-2">
                            <div className="flex items-start justify-between gap-2 flex-wrap">
                              <h4 className="font-semibold text-lg">{edu.degree}</h4>
                              {edu.year && (
                                <Badge variant="outline" className="text-xs flex items-center gap-1 shrink-0">
                                  <Calendar className="h-3 w-3" />
                                  {edu.year}
                                </Badge>
                              )}
                            </div>
                            <p className="text-muted-foreground text-sm flex items-center gap-1">
                              <Briefcase className="h-3 w-3" />
                              {edu.institution}
                            </p>
                            {edu.focus && (
                              <p className="text-xs text-muted-foreground flex items-center gap-1 pt-1">
                                <Code className="h-3 w-3" />
                                {edu.focus}
                              </p>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.8 }}
            >
              <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20 hover-elevate">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Sparkles className="h-5 w-5 text-primary" />
                    <h4 className="font-semibold">Quick Facts</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: 'Experience', value: '3+ Years' },
                      { label: 'Projects', value: '20+' },
                      { label: 'Technologies', value: '15+' },
                      { label: 'Certifications', value: education.length },
                    ].map((stat, i) => (
                      <motion.div
                        key={stat.label}
                        className="text-center p-3 rounded-lg bg-background/50 backdrop-blur-sm"
                        initial={{ scale: 0 }}
                        animate={isInView ? { scale: 1 } : { scale: 0 }}
                        transition={{ delay: 0.9 + i * 0.05, type: 'spring' }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="text-2xl font-bold text-primary">{stat.value}</div>
                        <div className="text-xs text-muted-foreground">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

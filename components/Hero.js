'use client';

import { ChevronDown, FileText, Mail, Download, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';

export function Hero() {
  const [heroData, setHeroData] = useState({
    title: 'Building Modern\nWeb Applications\nWith MERN Stack',
    subtitle: 'Available for Freelance Projects',
    description: 'Full-stack developer specializing in MongoDB, Express.js, React, and Node.js. Creating scalable, performant web applications with modern technologies and best practices.',
    ctaPrimary: { text: 'Get in Touch', href: '#contact' },
    ctaSecondary: { text: 'View Projects', href: '#projects' },
  });
  const [typedText, setTypedText] = useState('');
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    setIsMounted(true);
    fetchHeroData();
    
    // Delay content display by 2.5 seconds
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 2500);
    
    return () => clearTimeout(timer);
  }, []);

  const fetchHeroData = async () => {
    try {
      const res = await fetch('/api/hero');
      const data = await res.json();
      if (data.hero) {
        setHeroData(data.hero);
      }
    } catch (error) {
      console.error('Failed to fetch hero data:', error);
    }
  };

  // Typing animation effect
  useEffect(() => {
    if (!showContent) return; // Don't start typing until content is shown
    
    const titleLines = heroData.title?.split('\n') || ['Building Modern', 'Web Applications', 'With MERN Stack'];
    
    if (currentLineIndex >= titleLines.length) {
      setIsTypingComplete(true);
      return;
    }

    const currentLine = titleLines[currentLineIndex];
    let charIndex = 0;

    const typingInterval = setInterval(() => {
      if (charIndex <= currentLine.length) {
        setTypedText(prev => {
          const lines = prev.split('\n');
          lines[currentLineIndex] = currentLine.slice(0, charIndex);
          return lines.join('\n');
        });
        charIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          setCurrentLineIndex(prev => prev + 1);
        }, 200);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, [currentLineIndex, heroData.title, showContent]);

  const scrollToSection = (sectionId) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const titleLines = typedText.split('\n');

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/10" />
      
      {/* Floating Particles */}
      {isMounted && (
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => {
            const randomX = Math.random() * 100;
            const randomY = Math.random() * 100;
            const randomEndX = Math.random() * 100;
            const randomEndY = Math.random() * 100;
            
            return (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-primary/30 rounded-full"
                style={{
                  left: `${randomX}%`,
                  top: `${randomY}%`,
                }}
                animate={{
                  x: [`0%`, `${randomEndX - randomX}%`],
                  y: [`0%`, `${randomEndY - randomY}%`],
                }}
                transition={{
                  duration: Math.random() * 10 + 10,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            );
          })}
        </div>
      )}

      {/* Animated Blobs */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-accent/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.4, 0.3],
            x: [0, -30, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Content */}
      <motion.div 
        style={{ y, opacity }}
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center py-20"
      >
        {showContent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            {heroData.subtitle}
          </motion.div>

          {/* Main Heading with Typing Effect */}
          <div className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight min-h-[240px] md:min-h-[280px] lg:min-h-[320px]">
            {titleLines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                className={`block ${i === 1 ? 'text-primary' : ''}`}
              >
                {line}
                {!isTypingComplete && i === currentLineIndex && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="inline-block w-1 h-12 md:h-16 lg:h-20 bg-primary ml-1 align-middle"
                  />
                )}
              </motion.div>
            ))}
          </div>

          {/* Stats Counter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-wrap items-center justify-center gap-8 py-4"
          >
            {[
              { number: '3+', label: 'Years Experience' },
              { number: '20+', label: 'Projects Completed' },
              { number: '100%', label: 'Client Satisfaction' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1 + i * 0.1, type: 'spring' }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-primary">{stat.number}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            {heroData.description}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-4"
          >
            <Button 
              size="lg" 
              onClick={() => scrollToSection(heroData.ctaPrimary?.href || '#contact')}
              className="group relative overflow-hidden hover-elevate"
            >
              <span className="relative z-10 flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                {heroData.ctaPrimary?.text || 'Get in Touch'}
              </span>
              <motion.div
                className="absolute inset-0 bg-primary/20"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="group bg-background/50 backdrop-blur-sm hover-elevate border-primary/20 hover:border-primary/40"
              onClick={() => scrollToSection(heroData.ctaSecondary?.href || '#projects')}
            >
              <FileText className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform" />
              {heroData.ctaSecondary?.text || 'View Projects'}
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="group hover-elevate"
              onClick={() => window.open('/resume.pdf', '_blank')}
            >
              <Download className="h-4 w-4 mr-2 group-hover:translate-y-1 transition-transform" />
              Download Resume
            </Button>
          </motion.div>

          {/* Tech Stack Icons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            className="flex items-center justify-center gap-6 pt-8 flex-wrap"
          >
            <span className="text-sm text-muted-foreground flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Built with
            </span>
            {['MongoDB', 'Express', 'React', 'Node.js'].map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.7 + i * 0.1 }}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      )}
      </motion.div>

      {/* Scroll Indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          opacity: { delay: 2, duration: 0.5 },
          y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
        }}
        onClick={() => scrollToSection('#about')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors group"
        aria-label="Scroll to about section"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs font-medium">Scroll Down</span>
          <ChevronDown className="h-6 w-6 group-hover:translate-y-1 transition-transform" />
        </div>
      </motion.button>
    </section>
  );
}

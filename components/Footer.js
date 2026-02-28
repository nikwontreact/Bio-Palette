'use client';

import { Code2, Heart } from 'lucide-react';
import { SiLinkedin, SiGithub, SiX } from 'react-icons/si';
import { useState, useRef, useEffect } from 'react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';

const footerLinks = [
  {
    title: 'Navigation',
    links: [
      { label: 'About', href: '#about' },
      { label: 'Projects', href: '#projects' },
      { label: 'Skills', href: '#skills' },
      { label: 'Contact', href: '#contact' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Blog', href: '#' },
      { label: 'Portfolio', href: '#projects' },
      { label: 'Services', href: '#' },
      { label: 'Testimonials', href: '#' },
    ],
  },
];

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

export function Footer() {
  const currentYear = new Date().getFullYear();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [settings, setSettings] = useState({
    siteName: 'John Doe',
    socialLinks: {
      linkedin: '#',
      github: '#',
      twitter: '#',
    },
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings');
      const data = await res.json();
      if (data.settings) {
        setSettings(data.settings);
      }
    } catch (error) {
      console.error('Failed to fetch settings:', error);
    }
  };

  const socialLinks = [
    { name: 'LinkedIn', icon: SiLinkedin, href: settings.socialLinks?.linkedin || '#' },
    { name: 'GitHub', icon: SiGithub, href: settings.socialLinks?.github || '#' },
    { name: 'X (Twitter)', icon: SiX, href: settings.socialLinks?.twitter || '#' },
  ].filter(link => link.href && link.href !== '#');

  const handleNavClick = (href) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="border-t border-border bg-muted/30" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {/* Brand */}
          <motion.div variants={itemVariants} className="space-y-4">
            <a
              href="#"
              className="flex items-center gap-2 hover:text-primary transition-colors"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <Code2 className="h-6 w-6 text-primary" />
              <span className="font-semibold text-lg">{settings.siteName}</span>
            </a>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Full-stack developer crafting modern web applications with the MERN stack.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="p-2 rounded-md bg-muted text-muted-foreground hover-elevate hover:text-foreground transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Links */}
          {footerLinks.map((section) => (
            <motion.div key={section.title} variants={itemVariants} className="space-y-4">
              <h4 className="font-semibold text-sm">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        if (link.href.startsWith('#')) {
                          e.preventDefault();
                          handleNavClick(link.href);
                        }
                      }}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 pt-6 border-t border-border flex flex-wrap items-center justify-between gap-4"
        >
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} {settings.siteName}. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Made with <Heart className="h-3 w-3 text-destructive fill-destructive" /> and code
          </p>
        </motion.div>
      </div>
    </footer>
  );
}

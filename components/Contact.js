'use client';

import { Mail, MapPin, Clock, MessageSquare } from 'lucide-react';
import { SiLinkedin, SiGithub, SiX } from 'react-icons/si';
import { Card, CardContent } from '@/components/ui/card';
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [settings, setSettings] = useState({
    email: 'nikhilsdsde@gmail.com',
    phone: '8999491750',
    location: 'India',
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
    { name: 'LinkedIn', icon: SiLinkedin, href: settings.socialLinks?.linkedin || '#', color: 'hover:bg-[#0A66C2] hover:text-white' },
    { name: 'GitHub', icon: SiGithub, href: settings.socialLinks?.github || '#', color: 'hover:bg-gray-800 hover:text-white' },
    { name: 'X', icon: SiX, href: settings.socialLinks?.twitter || '#', color: 'hover:bg-black hover:text-white' },
  ].filter(link => link.href && link.href !== '#');

  const contactInfo = [
    { icon: Mail, label: 'Email', value: settings.email || 'nikhilsdsde@gmail.com', href: `mailto:${settings.email}` },
    { icon: MapPin, label: 'Location', value: settings.location || 'India' },
    { icon: Clock, label: 'Response Time', value: '~24 hours' },
  ];

  return (
    <section
      id="contact"
      className="py-20 md:py-24 relative overflow-hidden"
      ref={ref}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border border-primary/20 mb-4"
          >
            <MessageSquare className="h-8 w-8 text-primary" />
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Get In <span className="text-primary">Touch</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Feel free to reach out for collaborations or just a friendly chat
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Contact Information Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="border-primary/20 h-full">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-lg">Contact Info</h3>
                </div>
                <div className="space-y-3">
                  {contactInfo.map((info) => (
                    <motion.div
                      key={info.label}
                      className="flex items-start gap-3 group"
                      whileHover={{ x: 5 }}
                    >
                      <div className="p-2 rounded-md bg-primary/10 flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                        <info.icon className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-muted-foreground">{info.label}</p>
                        {info.href ? (
                          <a 
                            href={info.href}
                            className="font-medium text-sm hover:text-primary transition-colors"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="font-medium text-sm">{info.value}</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            {socialLinks.length > 0 && (
              <Card className="border-primary/20">
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-semibold text-lg">Connect</h3>
                  <div className="flex flex-col gap-2">
                    {socialLinks.map((social) => (
                      <motion.a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg border border-border ${social.color} transition-all`}
                        whileHover={{ scale: 1.02, x: 5 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <social.icon className="h-5 w-5" />
                        <span className="text-sm font-medium">{social.name}</span>
                      </motion.a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Availability Status */}
            <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <div className="relative mt-1">
                    <div className="h-3 w-3 bg-green-500 rounded-full" />
                    <motion.div
                      className="absolute inset-0 h-3 w-3 bg-green-500 rounded-full"
                      animate={{ scale: [1, 1.5, 1], opacity: [0.7, 0, 0.7] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-green-700 dark:text-green-400 mb-1">Available Now</p>
                    <p className="text-sm text-muted-foreground">
                      Open for freelance projects and opportunities
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

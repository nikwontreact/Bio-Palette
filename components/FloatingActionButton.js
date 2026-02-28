'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Mail, Phone, X, Github, Linkedin, FileDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState(null);

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

  const actions = [
    { icon: Mail, label: 'Email', href: `mailto:${settings?.email || 'nikhilsdsde@gmail.com'}`, color: 'bg-blue-500 hover:bg-blue-600' },
    { icon: Phone, label: 'Call', href: `tel:${settings?.phone || '8999491750'}`, color: 'bg-green-500 hover:bg-green-600' },
    { icon: Github, label: 'GitHub', href: settings?.socialLinks?.github || 'https://github.com/nikhilsode', color: 'bg-gray-700 hover:bg-gray-800' },
    { icon: Linkedin, label: 'LinkedIn', href: settings?.socialLinks?.linkedin || 'https://linkedin.com/in/nikhil-sode', color: 'bg-blue-600 hover:bg-blue-700' },
    ...(settings?.resumeUrl ? [{ icon: FileDown, label: 'Resume', href: settings.resumeUrl, color: 'bg-purple-500 hover:bg-purple-600' }] : []),
  ];

  const handleClick = () => {
    console.log('Button clicked, current state:', isOpen);
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute bottom-16 right-0 flex flex-col gap-3 mb-2"
          >
            {actions.map((action, index) => (
              <motion.a
                key={action.label}
                href={action.href}
                target={action.href.startsWith('http') ? '_blank' : undefined}
                rel={action.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, x: 20, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                exit={{ opacity: 0, x: 20, y: 20 }}
                transition={{ delay: index * 0.05 }}
                className={`flex items-center gap-3 px-4 py-3 rounded-full ${action.color} text-white shadow-lg hover:shadow-xl transition-all group`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <action.icon className="h-5 w-5" />
                <span className="text-sm font-medium whitespace-nowrap">{action.label}</span>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={handleClick}
        className={`w-14 h-14 rounded-full ${isOpen ? 'bg-red-500 hover:bg-red-600' : 'bg-primary hover:bg-primary/90'} text-white shadow-lg hover:shadow-xl transition-all flex items-center justify-center cursor-pointer`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ rotate: isOpen ? 90 : 0 }}
        style={{ pointerEvents: 'auto' }}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </motion.button>

      {/* Pulse effect when closed */}
      {!isOpen && (
        <motion.div
          className="absolute inset-0 rounded-full bg-primary pointer-events-none"
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
    </div>
  );
}

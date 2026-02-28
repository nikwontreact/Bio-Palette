'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext(undefined);

const THEME_KEY = 'portfolio-theme';
const HUE_KEY = 'portfolio-theme-hue';
const DEFAULT_HUE = 330; // Pink

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState('light');
  const [themeHue, setThemeHueState] = useState(DEFAULT_HUE);
  const [mounted, setMounted] = useState(false);

  // Initialize theme from localStorage after mount
  useEffect(() => {
    // Get stored theme
    const storedTheme = localStorage.getItem(THEME_KEY);
    if (storedTheme) {
      setThemeState(storedTheme);
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setThemeState(prefersDark ? 'dark' : 'light');
    }

    // Get stored hue
    const storedHue = localStorage.getItem(HUE_KEY);
    if (storedHue) {
      setThemeHueState(parseInt(storedHue, 10));
    } else {
      // Fetch theme color from settings API
      fetch('/api/settings')
        .then(res => res.json())
        .then(data => {
          if (data.settings?.themeColor) {
            setThemeHueState(data.settings.themeColor);
          }
        })
        .catch(err => console.error('Failed to fetch theme color:', err));
    }

    setMounted(true);
  }, []);

  // Update document class when theme changes
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    
    if (mounted) {
      localStorage.setItem(THEME_KEY, theme);
    }
  }, [theme, mounted]);

  // Update CSS variable when hue changes
  useEffect(() => {
    document.documentElement.style.setProperty('--theme-hue', themeHue.toString());
    
    if (mounted) {
      localStorage.setItem(HUE_KEY, themeHue.toString());
    }
  }, [themeHue, mounted]);

  const setTheme = (newTheme) => {
    setThemeState(newTheme);
  };

  const setThemeHue = (hue) => {
    setThemeHueState(Math.max(0, Math.min(360, hue)));
  };

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, themeHue, setTheme, setThemeHue, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

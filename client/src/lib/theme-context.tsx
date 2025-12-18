import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  themeHue: number;
  setTheme: (theme: Theme) => void;
  setThemeHue: (hue: number) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_KEY = "portfolio-theme";
const HUE_KEY = "portfolio-theme-hue";
const DEFAULT_HUE = 168; // Teal/biotech green

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(THEME_KEY) as Theme | null;
      if (stored) return stored;
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return "light";
  });

  const [themeHue, setThemeHueState] = useState<number>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(HUE_KEY);
      if (stored) return parseInt(stored, 10);
    }
    return DEFAULT_HUE;
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.style.setProperty("--theme-hue", themeHue.toString());
    localStorage.setItem(HUE_KEY, themeHue.toString());
  }, [themeHue]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const setThemeHue = (hue: number) => {
    setThemeHueState(Math.max(0, Math.min(360, hue)));
  };

  const toggleTheme = () => {
    setThemeState((prev) => (prev === "light" ? "dark" : "light"));
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
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

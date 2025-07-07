import { useEffect, useState, type ReactNode } from "react";
import { defaultTheme, themeList, themePalettes, type Theme } from "../lib/themes";
import { ThemeContext } from "./useTheme";

export const ThemeProvider = ({ children, initialTheme }: { children: ReactNode; initialTheme: Theme; }) => {
  // Get saved theme from localStorage or fallback to initialTheme
  const savedTheme = localStorage.getItem('theme') as Theme | null;
  const [currentTheme, setCurrentTheme] = useState<Theme>(savedTheme || initialTheme);

  // Inject CSS variables whenever the theme changes
  useEffect(() => {
    const palette = themePalettes[currentTheme];
    const root = document.documentElement;
    if (!palette) return; // If palette is invalid (ex: the currentTheme does not exist in the themePalettes)
    root.style.setProperty('--color-500', palette['500']);
    root.style.setProperty('--color-600', palette['600']);
    root.style.setProperty('--color-700', palette['700']);
    root.style.setProperty('--color-800', palette['800']);
    root.style.setProperty('--color-900', palette['900']);
    root.style.setProperty('--color-950', palette['950']);

    // Save theme to localStorage for future sessions
    localStorage.setItem('theme', currentTheme);
  }, [currentTheme]);

  const setTheme = (theme: Theme) => {
    setCurrentTheme(theme);
  };

  return (
    <ThemeContext.Provider value={{ currentTheme: currentTheme || defaultTheme, themeList, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

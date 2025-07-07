import { createContext, useContext } from 'react';
import type { Theme } from '../lib/themes';

export interface ThemeContextType {
  currentTheme: Theme;
  themeList: readonly Theme[];
  setTheme: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};

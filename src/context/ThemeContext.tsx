import React, { createContext, useContext, useState, useEffect } from 'react';

export type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    try {
      const saved = localStorage.getItem('evclub_theme');
      if (saved === 'light' || saved === 'dark') {
        return saved;
      }
      return 'light'; // Default to pleasant, high-contrast, easy-to-read light theme
    } catch {
      return 'light';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('evclub_theme', theme);
      const root = document.documentElement;
      if (theme === 'light') {
        root.classList.remove('dark');
        root.classList.add('light');
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
      } else {
        root.classList.remove('light');
        root.classList.add('dark');
        document.body.classList.remove('light-theme');
        document.body.classList.add('dark-theme');
      }
    } catch (e) {
      console.error('Failed to sync theme:', e);
    }
  }, [theme]);

  const toggleTheme = () => {
    setThemeState(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

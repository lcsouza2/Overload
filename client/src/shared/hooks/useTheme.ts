import { useState, useEffect, useCallback } from 'react';

export interface ThemeColors {
  background: string;
  surface: string;
  primary: string;
  primaryHover: string;
  secondary: string;
  text: string;
  textSecondary: string;
  border: string;
  button: string;
  buttonHover: string;
  buttonText: string;
  card: string;
  cardBorder: string;
  success: string;
  error: string;
  warning: string;
}

export type ThemeMode = 'light' | 'dark' | 'system';

/**
 * Tema Claro (Light Theme):
 * Fundo branco suave (off-white não absoluto) com acentos roxo neon, laranja elétrico e verde vibrante.
 */
export const lightTheme: ThemeColors = {
  background: '#FAF9F5',
  surface: '#FFFFFF',
  primary: '#7C3AED',       // Roxo Neon Elétrico
  primaryHover: '#6D28D9',  // Roxo Neon Profundo
  secondary: '#EA580C',     // Laranja Elétrico
  text: '#09090B',
  textSecondary: '#71717A',
  border: '#E4E4E7',
  button: '#7C3AED',
  buttonHover: '#6D28D9',
  buttonText: '#FFFFFF',
  card: '#FFFFFF',
  cardBorder: '#E4E4E7',
  success: '#16A34A',       // Verde Vibrante
  error: '#DC2626',
  warning: '#D97706',
};

/**
 * Tema Escuro (Dark Theme):
 * Fundo em tons de grafite/chumbo (preto não absoluto) com acentos roxo vibrante, laranja e verde claro de alto contraste.
 */
export const darkTheme: ThemeColors = {
  background: '#09090B',    // Grafite Profundo (Preto não absoluto)
  surface: '#121215',       // Preto Carvão
  primary: '#A855F7',       // Roxo Vibrante
  primaryHover: '#C084FC',  // Roxo Claro
  secondary: '#F97316',     // Laranja Vibrante
  text: '#F4F4F5',
  textSecondary: '#A1A1AA',
  border: '#27272A',
  button: '#A855F7',
  buttonHover: '#9333EA',
  buttonText: '#FFFFFF',
  card: '#18181B',
  cardBorder: '#27272A',
  success: '#4ADE80',       // Verde Claro (High Contrast)
  error: '#F87171',
  warning: '#FB923C',       // Laranja Claro
};

const THEME_STORAGE_KEY = 'overload_theme_mode';

function getSystemIsDark(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function getStoredTheme(): ThemeMode {
  if (typeof window === 'undefined') return 'system';
  const stored = localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode | null;
  if (stored && ['light', 'dark', 'system'].includes(stored)) {
    return stored;
  }
  return 'system';
}

function applyThemeVariables(colors: ThemeColors, isDark: boolean) {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;

  if (isDark) {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }

  // Injeta variáveis CSS no :root (ex: --color-background, --color-text-secondary)
  Object.entries(colors).forEach(([key, value]) => {
    const cssVarName = `--color-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
    root.style.setProperty(cssVarName, value);
  });
}

export function useTheme() {
  const [theme, setThemeState] = useState<ThemeMode>(getStoredTheme);
  const [systemIsDark, setSystemIsDark] = useState<boolean>(getSystemIsDark);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemIsDark(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const isDark = theme === 'system' ? systemIsDark : theme === 'dark';

  const setTheme = useCallback((newTheme: ThemeMode) => {
    setThemeState(newTheme);
    localStorage.setItem(THEME_STORAGE_KEY, newTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const nextTheme: ThemeMode =
        prev === 'light'
          ? 'dark'
          : prev === 'dark'
          ? 'light'
          : getSystemIsDark()
          ? 'light'
          : 'dark';
      localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
      return nextTheme;
    });
  }, []);

  useEffect(() => {
    const activePalette = isDark ? darkTheme : lightTheme;
    applyThemeVariables(activePalette, isDark);
  }, [isDark]);

  return {
    light: lightTheme,
    dark: darkTheme,
    theme,
    setTheme,
    toggleTheme,
  };
}

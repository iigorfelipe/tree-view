import { createContext } from "react";

export type ThemeTitle = 'light' | 'dark';

export type ThemeContext = {
  theme: ThemeTitle;
  toggleTheme: () => void;
  isSmDown: boolean;
  isMdDown: boolean;
};

export const defaultThemeValues: ThemeContext = {
  theme: 'light',
  toggleTheme: () => {},
  isSmDown: false,
  isMdDown: false,
};

export const ThemeContext = createContext<ThemeContext>(defaultThemeValues);

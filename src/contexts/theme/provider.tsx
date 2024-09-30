import { ReactNode } from 'react';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { usePersistedState } from '../../hooks/usePersistedState';

import { ThemeContext, ThemeTitle } from './context';

type Props = {
  children: ReactNode;
};

export const ThemeProvider = ({ children }: Props) => {
  const [theme, setTheme] = usePersistedState<ThemeTitle>('theme', 'light');

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');
  const isSmDown = useMediaQuery('(max-width: 600px)');
  const isMdDown = useMediaQuery('(max-width: 1100px)');

  const providerValues = {
    isSmDown,
    isMdDown,
    toggleTheme,
    theme,
  };

  return <ThemeContext.Provider value={providerValues}>{children}</ThemeContext.Provider>;
};

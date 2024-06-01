import { useColorScheme } from 'nativewind';

type Theme = 'light' | 'dark';

type ThemeReturnType = {
  theme: Theme;
  isDarkMode: boolean;
  setColorScheme: (theme: Theme) => void;
  toggleColorScheme: () => void;
};

export function useTheme(): ThemeReturnType {
  const { colorScheme, setColorScheme, toggleColorScheme } = useColorScheme();

  function handleSetColorScheme(theme: Theme) {
    setColorScheme(theme);
  }

  function handleToggleColorScheme() {
    toggleColorScheme();
  }

  return {
    theme: colorScheme,
    isDarkMode: colorScheme === 'dark',
    setColorScheme: handleSetColorScheme,
    toggleColorScheme: handleToggleColorScheme
  };
}

import { useEffect } from 'react';
import { useAppStore } from '../store';

/**
 * Hook for managing theme (dark mode)
 * Handles system preference detection and persistence
 */
export function useTheme() {
  const darkMode = useAppStore((state) => state.darkMode);
  const setDarkMode = useAppStore((state) => state.setDarkMode);

  useEffect(() => {
    // Apply theme on mount
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(!darkMode);

  return { darkMode, setDarkMode, toggleTheme };
}

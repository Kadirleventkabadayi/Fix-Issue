import { atom } from 'jotai';

// Theme atom to manage dark/light mode with localStorage persistence
export const themeAtom = atom<'light' | 'dark'>(
  // Initial value from localStorage or default to 'light'
  typeof window !== 'undefined' 
    ? (localStorage.getItem('theme') as 'light' | 'dark') || 'light'
    : 'light'
);

// Write atom to sync theme changes to localStorage
export const themeAtomWithPersistence = atom(
  (get) => get(themeAtom),
  (get, set, newTheme: 'light' | 'dark') => {
    set(themeAtom, newTheme);
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', newTheme);
    }
  }
);
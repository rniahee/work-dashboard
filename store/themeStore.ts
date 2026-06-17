import { create } from 'zustand';

export type Theme = 'light' | 'dark' | 'system';

type ThemeStore = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

export const useThemeStore = create<ThemeStore>()((set) => ({
  theme: 'system',
  setTheme: (theme) => {
    if (typeof document !== 'undefined') {
      document.cookie = `theme=${theme};path=/;max-age=${60 * 60 * 24 * 365}`;
    }
    set({ theme });
  },
}));

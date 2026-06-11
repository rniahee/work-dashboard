'use client';

import { useEffect } from 'react';
import { useThemeStore, type Theme } from '@/store/themeStore';

type Props = {
  initialTheme: Theme;
  children: React.ReactNode;
};

export function ThemeProvider({ initialTheme, children }: Props) {
  const theme = useThemeStore((s) => s.theme);

  useEffect(() => {
    useThemeStore.setState({ theme: initialTheme });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const applyDark = (dark: boolean) => root.classList.toggle('dark', dark);

    if (theme === 'system') {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      applyDark(mq.matches);
      const handler = (e: MediaQueryListEvent) => applyDark(e.matches);
      mq.addEventListener('change', handler);
      return () => mq.removeEventListener('change', handler);
    }

    applyDark(theme === 'dark');
  }, [theme]);

  return <>{children}</>;
}

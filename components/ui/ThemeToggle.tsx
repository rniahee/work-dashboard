'use client';

import { useThemeStore, type Theme } from '@/store/themeStore';

const NEXT_THEME: Record<Theme, Theme> = {
  system: 'light',
  light: 'dark',
  dark: 'system',
};

const ICON: Record<Theme, React.ReactNode> = {
  system: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" strokeLinecap="round" />
    </svg>
  ),
  light: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="4" />
      <path
        d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
        strokeLinecap="round"
      />
    </svg>
  ),
  dark: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

const LABEL: Record<Theme, string> = {
  system: '시스템',
  light: '라이트',
  dark: '다크',
};

export function ThemeToggle() {
  const { theme, setTheme } = useThemeStore();

  return (
    <button
      onClick={() => setTheme(NEXT_THEME[theme])}
      className="flex items-center gap-1.5 px-2 py-1.5 rounded-md text-sm text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors"
      aria-label={`테마 변경 (현재: ${LABEL[theme]})`}
      title={`현재: ${LABEL[theme]}`}
    >
      {ICON[theme]}
      <span className="hidden sm:inline text-xs">{LABEL[theme]}</span>
    </button>
  );
}

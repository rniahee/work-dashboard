import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render } from '@testing-library/react';

import { ThemeProvider } from '@/app/providers/ThemeProvider';
import { useThemeStore } from '@/store/themeStore';

function setupMatchMedia(matches: boolean) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })),
  });
}

describe('ThemeProvider', () => {
  beforeEach(() => {
    useThemeStore.setState({ theme: 'system' });
    document.documentElement.classList.remove('dark');
    setupMatchMedia(false);
  });

  it('initialTheme으로 스토어를 초기화한다', () => {
    render(
      <ThemeProvider initialTheme="dark">
        <div />
      </ThemeProvider>,
    );
    expect(useThemeStore.getState().theme).toBe('dark');
  });

  it('theme이 dark일 때 html에 dark 클래스를 추가한다', () => {
    useThemeStore.setState({ theme: 'dark' });
    render(
      <ThemeProvider initialTheme="dark">
        <div />
      </ThemeProvider>,
    );
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('theme이 light일 때 html에 dark 클래스를 제거한다', () => {
    document.documentElement.classList.add('dark');
    useThemeStore.setState({ theme: 'light' });
    render(
      <ThemeProvider initialTheme="light">
        <div />
      </ThemeProvider>,
    );
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('theme이 system이고 OS가 다크일 때 dark 클래스를 추가한다', () => {
    setupMatchMedia(true);
    useThemeStore.setState({ theme: 'system' });
    render(
      <ThemeProvider initialTheme="system">
        <div />
      </ThemeProvider>,
    );
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('theme이 system이고 OS가 라이트일 때 dark 클래스를 추가하지 않는다', () => {
    setupMatchMedia(false);
    useThemeStore.setState({ theme: 'system' });
    render(
      <ThemeProvider initialTheme="system">
        <div />
      </ThemeProvider>,
    );
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });
});

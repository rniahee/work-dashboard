import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { useThemeStore } from '@/store/themeStore';

describe('ThemeToggle', () => {
  beforeEach(() => {
    useThemeStore.setState({ theme: 'system' });
  });

  it('현재 테마 라벨을 렌더링한다', () => {
    render(<ThemeToggle />);
    expect(screen.getByText('시스템')).toBeInTheDocument();
  });

  it('클릭 시 system → light로 변경된다', async () => {
    render(<ThemeToggle />);
    await userEvent.click(screen.getByRole('button'));
    expect(useThemeStore.getState().theme).toBe('light');
  });

  it('클릭 시 light → dark로 변경된다', async () => {
    useThemeStore.setState({ theme: 'light' });
    render(<ThemeToggle />);
    await userEvent.click(screen.getByRole('button'));
    expect(useThemeStore.getState().theme).toBe('dark');
  });

  it('클릭 시 dark → system으로 변경된다', async () => {
    useThemeStore.setState({ theme: 'dark' });
    render(<ThemeToggle />);
    await userEvent.click(screen.getByRole('button'));
    expect(useThemeStore.getState().theme).toBe('system');
  });

  it('aria-label에 현재 테마 이름이 포함된다', () => {
    render(<ThemeToggle />);
    expect(screen.getByRole('button')).toHaveAttribute(
      'aria-label',
      expect.stringContaining('시스템'),
    );
  });
});

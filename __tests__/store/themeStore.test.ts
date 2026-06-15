import { beforeEach, describe, expect, it } from 'vitest';

import { useThemeStore } from '@/store/themeStore';

describe('useThemeStore', () => {
  beforeEach(() => {
    useThemeStore.setState({ theme: 'system' });
  });

  it('초기 테마는 system이다', () => {
    expect(useThemeStore.getState().theme).toBe('system');
  });

  it('setTheme으로 테마를 변경한다', () => {
    useThemeStore.getState().setTheme('dark');
    expect(useThemeStore.getState().theme).toBe('dark');
  });

  it('setTheme 호출 시 쿠키에 저장된다', () => {
    useThemeStore.getState().setTheme('dark');
    expect(document.cookie).toContain('theme=dark');
  });

  it('setTheme으로 light로 변경할 수 있다', () => {
    useThemeStore.getState().setTheme('light');
    expect(useThemeStore.getState().theme).toBe('light');
  });
});

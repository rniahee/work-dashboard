import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TasksClient } from '@/app/tasks/TasksClient';
import { renderWithProviders } from '../helpers/renderWithProviders';

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), back: vi.fn() }),
  usePathname: () => '/tasks',
}));

vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

const mockTasks = [
  { id: 't1', title: '강아지 이미지 분류', type: 'image', status: 'completed', workerId: 'w1', createdAt: '2026-03-01', dueDate: '2026-03-10' },
  { id: 't2', title: '뉴스 텍스트 감정 분석', type: 'text', status: 'in_progress', workerId: 'w2', createdAt: '2026-03-02', dueDate: '2026-03-12' },
];

const mockWorkers = [
  { id: 'w1', name: '김민지', email: 'minji@example.com', joinedAt: '2025-01-10' },
  { id: 'w2', name: '이준호', email: 'junho@example.com', joinedAt: '2025-02-03' },
];

beforeEach(() => {
  vi.stubGlobal(
    'fetch',
    vi.fn((url: string) => {
      if (url.startsWith('/api/tasks')) {
        return Promise.resolve({ json: () => Promise.resolve(mockTasks) });
      }
      if (url === '/api/workers') {
        return Promise.resolve({ json: () => Promise.resolve(mockWorkers) });
      }
      return Promise.reject(new Error(`Unhandled fetch: ${url}`));
    }),
  );
});

describe('TasksClient', () => {
  it('작업 목록을 렌더링한다', async () => {
    renderWithProviders(<TasksClient />);
    await waitFor(() => {
      expect(screen.getByText('강아지 이미지 분류')).toBeInTheDocument();
      expect(screen.getByText('뉴스 텍스트 감정 분석')).toBeInTheDocument();
    });
  });

  it('작업 등록 버튼이 렌더링된다', () => {
    renderWithProviders(<TasksClient />);
    expect(screen.getByText('+ 작업 등록')).toBeInTheDocument();
  });

  it('담당자 이름이 표시된다', async () => {
    renderWithProviders(<TasksClient />);
    await waitFor(() => {
      const elements = screen.getAllByText('김민지');
      expect(elements.some((el) => el.tagName === 'TD')).toBe(true);
    });
  });

  it('상태 필터를 변경하면 fetch가 다시 호출된다', async () => {
    renderWithProviders(<TasksClient />);
    await waitFor(() => screen.getByText('강아지 이미지 분류'));

    const statusSelect = screen.getAllByRole('combobox')[0];
    await userEvent.selectOptions(statusSelect, 'completed');

    await waitFor(() => {
      expect(vi.mocked(fetch)).toHaveBeenCalledWith(
        expect.stringContaining('status=completed'),
      );
    });
  });
});

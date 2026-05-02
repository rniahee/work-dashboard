import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import { WorkersClient } from '@/app/workers/WorkersClient';
import { renderWithProviders } from '../helpers/renderWithProviders';

const mockWorkers = [
  { id: 'w1', name: '김민지', email: 'minji@example.com', joinedAt: '2025-01-10' },
  { id: 'w2', name: '이준호', email: 'junho@example.com', joinedAt: '2025-02-03' },
];

const mockStats = {
  total: 5,
  pending: 1,
  in_progress: 1,
  completed: 2,
  rejected: 1,
  byWorker: [
    { workerId: 'w1', name: '김민지', completed: 2, rejected: 1, total: 3 },
    { workerId: 'w2', name: '이준호', completed: 0, rejected: 0, total: 2 },
  ],
};

beforeEach(() => {
  vi.stubGlobal(
    'fetch',
    vi.fn((url: string) => {
      if (url === '/api/workers') {
        return Promise.resolve({ json: () => Promise.resolve(mockWorkers) });
      }
      if (url === '/api/stats') {
        return Promise.resolve({ json: () => Promise.resolve(mockStats) });
      }
      return Promise.reject(new Error(`Unhandled fetch: ${url}`));
    }),
  );
});

describe('WorkersClient', () => {
  it('로딩 스피너를 표시한다', () => {
    renderWithProviders(<WorkersClient />);
    expect(screen.getByRole('status', { name: '로딩 중' })).toBeInTheDocument();
  });

  it('작업자 목록을 렌더링한다', async () => {
    renderWithProviders(<WorkersClient />);
    await waitFor(() => {
      expect(screen.getByText('김민지')).toBeInTheDocument();
      expect(screen.getByText('이준호')).toBeInTheDocument();
    });
  });

  it('작업자 이메일을 표시한다', async () => {
    renderWithProviders(<WorkersClient />);
    await waitFor(() => {
      expect(screen.getByText('minji@example.com')).toBeInTheDocument();
    });
  });

  it('완료율을 계산해 표시한다', async () => {
    renderWithProviders(<WorkersClient />);
    await waitFor(() => {
      expect(screen.getByText('67%')).toBeInTheDocument();
    });
  });

  it('작업이 없는 작업자의 완료율은 0%다', async () => {
    renderWithProviders(<WorkersClient />);
    await waitFor(() => {
      const zeros = screen.getAllByText('0%');
      expect(zeros.length).toBeGreaterThan(0);
    });
  });
});

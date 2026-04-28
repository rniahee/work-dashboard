import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StatCard } from '@/app/_components/StatCard';

describe('StatCard', () => {
  it('label과 value를 렌더링한다', () => {
    render(<StatCard label="전체" value={10} />);
    expect(screen.getByText('전체')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('기본 color는 text-gray-900이다', () => {
    render(<StatCard label="전체" value={10} />);
    expect(screen.getByText('10')).toHaveClass('text-gray-900');
  });

  it('color prop이 적용된다', () => {
    render(<StatCard label="완료" value={5} color="text-green-600" />);
    expect(screen.getByText('5')).toHaveClass('text-green-600');
  });
});

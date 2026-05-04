import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Loading } from '@/components/ui/Loading';

describe('Loading', () => {
  it('로딩 스피너를 렌더링한다', () => {
    render(<Loading />);
    expect(screen.getByRole('status', { name: '로딩 중' })).toBeInTheDocument();
  });

  it('기본 className으로 p-6을 적용한다', () => {
    const { container } = render(<Loading />);
    expect(container.firstChild).toHaveClass('p-6');
  });

  it('className prop을 적용한다', () => {
    const { container } = render(<Loading className="" />);
    expect(container.firstChild).not.toHaveClass('p-6');
  });
});

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '@/components/ui/Button';

describe('Button', () => {
  it('children을 렌더링한다', () => {
    render(<Button>저장</Button>);
    expect(screen.getByRole('button', { name: '저장' })).toBeInTheDocument();
  });

  it('기본 variant는 primary다', () => {
    render(<Button>저장</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-blue-600');
  });

  it('variant="secondary"를 적용한다', () => {
    render(<Button variant="secondary">취소</Button>);
    expect(screen.getByRole('button')).toHaveClass('border-gray-300');
  });

  it('variant="danger"를 적용한다', () => {
    render(<Button variant="danger">삭제</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-red-600');
  });

  it('disabled 상태일 때 클릭되지 않는다', async () => {
    const handleClick = vi.fn();
    render(
      <Button disabled onClick={handleClick}>
        저장
      </Button>,
    );
    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('onClick 핸들러가 호출된다', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>저장</Button>);
    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from '@/components/ui/Input';

describe('Input', () => {
  it('렌더링된다', () => {
    render(<Input />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('placeholder를 표시한다', () => {
    render(<Input placeholder="작업명을 입력하세요" />);
    expect(
      screen.getByPlaceholderText('작업명을 입력하세요'),
    ).toBeInTheDocument();
  });

  it('입력값이 변경된다', async () => {
    const handleChange = vi.fn();
    render(<Input onChange={handleChange} />);
    await userEvent.type(screen.getByRole('textbox'), '테스트');
    expect(handleChange).toHaveBeenCalled();
  });

  it('className이 추가 적용된다', () => {
    render(<Input className="w-48" />);
    expect(screen.getByRole('textbox')).toHaveClass('w-48');
  });
});

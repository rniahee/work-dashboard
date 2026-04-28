import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Select } from '@/components/ui/Select';

const options = [
  { value: 'pending', label: '대기' },
  { value: 'completed', label: '완료' },
];

describe('Select', () => {
  it('options를 렌더링한다', () => {
    render(<Select options={options} />);
    expect(screen.getByRole('option', { name: '대기' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: '완료' })).toBeInTheDocument();
  });

  it('placeholder를 첫 번째 option으로 렌더링한다', () => {
    render(<Select options={options} placeholder="상태 선택" />);
    expect(screen.getByRole('option', { name: '상태 선택' })).toBeInTheDocument();
  });

  it('placeholder가 없으면 빈 option을 렌더링하지 않는다', () => {
    render(<Select options={options} />);
    expect(screen.queryByRole('option', { name: '' })).not.toBeInTheDocument();
  });

  it('className이 추가 적용된다', () => {
    render(<Select options={options} className="w-full" />);
    expect(screen.getByRole('combobox')).toHaveClass('w-full');
  });
});

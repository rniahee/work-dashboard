import { describe, it, expect } from 'vitest';
import { STATUS_LABELS, TYPE_LABELS } from '@/constants/task';

describe('STATUS_LABELS', () => {
  it('모든 상태에 대한 레이블이 존재한다', () => {
    expect(STATUS_LABELS.pending).toBe('대기');
    expect(STATUS_LABELS.in_progress).toBe('진행중');
    expect(STATUS_LABELS.completed).toBe('완료');
    expect(STATUS_LABELS.rejected).toBe('반려');
  });
});

describe('TYPE_LABELS', () => {
  it('모든 유형에 대한 레이블이 존재한다', () => {
    expect(TYPE_LABELS.image).toBe('이미지');
    expect(TYPE_LABELS.text).toBe('텍스트');
    expect(TYPE_LABELS.audio).toBe('오디오');
  });
});

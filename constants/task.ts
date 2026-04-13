import type { Task } from '@/types/task';

export const STATUS_LABELS: Record<Task['status'], string> = {
  pending: '대기',
  in_progress: '진행중',
  completed: '완료',
  rejected: '반려',
};

export const TYPE_LABELS: Record<Task['type'], string> = {
  image: '이미지',
  text: '텍스트',
  audio: '오디오',
};

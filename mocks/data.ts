import type { Task, Worker } from '@/types/task';

export const workers: Worker[] = [
  { id: 'w1', name: '김민지', email: 'minji@example.com', joinedAt: '2025-01-10' },
  { id: 'w2', name: '이준호', email: 'junho@example.com', joinedAt: '2025-02-03' },
  { id: 'w3', name: '박서연', email: 'seoyeon@example.com', joinedAt: '2025-03-15' },
];

export const tasks: Task[] = [
  { id: 't1', title: '강아지 이미지 분류', type: 'image', status: 'completed', workerId: 'w1', createdAt: '2026-03-01', dueDate: '2026-03-10' },
  { id: 't2', title: '뉴스 텍스트 감정 분석', type: 'text', status: 'in_progress', workerId: 'w2', createdAt: '2026-03-05', dueDate: '2026-03-20' },
  { id: 't3', title: '음성 데이터 전사', type: 'audio', status: 'pending', workerId: 'w3', createdAt: '2026-03-08', dueDate: '2026-03-25' },
  { id: 't4', title: '자동차 번호판 인식', type: 'image', status: 'rejected', workerId: 'w1', createdAt: '2026-03-10', dueDate: '2026-03-18' },
  { id: 't5', title: '상품 리뷰 분류', type: 'text', status: 'completed', workerId: 'w2', createdAt: '2026-03-12', dueDate: '2026-03-22' },
  { id: 't6', title: '환경음 분류', type: 'audio', status: 'in_progress', workerId: 'w3', createdAt: '2026-03-15', dueDate: '2026-03-28' },
  { id: 't7', title: '의료 영상 라벨링', type: 'image', status: 'pending', workerId: 'w2', createdAt: '2026-03-18', dueDate: '2026-04-01' },
];

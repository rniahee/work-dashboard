export type TaskType = 'image' | 'text' | 'audio';
export type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'rejected';

export type Task = {
  id: string;
  title: string;
  type: TaskType;
  status: TaskStatus;
  workerId: string;
  createdAt: string;
  dueDate: string;
};

export type Worker = {
  id: string;
  name: string;
  email: string;
  joinedAt: string;
};

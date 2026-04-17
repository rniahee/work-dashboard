export type Stats = {
  total: number;
  pending: number;
  in_progress: number;
  completed: number;
  rejected: number;
  byWorker: {
    workerId: string;
    name: string;
    completed: number;
    rejected: number;
    total: number;
  }[];
};

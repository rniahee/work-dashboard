import { useQuery } from '@tanstack/react-query';

import type { Task } from '@/types/task';

type Filters = {
  status?: string;
  workerId?: string;
  query?: string;
};

export function useTasksQuery(filters: Filters = {}) {
  return useQuery<Task[]>({
    queryKey: ['tasks', filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters.status) params.set('status', filters.status);
      if (filters.workerId) params.set('workerId', filters.workerId);
      if (filters.query) params.set('query', filters.query);
      const res = await fetch(`/api/tasks?${params}`);
      return res.json();
    },
  });
}

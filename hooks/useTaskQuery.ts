import { useQuery } from '@tanstack/react-query';

import type { Task } from '@/types/task';

export function useTaskQuery(id: string) {
  return useQuery<Task>({
    queryKey: ['tasks', id],
    queryFn: async () => {
      const res = await fetch(`/api/tasks/${id}`);
      if (!res.ok) throw new Error('Not Found');
      return res.json();
    },
  });
}

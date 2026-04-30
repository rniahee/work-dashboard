import { useQuery } from '@tanstack/react-query';

import type { Worker } from '@/types/task';

export function useWorkersQuery() {
  return useQuery<Worker[]>({
    queryKey: ['workers'],
    queryFn: async () => {
      const res = await fetch('/api/workers');
      return res.json();
    },
  });
}

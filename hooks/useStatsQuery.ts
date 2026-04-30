import { useQuery } from '@tanstack/react-query';

import type { Stats } from '@/types/stats';

export function useStatsQuery() {
  return useQuery<Stats>({
    queryKey: ['stats'],
    queryFn: async () => {
      const res = await fetch('/api/stats');
      return res.json();
    },
  });
}

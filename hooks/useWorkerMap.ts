import { useMemo } from 'react';

import type { Worker } from '@/types/task';
import { useWorkersQuery } from '@/hooks/useWorkersQuery';

export function useWorkerMap() {
  const { data: workers = [] } = useWorkersQuery();

  return useMemo(
    () => new Map<string, Worker>(workers.map((worker) => [worker.id, worker])),
    [workers],
  );
}

'use client';

import { useRouter } from 'next/navigation';

import { useWorkersQuery } from '@/hooks/useWorkersQuery';
import { useCreateTask } from '@/hooks/useCreateTask';
import { TaskForm } from '@/components/task/TaskForm';

export function NewTaskClient() {
  const router = useRouter();
  const { data: workers = [] } = useWorkersQuery();
  const { mutate, isPending } = useCreateTask();

  return (
    <main className="p-6 max-w-lg space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
        작업 등록
      </h1>
      <TaskForm
        workers={workers}
        defaultValues={{ status: 'pending' }}
        submitLabel={isPending ? '등록 중...' : '등록'}
        isSubmitting={isPending}
        onSubmit={(data) => mutate(data)}
        onCancel={() => router.back()}
      />
    </main>
  );
}

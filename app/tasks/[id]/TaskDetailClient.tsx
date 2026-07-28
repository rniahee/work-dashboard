'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { useTaskQuery } from '@/hooks/useTaskQuery';
import { useWorkersQuery } from '@/hooks/useWorkersQuery';
import { useUpdateTask } from '@/hooks/useUpdateTask';
import { useDeleteTask } from '@/hooks/useDeleteTask';
import { ConfirmModal } from '@/components/ui/ConfirmModal';
import { Loading } from '@/components/ui/Loading';
import { Button } from '@/components/ui/Button';
import { TaskForm } from '@/components/task/TaskForm';

export function TaskDetailClient({ id }: { id: string }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const router = useRouter();

  const { data: task, isLoading } = useTaskQuery(id);
  const { data: workers = [] } = useWorkersQuery();

  const { mutate: updateTask, isPending: isUpdating } = useUpdateTask(id);
  const { mutate: deleteTask, isPending: isDeleting } = useDeleteTask(id);

  if (isLoading) return <Loading />;
  if (!task)
    return <p className="p-6 text-sm text-red-500">작업을 찾을 수 없습니다.</p>;

  return (
    <main className="p-6 max-w-lg space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
        작업 상세
      </h1>

      <TaskForm
        workers={workers}
        values={task}
        showStatusField
        submitLabel={isUpdating ? '저장 중...' : '저장'}
        isSubmitting={isUpdating}
        onSubmit={(data) => updateTask(data)}
        onCancel={() => router.back()}
        extraActions={
          <Button
            type="button"
            variant="danger"
            disabled={isDeleting}
            onClick={() => setShowDeleteModal(true)}
          >
            {isDeleting ? '삭제 중...' : '삭제'}
          </Button>
        }
      />

      {showDeleteModal && (
        <ConfirmModal
          message="정말 삭제하시겠습니까?"
          onConfirm={() => {
            setShowDeleteModal(false);
            deleteTask();
          }}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </main>
  );
}

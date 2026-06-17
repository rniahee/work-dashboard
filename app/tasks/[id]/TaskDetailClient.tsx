'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import type { Task, TaskType } from '@/types/task';
import { STATUS_LABELS, TYPE_LABELS } from '@/constants/task';
import { useTaskQuery } from '@/hooks/useTaskQuery';
import { useWorkersQuery } from '@/hooks/useWorkersQuery';
import { ConfirmModal } from '@/components/ui/ConfirmModal';
import { FormField } from '@/components/ui/FormField';
import { Loading } from '@/components/ui/Loading';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';

type FormValues = {
  title: string;
  workerId: string;
  dueDate: string;
  type: TaskType;
  status: Task['status'];
};

export function TaskDetailClient({ id }: { id: string }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: task, isLoading } = useTaskQuery(id);
  const { data: workers = [] } = useWorkersQuery();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  useEffect(() => {
    if (task) reset(task);
  }, [task, reset]);

  const { mutate: updateTask, isPending: isUpdating } = useMutation({
    mutationFn: async (data: FormValues) => {
      const res = await fetch(`/api/tasks/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('수정 실패');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      router.push('/tasks');
    },
  });

  const { mutate: deleteTask, isPending: isDeleting } = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('삭제 실패');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      router.push('/tasks');
    },
  });

  if (isLoading) return <Loading />;
  if (!task)
    return <p className="p-6 text-sm text-red-500">작업을 찾을 수 없습니다.</p>;

  return (
    <main className="p-6 max-w-lg space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
        작업 상세
      </h1>

      <form
        onSubmit={handleSubmit((data) => updateTask(data))}
        className="space-y-4"
      >
        <FormField label="작업명" htmlFor="title" error={errors.title}>
          <Input
            id="title"
            className="w-full"
            {...register('title', { required: '작업명을 입력해주세요' })}
          />
        </FormField>

        <FormField label="작업 유형" htmlFor="type" error={errors.type}>
          <Select
            id="type"
            className="w-full"
            options={Object.entries(TYPE_LABELS).map(([value, label]) => ({
              value,
              label,
            }))}
            {...register('type', { required: '작업 유형을 선택해주세요' })}
          />
        </FormField>

        <FormField label="담당 작업자" htmlFor="workerId" error={errors.workerId}>
          <Select
            id="workerId"
            className="w-full"
            options={workers.map((w) => ({ value: w.id, label: w.name }))}
            {...register('workerId', { required: '담당 작업자를 선택해주세요' })}
          />
        </FormField>

        <FormField label="상태" htmlFor="status" error={errors.status}>
          <Select
            id="status"
            className="w-full"
            options={Object.entries(STATUS_LABELS).map(([value, label]) => ({
              value,
              label,
            }))}
            {...register('status', { required: '상태를 선택해주세요' })}
          />
        </FormField>

        <FormField label="마감일" htmlFor="dueDate" error={errors.dueDate}>
          <Input
            id="dueDate"
            type="date"
            className="w-full"
            {...register('dueDate', { required: '마감일을 선택해주세요' })}
          />
        </FormField>

        <div className="flex gap-2 pt-2">
          <Button type="submit" disabled={isUpdating}>
            {isUpdating ? '저장 중...' : '저장'}
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => router.back()}
          >
            취소
          </Button>
          <Button
            type="button"
            variant="danger"
            disabled={isDeleting}
            onClick={() => setShowDeleteModal(true)}
          >
            {isDeleting ? '삭제 중...' : '삭제'}
          </Button>
        </div>
      </form>

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

'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import type { TaskType } from '@/types/task';
import { TYPE_LABELS } from '@/constants/task';
import { useWorkersQuery } from '@/hooks/useWorkersQuery';
import { useCreateTask } from '@/hooks/useCreateTask';
import { Button } from '@/components/ui/Button';
import { FormField } from '@/components/ui/FormField';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';

type FormValues = {
  title: string;
  workerId: string;
  dueDate: string;
  type: TaskType;
};

export function NewTaskClient() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const { data: workers = [] } = useWorkersQuery();
  const { mutate, isPending } = useCreateTask();

  return (
    <main className="p-6 max-w-lg space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
        작업 등록
      </h1>

      <form
        onSubmit={handleSubmit((data) =>
          mutate({ ...data, status: 'pending' }),
        )}
        className="space-y-4"
      >
        <FormField label="작업명" htmlFor="title" error={errors.title}>
          <Input
            id="title"
            className="w-full"
            placeholder="작업명을 입력하세요"
            {...register('title', { required: '작업명을 입력해주세요' })}
          />
        </FormField>

        <FormField label="작업 유형" htmlFor="type" error={errors.type}>
          <Select
            id="type"
            className="w-full"
            placeholder="유형 선택"
            options={Object.entries(TYPE_LABELS).map(([value, label]) => ({
              value,
              label,
            }))}
            {...register('type', { required: '작업 유형을 선택해주세요' })}
          />
        </FormField>

        <FormField
          label="담당 작업자"
          htmlFor="workerId"
          error={errors.workerId}
        >
          <Select
            id="workerId"
            className="w-full"
            placeholder="작업자 선택"
            options={workers.map((w) => ({ value: w.id, label: w.name }))}
            {...register('workerId', {
              required: '담당 작업자를 선택해주세요',
            })}
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
          <Button type="submit" disabled={isPending}>
            {isPending ? '등록 중...' : '등록'}
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => router.back()}
          >
            취소
          </Button>
        </div>
      </form>
    </main>
  );
}

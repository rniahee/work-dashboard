'use client';

import { ReactNode } from 'react';
import { useForm } from 'react-hook-form';

import type { TaskType, TaskStatus, Worker } from '@/types/task';
import { STATUS_OPTIONS, TYPE_OPTIONS } from '@/constants/task';
import { FormField } from '@/components/ui/FormField';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';

export type TaskFormValues = {
  title: string;
  workerId: string;
  dueDate: string;
  type: TaskType;
  status: TaskStatus;
};

type Props = {
  workers: Worker[];
  defaultValues?: Partial<TaskFormValues>;
  values?: TaskFormValues;
  showStatusField?: boolean;
  submitLabel: string;
  isSubmitting: boolean;
  onSubmit: (data: TaskFormValues) => void;
  onCancel: () => void;
  extraActions?: ReactNode;
};

export function TaskForm({
  workers,
  defaultValues,
  values,
  showStatusField = false,
  submitLabel,
  isSubmitting,
  onSubmit,
  onCancel,
  extraActions,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormValues>({ defaultValues, values });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
          options={TYPE_OPTIONS}
          {...register('type', { required: '작업 유형을 선택해주세요' })}
        />
      </FormField>

      <FormField label="담당 작업자" htmlFor="workerId" error={errors.workerId}>
        <Select
          id="workerId"
          className="w-full"
          placeholder="작업자 선택"
          options={workers.map((w) => ({ value: w.id, label: w.name }))}
          {...register('workerId', { required: '담당 작업자를 선택해주세요' })}
        />
      </FormField>

      {showStatusField ? (
        <FormField label="상태" htmlFor="status" error={errors.status}>
          <Select
            id="status"
            className="w-full"
            options={STATUS_OPTIONS}
            {...register('status', { required: '상태를 선택해주세요' })}
          />
        </FormField>
      ) : (
        <input type="hidden" {...register('status')} />
      )}

      <FormField label="마감일" htmlFor="dueDate" error={errors.dueDate}>
        <Input
          id="dueDate"
          type="date"
          className="w-full"
          {...register('dueDate', { required: '마감일을 선택해주세요' })}
        />
      </FormField>

      <div className="flex gap-2 pt-2">
        <Button type="submit" disabled={isSubmitting}>
          {submitLabel}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          취소
        </Button>
        {extraActions}
      </div>
    </form>
  );
}

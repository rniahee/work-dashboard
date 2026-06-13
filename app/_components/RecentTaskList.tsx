'use client';

import { useMemo } from 'react';
import Link from 'next/link';

import { STATUS_LABELS } from '@/constants/task';
import { useTasksQuery } from '@/hooks/useTasksQuery';
import { useWorkersQuery } from '@/hooks/useWorkersQuery';

export function RecentTaskList() {
  const { data: tasks = [] } = useTasksQuery();
  const { data: workers = [] } = useWorkersQuery();

  const recentTasks = useMemo(
    () =>
      [...tasks]
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
        .slice(0, 5),
    [tasks],
  );

  return (
    <div className="rounded-lg border bg-white p-5 space-y-3">
      <p className="text-sm font-medium text-gray-700">최근 등록된 작업</p>
      {recentTasks.length === 0 ? (
        <p className="text-sm text-gray-400">작업이 없습니다.</p>
      ) : (
        <ul className="divide-y">
          {recentTasks.map((task) => {
            const worker = workers.find((w) => w.id === task.workerId);
            return (
              <li
                key={task.id}
                className="py-2.5 flex items-center justify-between gap-4"
              >
                <Link
                  href={`/tasks/${task.id}`}
                  className="text-sm text-blue-600 hover:underline truncate"
                >
                  {task.title}
                </Link>
                <div className="flex items-center gap-3 shrink-0 text-xs text-gray-500">
                  <span>{worker?.name ?? '-'}</span>
                  <span>{STATUS_LABELS[task.status]}</span>
                  <span>{task.dueDate}</span>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

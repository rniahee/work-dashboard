"use client";

import { useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

import type { Task, Worker } from "@/types/task";
import { STATUS_LABELS, TYPE_LABELS } from "@/constants/task";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";

export function TasksClient() {
  const [status, setStatus] = useState<string>("");
  const [workerId, setWorkerId] = useState<string>("");
  const [query, setQuery] = useState<string>("");

  const { data: tasks = [], isLoading: tasksLoading } = useQuery<Task[]>({
    queryKey: ["tasks", { status, workerId, query }],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (status) params.set("status", status);
      if (workerId) params.set("workerId", workerId);
      if (query) params.set("query", query);
      const res = await fetch(`/api/tasks?${params}`);
      return res.json();
    },
  });

  const { data: workers = [] } = useQuery<Worker[]>({
    queryKey: ["workers"],
    queryFn: async () => {
      const res = await fetch("/api/workers");
      return res.json();
    },
  });

  return (
    <main className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">작업 목록</h1>
        <Link
          href="/tasks/new"
          className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
        >
          + 작업 등록
        </Link>
      </div>

      <div className="flex flex-wrap gap-3">
        <Input
          type="text"
          placeholder="작업명 검색"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-48"
        />
        <Select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          placeholder="전체 상태"
          options={Object.entries(STATUS_LABELS).map(([value, label]) => ({
            value,
            label,
          }))}
        />
        <Select
          value={workerId}
          onChange={(e) => setWorkerId(e.target.value)}
          placeholder="전체 작업자"
          options={workers.map((w) => ({ value: w.id, label: w.name }))}
        />
      </div>

      {tasksLoading ? (
        <p className="text-sm text-gray-500">불러오는 중...</p>
      ) : (
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b bg-gray-50 text-left">
              <th className="px-4 py-2">작업명</th>
              <th className="px-4 py-2">유형</th>
              <th className="px-4 py-2">상태</th>
              <th className="px-4 py-2">담당자</th>
              <th className="px-4 py-2">마감일</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-gray-400">
                  작업이 없습니다.
                </td>
              </tr>
            ) : (
              tasks.map((task) => {
                const worker = workers.find((w) => w.id === task.workerId);
                return (
                  <tr key={task.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">
                      <Link
                        href={`/tasks/${task.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        {task.title}
                      </Link>
                    </td>
                    <td className="px-4 py-2">{TYPE_LABELS[task.type]}</td>
                    <td className="px-4 py-2">{STATUS_LABELS[task.status]}</td>
                    <td className="px-4 py-2">{worker?.name ?? "-"}</td>
                    <td className="px-4 py-2">{task.dueDate}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      )}
    </main>
  );
}

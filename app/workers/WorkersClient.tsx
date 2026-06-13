'use client';

import { useWorkersQuery } from '@/hooks/useWorkersQuery';
import { useStatsQuery } from '@/hooks/useStatsQuery';
import { Loading } from '@/components/ui/Loading';

export function WorkersClient() {
  const { data: workers = [], isLoading } = useWorkersQuery();
  const { data: stats } = useStatsQuery();

  if (isLoading) return <Loading />;

  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">작업자 관리</h1>

      <table
        aria-label="작업자 목록"
        className="w-full text-sm border-collapse"
      >
        <thead>
          <tr className="border-b bg-gray-50 text-left">
            <th className="px-4 py-2">이름</th>
            <th className="px-4 py-2">이메일</th>
            <th className="px-4 py-2">합류일</th>
            <th className="px-4 py-2">전체</th>
            <th className="px-4 py-2">완료</th>
            <th className="px-4 py-2">완료율</th>
            <th className="px-4 py-2">반려</th>
            <th className="px-4 py-2">반려율</th>
          </tr>
        </thead>

        <tbody>
          {workers.map((worker) => {
            const workerStats = stats?.byWorker.find(
              (w) => w.workerId === worker.id,
            );
            const total = workerStats?.total ?? 0;
            const completed = workerStats?.completed ?? 0;
            const rejected = workerStats?.rejected ?? 0;
            const completionRate =
              total > 0 ? Math.round((completed / total) * 100) : 0;
            const rejectionRate =
              total > 0 ? Math.round((rejected / total) * 100) : 0;

            return (
              <tr key={worker.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2 font-medium">{worker.name}</td>
                <td className="px-4 py-2 text-gray-500">{worker.email}</td>
                <td className="px-4 py-2 text-gray-500">{worker.joinedAt}</td>
                <td className="px-4 py-2">{total}</td>
                <td className="px-4 py-2 text-green-600">{completed}</td>
                <td className="px-4 py-2 text-green-600">{completionRate}%</td>
                <td className="px-4 py-2 text-red-500">{rejected}</td>
                <td className="px-4 py-2 text-red-500">{rejectionRate}%</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}

'use client';

import { useStatsQuery } from '@/hooks/useStatsQuery';
import { Loading } from '@/components/ui/Loading';
import { StatCard } from './_components/StatCard';
import { StatusDonutChart } from './_components/StatusDonutChart';
import { WorkerBarChart } from './_components/WorkerBarChart';
import { RecentTaskList } from './_components/RecentTaskList';

export function DashboardClient() {
  const { data: stats, isLoading } = useStatsQuery();

  if (isLoading) return <Loading />;
  if (!stats) return null;

  return (
    <main className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">대시보드</h1>

      <section className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard label="전체" value={stats.total} />
        <StatCard
          label="진행중"
          value={stats.in_progress}
          color="text-blue-600"
        />
        <StatCard label="완료" value={stats.completed} color="text-green-600" />
        <StatCard label="반려" value={stats.rejected} color="text-red-600" />
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <StatusDonutChart stats={stats} />
        <WorkerBarChart stats={stats} />
      </section>

      <RecentTaskList />
    </main>
  );
}

'use client';

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

import type { Stats } from '@/types/stats';

const COLORS: Record<string, string> = {
  대기: '#94a3b8',
  진행중: '#3b82f6',
  완료: '#22c55e',
  반려: '#ef4444',
};

type Props = {
  stats: Stats;
};

export function StatusDonutChart({ stats }: Props) {
  const data = [
    { name: '대기', value: stats.pending },
    { name: '진행중', value: stats.in_progress },
    { name: '완료', value: stats.completed },
    { name: '반려', value: stats.rejected },
  ].filter((d) => d.value > 0);

  return (
    <div className="rounded-lg border bg-white dark:bg-gray-900 dark:border-gray-700 p-5 space-y-2">
      <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
        작업 상태별 비율
      </p>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={3}
            dataKey="value"
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={COLORS[entry.name]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value}건`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

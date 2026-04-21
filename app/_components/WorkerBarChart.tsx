'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import type { Stats } from '@/types/stats';

type Props = {
  stats: Stats;
};

export function WorkerBarChart({ stats }: Props) {
  return (
    <div className="rounded-lg border bg-white p-5 space-y-2">
      <p className="text-sm font-medium text-gray-700">작업자별 완료 건수</p>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={stats.byWorker} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="completed" name="완료" fill="#22c55e" radius={[4, 4, 0, 0]} />
          <Bar dataKey="rejected" name="반려" fill="#ef4444" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

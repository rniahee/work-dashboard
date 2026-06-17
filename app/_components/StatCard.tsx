type Props = {
  label: string;
  value: number;
  color?: string;
};

export function StatCard({ label, value, color = 'text-gray-900 dark:text-gray-100' }: Props) {
  return (
    <div className="rounded-lg border bg-white dark:bg-gray-900 dark:border-gray-700 p-5 space-y-1">
      <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
      <p className={`text-3xl font-bold ${color}`}>{value}</p>
    </div>
  );
}

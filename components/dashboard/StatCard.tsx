type Props = {
  label: string;
  value: number;
  color?: string;
};

export function StatCard({ label, value, color = 'text-gray-900' }: Props) {
  return (
    <div className="rounded-lg border bg-white p-5 space-y-1">
      <p className="text-sm text-gray-500">{label}</p>
      <p className={`text-3xl font-bold ${color}`}>{value}</p>
    </div>
  );
}

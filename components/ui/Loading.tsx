export function Loading({ className = 'p-6' }: { className?: string }) {
  return (
    <div className={`${className} flex items-center justify-center`}>
      <div
        role="status"
        aria-label="로딩 중"
        className="w-6 h-6 border-2 border-gray-200 border-t-blue-500 dark:border-gray-700 dark:border-t-blue-400 rounded-full animate-spin"
      />
    </div>
  );
}

import { ThemeToggle } from '@/components/ui/ThemeToggle';

type Props = {
  onMenuClick: () => void;
};

export function Header({ onMenuClick }: Props) {
  return (
    <header className="h-12 md:h-16 shrink-0 border-b bg-white dark:bg-gray-900 dark:border-gray-700 flex items-center justify-between px-4 md:px-6">
      <span className="text-base md:text-lg font-bold text-blue-600">
        Work Dashboard
      </span>
      <div className="flex items-center gap-1">
        <ThemeToggle />
        <button
          className="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
          onClick={onMenuClick}
          aria-label="메뉴 열기"
        >
          <svg
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
}

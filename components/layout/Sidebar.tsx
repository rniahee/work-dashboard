'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { label: '대시보드', href: '/' },
  { label: '작업 목록', href: '/tasks' },
  { label: '작업자 관리', href: '/workers' },
];

type Props = {
  isOpen?: boolean;
  onClose?: () => void;
};

export function Sidebar({ isOpen = false, onClose }: Props) {
  const pathname = usePathname();

  const navLinks = NAV_ITEMS.map(({ label, href }) => {
    const isActive =
      href === '/' ? pathname === '/' : pathname.startsWith(href);
    return (
      <Link
        key={href}
        href={href}
        onClick={onClose}
        className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
          isActive
            ? 'bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400'
            : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
        }`}
      >
        {label}
      </Link>
    );
  });

  return (
    <>
      <aside className="hidden md:flex w-56 shrink-0 border-r bg-white dark:bg-gray-900 dark:border-gray-700 flex-col">
        <nav className="flex-1 px-3 py-4 space-y-1">{navLinks}</nav>
      </aside>

      {isOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={onClose} />
          <aside className="absolute right-0 top-0 h-full w-56 bg-white dark:bg-gray-900 flex flex-col shadow-lg">
            <div className="h-12 flex items-center justify-end px-4 border-b dark:border-gray-700">
              <button
                className="p-2 rounded-md text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                onClick={onClose}
                aria-label="메뉴 닫기"
              >
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="flex-1 px-3 py-4 space-y-1">{navLinks}</nav>
          </aside>
        </div>
      )}
    </>
  );
}

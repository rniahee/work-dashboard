type Props = {
  onMenuClick: () => void;
};

export function Header({ onMenuClick }: Props) {
  return (
    <header className="h-12 md:h-16 shrink-0 border-b bg-white flex items-center justify-between px-4 md:px-6">
      <span className="text-base md:text-lg font-bold text-blue-600">Work Dashboard</span>
      <button
        className="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
        onClick={onMenuClick}
        aria-label="메뉴 열기"
      >
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </header>
  );
}

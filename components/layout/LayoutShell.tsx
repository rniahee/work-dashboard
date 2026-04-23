'use client';

import { useState, useEffect } from 'react';

import { Header } from './Header';
import { Sidebar } from './Sidebar';

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (e.matches) setIsOpen(false);
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <>
      <Header onMenuClick={() => setIsOpen(true)} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
        <div className="flex-1 overflow-auto">{children}</div>
      </div>
    </>
  );
}

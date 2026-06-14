import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import type { Theme } from '@/store/themeStore';

import './globals.css';
import { LayoutShell } from '@/components/layout/LayoutShell';
import { MSWProvider } from './providers/MSWProvider';
import { QueryProvider } from './providers/QueryProvider';
import { ThemeProvider } from './providers/ThemeProvider';

export const metadata: Metadata = {
  title: 'Work Dashboard',
  description: '작업 현황을 한눈에 관리하고 시각화하는 태스크 관리 대시보드',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const savedTheme = (cookieStore.get('theme')?.value ?? 'system') as Theme;
  const isDark = savedTheme === 'dark';

  return (
    <html lang="ko" className={`h-full antialiased${isDark ? ' dark' : ''}`}>
      <body className="h-full flex flex-col bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
        <MSWProvider>
          <QueryProvider>
            <ThemeProvider initialTheme={savedTheme}>
              <LayoutShell>{children}</LayoutShell>
            </ThemeProvider>
          </QueryProvider>
        </MSWProvider>
      </body>
    </html>
  );
}

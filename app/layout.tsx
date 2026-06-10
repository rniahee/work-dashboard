import type { Metadata } from "next";

import "./globals.css";
import { LayoutShell } from "@/components/layout/LayoutShell";
import { MSWProvider } from "./providers/MSWProvider";
import { QueryProvider } from "./providers/QueryProvider";
import { ThemeProvider } from "./providers/ThemeProvider";


export const metadata: Metadata = {
  title: "Work Dashboard",
  description: "작업 현황을 한눈에 관리하고 시각화하는 태스크 관리 대시보드",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="h-full flex flex-col">
        <MSWProvider>
          <QueryProvider>
            <ThemeProvider>
              <LayoutShell>{children}</LayoutShell>
            </ThemeProvider>
          </QueryProvider>
        </MSWProvider>
      </body>
    </html>
  );
}

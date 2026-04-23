import type { Metadata } from "next";

import "./globals.css";
import { LayoutShell } from "@/components/layout/LayoutShell";
import { MSWProvider } from "./providers/MSWProvider";
import { QueryProvider } from "./providers/QueryProvider";


export const metadata: Metadata = {
  title: "LabelBoard",
  description: "데이터 라벨링 태스크 관리 대시보드",
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
            <LayoutShell>{children}</LayoutShell>
          </QueryProvider>
        </MSWProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import { MSWProvider } from "./MSWProvider";

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
      <body className="min-h-full flex flex-col">
        <MSWProvider>{children}</MSWProvider>
      </body>
    </html>
  );
}

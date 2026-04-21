import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI 简历优化 - 让你的简历通过率提升 300%",
  description: "AI 一键量化成果，智能匹配关键词，帮你优化简历",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}

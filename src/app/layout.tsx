import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WithChurch",
  description: "WithChurch - Next.js 14 + Supabase",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}

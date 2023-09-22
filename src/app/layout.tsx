import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Twitter",
  description: "twitter, write post about everything :)",
  themeColor: "#00acee",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}

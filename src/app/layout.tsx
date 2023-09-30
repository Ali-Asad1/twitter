import type { Metadata } from "next";

import { poppins, roboto, chirp } from "@/libs/fonts";

import "./globals.css";
import AuthContext from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "Twitter",
  description: "twitter, write post about everything :)",
  themeColor: "#00acee",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${roboto.variable} ${chirp.variable} dark`}
      style={{ colorScheme: "dark" }}
      suppressHydrationWarning
    >
      <body className={chirp.className}>
        <AuthContext>
          <main className="w-full h-full">{children}</main>
        </AuthContext>
      </body>
    </html>
  );
}

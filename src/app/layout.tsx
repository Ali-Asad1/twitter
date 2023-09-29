import type { Metadata } from "next";
import Providers from "./providers";

import { poppins, roboto, chirp } from "@/libs/fonts";

import "./globals.css";

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
        <Providers>
          <main className="w-full h-full">{children}</main>
        </Providers>
      </body>
    </html>
  );
}

import type { Metadata } from "next";

import { poppins, roboto, chirp, vazirmatn } from "@/libs/fonts";

import Providers from "./providers";
import ToastContext from "@/context/ToastContext";
import ModalContext from "@/context/ModalContext";

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
      className={`${poppins.variable} ${roboto.variable} ${chirp.variable} ${vazirmatn.variable} dark`}
      style={{ colorScheme: "dark" }}
      suppressHydrationWarning
    >
      <body className={chirp.className}>
        <Providers>
          <ToastContext />
          <ModalContext />
          <main className="w-full h-full">{children}</main>
        </Providers>
      </body>
    </html>
  );
}

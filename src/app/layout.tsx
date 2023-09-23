import type { Metadata } from "next";

import Grid from "@/components/shared/Grid";
import Sidebar from "@/components/layout/sidebar/Sidebar";
import Followbar from "@/components/layout/followBar/FollowBar";

import "./globals.css";

export const metadata: Metadata = {
  title: "Twitter",
  description: "twitter, write post about everything :)",
  themeColor: "#00acee",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: "dark" }} suppressHydrationWarning>
      <body>
        <main className="h-screen">
          <Grid>
            <Sidebar />
            {children}
            <Followbar />
          </Grid>
        </main>
      </body>
    </html>
  );
}

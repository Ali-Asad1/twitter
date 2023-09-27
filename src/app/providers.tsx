"use client";

import AuthProvider from "@/providers/AuthProvider";
import QueryProvider from "@/providers/QueryProvider";

const Providers = ({ children, session }: { children: React.ReactNode; session: any }) => {
  return (
    <AuthProvider session={session}>
      <QueryProvider>{children}</QueryProvider>
    </AuthProvider>
  );
};

export default Providers;

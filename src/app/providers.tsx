"use client";

import { EdgeStoreProvider } from "@/libs/edgeStore";
import AuthProvider from "@/providers/AuthProvider";
import QueryProvider from "@/providers/QueryProvider";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <QueryProvider>
        <EdgeStoreProvider>{children}</EdgeStoreProvider>
      </QueryProvider>
    </AuthProvider>
  );
};

export default Providers;

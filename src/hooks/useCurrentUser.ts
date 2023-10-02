"use client";

import { getCurrentUser } from "@/services/user";
import { useQuery } from "@tanstack/react-query";

const useCurrentUser = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["user", "current"],
    queryFn: () => getCurrentUser(),
  });

  return { data, isLoading, error };
};
export default useCurrentUser;

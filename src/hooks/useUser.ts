"use client";

import { getUser } from "@/services/user";
import { useQuery } from "@tanstack/react-query";

const useUser = (userId: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUser(userId),
  });

  return { data, isLoading, error };
};
export default useUser;

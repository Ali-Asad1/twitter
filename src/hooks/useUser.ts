"use client";

import { getUser } from "@/services/user";
import { useQuery } from "@tanstack/react-query";

const useUser = (username: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["user", username],
    queryFn: () => getUser(username),
  });

  return { data, isLoading, error };
};
export default useUser;

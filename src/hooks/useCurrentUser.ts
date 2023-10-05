"use client";

import { getCurrentUser } from "@/services/user";
import { UserType } from "@/types/user.type";
import { useQuery } from "@tanstack/react-query";

const useCurrentUser = () => {
  const { data, isLoading, error } = useQuery<UserType>({
    queryKey: ["user", "current"],
    queryFn: () => getCurrentUser(),
  });

  return { data, isLoading, error };
};
export default useCurrentUser;

"use client";

import { getAllUsers } from "@/services/user";
import { useQuery } from "@tanstack/react-query";

const useAllUsers = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["user", 'all'],
    queryFn: () => getAllUsers(),
  });

  return { data, isLoading, error };
};
export default useAllUsers;

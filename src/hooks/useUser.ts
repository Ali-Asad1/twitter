"use client";

import { getUser } from "@/services/user";
import { UserType } from "@/types/user.type";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

const useUser = (username: string) => {
  const { data, isLoading, error } = useQuery<UserType, AxiosError>({
    queryKey: ["user", username],
    queryFn: () => getUser(username),
  });

  return { data, isLoading, error };
};
export default useUser;

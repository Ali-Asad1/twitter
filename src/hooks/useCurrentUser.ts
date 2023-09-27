import { useQuery } from "@tanstack/react-query";
import axiosCfg from "@/services/config/axios";

const useCurrentUser = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["api/current"],
    queryFn: () => axiosCfg.get("current").then((res) => res.data),
  });

  return {
    data,
    error,
    isLoading,
  };
};
export default useCurrentUser;

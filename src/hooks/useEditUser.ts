import { editUserProfile } from "@/services/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useEditProfileImage = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (avatar: string) => {
      return editUserProfile(avatar);
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["user", data.username]);
      },
    }
  );
};

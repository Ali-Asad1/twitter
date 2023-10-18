import { editUserBanner, editUserProfile } from "@/services/user";
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

export const useEditBannerImage = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (banner: string) => {
      return editUserBanner(banner);
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["user", data.username]);
      },
    }
  );
};

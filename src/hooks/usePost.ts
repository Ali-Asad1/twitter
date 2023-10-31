import { useQuery } from "@tanstack/react-query";
import { getPost } from "@/services/post";
import { PostType } from "@/types/post.type";
import { AxiosError } from "axios";

export const usePost = (postId: string) => {
  return useQuery<PostType, AxiosError>({
    queryKey: ["post", postId],
    queryFn: () => getPost(postId),
  });
};

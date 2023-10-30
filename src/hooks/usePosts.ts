import { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { PostType } from "@/types/post.type";
import { addNewPost, getAllPosts } from "@/services/post";

export const usePosts = (userId?: string) => {
  const postUrl = userId ? `/api/posts?userId=${userId}` : "/api/posts";
  return useQuery<PostType[], AxiosError>({
    queryKey: ["posts", userId ? userId : "all"],
    queryFn: () => getAllPosts(postUrl),
  });
};

export const useAddPost = () => {
  const queryClient = useQueryClient();

  return useMutation((body: string) => addNewPost(body), {
    onSuccess() {
      queryClient.invalidateQueries(["posts"]);
    },
  });
};

import { getAllPosts } from "@/services/post";
import { PostType } from "@/types/post.type";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const usePosts = (userId?: string) => {
  const postUrl = userId ? `/api/posts?userId=${userId}` : "/api/posts";
  return useQuery<PostType[], AxiosError>({
    queryKey: ["post", userId ? userId : "all"],
    queryFn: () => getAllPosts(postUrl),
  });
};

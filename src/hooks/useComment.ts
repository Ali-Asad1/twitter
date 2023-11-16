import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addComment } from "@/services/post";

export const useComment = (id: string) => {
  const quryClient = useQueryClient();

  return useMutation(
    ({ body, postId }: { body: string; postId: string }) => addComment(body, postId),
    {
      onSuccess() {
        quryClient.invalidateQueries(["post", id]);
      },
    }
  );
};

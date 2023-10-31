import toast from "react-hot-toast";
import useCurrentUser from "./useCurrentUser";
import axios from "axios";
import { useEffect, useState } from "react";

export const useLike = (postId: string, likeList?: string[]) => {
  const [hasLiked, setHasLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likeList?.length || 0);

  const { data: currentUser } = useCurrentUser();
  const list = likeList || [];

  const toggleLike = () => {
    if (!currentUser) {
      return toast.error("You must be login");
    }

    if (hasLiked) {
      setLikeCount((prev) => prev - 1);
      setHasLiked(false);
      axios.delete("/api/posts/like", { data: { postId } }).catch();
    } else {
      setLikeCount((prev) => prev + 1);
      setHasLiked(true);
      axios.post("/api/posts/like", { postId }).catch();
    }
  };

  useEffect(() => {
    setHasLiked(() => {
      return list.includes(currentUser?.id || "");
    });
  }, [currentUser]);

  return { hasLiked, likeCount, toggleLike };
};

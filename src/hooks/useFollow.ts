import { useEffect, useState } from "react";
import useCurrentUser from "./useCurrentUser";
import toast from "react-hot-toast";
import axios from "axios";

export const useFollow = (userId: string, followerList?: string[]) => {
  const [hasFollow, setHasFollow] = useState(false);
  const { data: currentUser } = useCurrentUser();

  const list = followerList || [];

  const toggleFollow = () => {
    if (!currentUser) {
      return toast.error("You must be login");
    }

    if (hasFollow) {
      setHasFollow(false);
      axios.delete("/api/user/follow", { data: { userId } });
    } else {
      setHasFollow(true);
      axios.post("/api/user/follow", { userId });
    }
  };

  useEffect(() => {
    setHasFollow(() => {
      return list.includes(currentUser?.id || "");
    });
  }, [currentUser]);

  return { hasFollow, toggleFollow };
};

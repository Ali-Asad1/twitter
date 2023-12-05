"use client";

import axios from "axios";
import Button from "../common/Button";
import useUser from "@/hooks/useUser";
import { useFollow } from "@/hooks/useFollow";

type FollowBtnProps = {
  userId: string | null;
  username: string;
};

const FollowBtn: React.FC<FollowBtnProps> = ({ userId, username }) => {
  const { data: user } = useUser(username);
  const { hasFollow, toggleFollow } = useFollow(userId as string, user?.followerIds);
  return (
    <>
      {hasFollow ? (
        <Button onClick={toggleFollow} btnSize="sm" btnStyle="secondary">
          unfollow
        </Button>
      ) : (
        <Button onClick={toggleFollow} btnSize="sm">
          Follow
        </Button>
      )}
    </>
  );
};
export default FollowBtn;

"use client";

import { useMemo } from "react";
import { format } from "date-fns";
import { BiCalendar } from "react-icons/bi";

import { useEditBioModal } from "@/hooks/useEditBioModal";
import useCurrentUser from "@/hooks/useCurrentUser";
import useUser from "@/hooks/useUser";

import FollowBtn from "./FollowBtn";
import EditBtn from "./EditBtn";
import Button from "../common/Button";

const UserBio = ({ username }: { username: string }) => {
  const { data: user } = useUser(username);
  const { data: currentUser, isLoading } = useCurrentUser();
  const { onOpen: onOpenEditBioModal } = useEditBioModal();

  const userCreateDate = useMemo(() => {
    if (!user?.createdAt) return null;

    return format(new Date(user.createdAt), "MMMM yyy");
  }, [user?.createdAt]);

  return (
    <div className="border-b border-b-slate-6 p-5">
      <div className="flex justify-end mb-4">
        {isLoading ? (
          <Button btnSize="sm" btnStyle="tertiary"></Button>
        ) : currentUser?.username === username ? (
          <EditBtn onClick={onOpenEditBioModal} btnType="default" />
        ) : (
          <FollowBtn userId={user?.id || null} username={username} />
        )}
      </div>
      <div className="flex flex-col mb-4">
        <p className="font-semibold text-lg capitalize">{user?.name}</p>
        <p className="text-slate-11 text-sm">@{user?.username}</p>
      </div>
      <div className="flex flex-col">
        <p className="font-poppins text-sm">{user?.bio}</p>
        <div className="flex items-center gap-x-1 mt-4">
          <BiCalendar size={16} className="fill-slate-10" />
          <p className="text-sm text-slate-10">Joined {userCreateDate}</p>
        </div>
        <div className="flex gap-x-4 mt-4">
          <div className="flex gap-x-1">
            <span className="text-sm">{user?.followerIds?.length || 0}</span>
            <p className="text-sm text-slate-10">followers</p>
          </div>
          <div className="flex gap-x-1">
            <span className="text-sm">{user?.followingIds.length || 0}</span>
            <p className="text-sm text-slate-10">following</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserBio;

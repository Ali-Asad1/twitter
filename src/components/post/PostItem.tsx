"use client";

import { useRouter } from "next/navigation";
import { formatDistanceToNowStrict } from "date-fns";
import { BiMessageSquareDetail } from "react-icons/bi";
import { FaHeart, FaRegHeart } from "react-icons/fa";

import { PostType } from "@/types/post.type";

import Avatar from "../user/Avatar";

const PostItem: React.FC<PostType> = ({
  body,
  comments,
  createdAt,
  id,
  likedIds,
  user,
  userId,
}) => {
  const { push } = useRouter();

  const createAtDistance = formatDistanceToNowStrict(new Date(createdAt));

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        push(`/post/${id}`);
      }}
      className="border-b border-slate-6 p-5 hover:bg-slate-3 active:bg-slate-4 transition-colors"
    >
      <div className="flex gap-x-2">
        <div className="min-2-12">
          <Avatar username={user.username} clickAble src={user?.profileImage} />
        </div>
        <div className="flex flex-col gap-y-2">
          <div className="flex items-center gap-x-2">
            <p className="font-semibold text-base">{user.name}</p>
            <span className="text-sm text-slate-11">@{user.username}</span>
            <span className="text-sm text-slate-11">{createAtDistance}</span>
          </div>
          <p className="text-[14px]">{body}</p>
          <div className="flex gap-x-10 text-slate-11">
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="flex items-center gap-x-1 cursor-pointer hover:text-blue-9 transition-colors"
            >
              <BiMessageSquareDetail />
              <span className="text-sm">{comments?.length || 0}</span>
            </div>
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="flex items-center gap-x-1 cursor-pointer hover:text-red-9 transition-colors"
            >
              <FaHeart className="fill-red-9" />
              <span className="text-sm">{likedIds?.length || 0}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PostItem;

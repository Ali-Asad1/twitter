import { formatDistanceToNowStrict } from "date-fns";

import { CommentType } from "@/types/comment.type";

import Avatar from "../user/Avatar";

const CommentItem: React.FC<CommentType> = ({ body, createAt, id, user }) => {
  const createAtDistance = formatDistanceToNowStrict(new Date(createAt));

  return (
    <div className="border-b border-slate-6 p-5">
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
          <p className="font-vazirmatn text-[14px]">{body}</p>
        </div>
      </div>
    </div>
  );
};
export default CommentItem;

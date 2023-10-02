"use client";

import Avatar from "@/components/user/Avatar";
import UserItemLoading from "./UserItemLoading";
import useUser from "@/hooks/useUser";

interface UserProps {
  id: string;
  username: string;
}

const UserItem = ({ username }: UserProps) => {
  const { data, error, isLoading } = useUser(username);

  if (error) return null;
  if (isLoading) return <UserItemLoading />;
  return (
    <div className="grid grid-cols-[auto_1fr] items-center gap-x-3">
      <Avatar username={username} />
      <div className="">
        <p className="text-slate-12 line-clamp-1 ">{data.name}</p>
        <p className="text-slate-11 text-sm">@{data.username}</p>
      </div>
    </div>
  );
};
export default UserItem;

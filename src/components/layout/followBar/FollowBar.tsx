"use client";

import useAllUsers from "@/hooks/useAllUsers";
import UserItem from "./UserItem";
import UserItemLoading from "./UserItemLoading";

const Followbar = () => {
  const { data, error, isLoading } = useAllUsers();
  return (
    <div className="px-6 py-4">
      <div className="max-h-[400px] bg-slate-3 rounded-xl p-4 overflow-y-auto">
        <h2 className="font-semibold text-xl">Who to follow</h2>
        <div className="flex flex-col gap-y-5 mt-4">
          {isLoading
            ? Array(5)
                .fill(1)
                .map((_, i) => <UserItemLoading key={i} />)
            : data.map((user: any) => <UserItem {...user} key={user.id} />)}
        </div>
      </div>
    </div>
  );
};
export default Followbar;

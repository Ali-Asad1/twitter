"use client";

import useAllUsers from "@/hooks/useAllUsers";
import UserItem from "./UserItem";
import NotFoundFollowers from "./NotFoundFollowers";
import { PuffLoader } from "react-spinners";

const Followbar = () => {
  const { data, error, isLoading } = useAllUsers();
  return (
    <div className="px-6 py-4">
      <div className="max-h-[400px] bg-slate-3 rounded-xl p-4 overflow-y-auto">
        <div className="flex flex-col gap-y-5 ">
          {isLoading ? (
            <div className="w-full h-full flex justify-center items-center">
              <PuffLoader size={30} color="#0090ff" />
            </div>
          ) : !data?.length && error ? (
            <NotFoundFollowers />
          ) : (
            data.map((user: any) => <UserItem {...user} key={user.id} />)
          )}
        </div>
      </div>
    </div>
  );
};
export default Followbar;

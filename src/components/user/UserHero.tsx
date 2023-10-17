"use client";

import Image from "next/image";

import useUser from "@/hooks/useUser";

import Avatar from "./Avatar";
import EditBtn from "./EditBtn";
import { useEditProfileModal } from "@/hooks/useEditProfileModal";
import useCurrentUser from "@/hooks/useCurrentUser";

const UserHero = ({ username }: { username: string }) => {
  const { data: user, isLoading } = useUser(username);
  const { data: currentUser } = useCurrentUser();

  const { onOpen } = useEditProfileModal();
  return (
    <div className="relative">
      <div className="w-full aspect-w-3 aspect-h-1 bg-slate-3">
        {!isLoading && user?.coverImage && (
          <Image
            fill
            src={user?.coverImage as string}
            alt="banner"
            objectFit="cover"
            placeholder="blur"
            blurDataURL={user?.coverImage as string}
          />
        )}
      </div>
      {currentUser?.id === user?.id && (
        <div className="absolute z-10 right-2 bottom-2">
          <EditBtn onClick={() => null} />
        </div>
      )}

      <div className="absolute bottom-0 left-5 translate-y-[50%]">
        {currentUser?.id === user?.id && (
          <div className="absolute z-10 right-0 bottom-0">
            <EditBtn onClick={onOpen} />
          </div>
        )}
        <Avatar username={username} src={user?.profileImage} border="lg" size="lg" />
      </div>
    </div>
  );
};
export default UserHero;

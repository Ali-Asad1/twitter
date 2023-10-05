"use client";

import Image from "next/image";

import useUser from "@/hooks/useUser";
import Avatar from "./Avatar";

const UserHero = ({ username }: { username: string }) => {
  const { data, isLoading } = useUser(username);

  return (
    <div className="relative">
      <div className="w-full aspect-w-3 aspect-h-1 bg-slate-3">
        {!isLoading && data?.coverImage && (
          <Image
            fill
            src={data?.coverImage as string}
            alt="banner"
            objectFit="cover"
            placeholder="blur"
            blurDataURL={data?.coverImage as string}
          />
        )}
      </div>
      <Avatar
        username={username}
        border="lg"
        size="lg"
        className="absolute bottom-0 left-5 translate-y-[50%]"
      />
    </div>
  );
};
export default UserHero;

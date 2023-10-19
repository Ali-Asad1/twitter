"use client";

import { signOut, useSession } from "next-auth/react";

import { BiLogIn, BiLogOut } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { BsHouseFill, BsBellFill } from "react-icons/bs";

import SidebarLogo from "./SidebarLogo";
import SidebarItem from "./SidebarItem";
import TweetButton from "./TweetButton";
import SidebarLoadingItem from "./SidebarLoadingItem";
import useCurrentUser from "@/hooks/useCurrentUser";

export default function Sidebar() {
  const session = useSession();
  const { data: currentUser, isLoading } = useCurrentUser();

  const items = {
    authenticated: [
      {
        label: "Home",
        href: "/",
        icon: BsHouseFill,
      },
      {
        label: "Notifications",
        href: "/notifications",
        icon: BsBellFill,
      },
      {
        label: "Profile",
        href: `/user/${currentUser?.username || ""}`,
        icon: FaUser,
      },
    ],
    unauthenticate: [
      {
        label: "Login",
        href: "/login",
        icon: BiLogIn,
      },
      {
        label: "Create account",
        href: "/register",
        icon: FaUser,
      },
    ],
  };

  return (
    <div className="col-span-1 h-full pr-6 py-4">
      <div className="flex flex-col items-end lg:items-start space-y-5">
        <SidebarLogo />
        {session.status === "loading" && isLoading ? (
          Array(4)
            .fill(1)
            .map((_, i) => <SidebarLoadingItem key={i} />)
        ) : session.status === "authenticated" ? (
          <>
            {items.authenticated.map((item) => (
              <SidebarItem key={item.href} {...item} />
            ))}
            <SidebarItem label="Logout" icon={BiLogOut} onClick={() => signOut()} />
            <TweetButton />
          </>
        ) : (
          items.unauthenticate.map((item) => <SidebarItem key={item.href} {...item} />)
        )}
      </div>
    </div>
  );
}

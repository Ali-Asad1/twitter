import { BsHouseFill, BsBellFill } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import { FaUser } from "react-icons/fa";

import SidebarLogo from "./SidebarLogo";
import SidebarItem from "./SidebarItem";
import TweetButton from "./TweetButton";

export default function Sidebar() {
  const items = [
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
      href: "/users/test",
      icon: FaUser,
    },
  ];
  return (
    <div className="col-span-1 h-full pr-6 py-4">
      <div className="flex flex-col items-end lg:items-start">
        <div className="space-y-2">
          <SidebarLogo />
          {items.map((item) => (
            <SidebarItem key={item.href} {...item} />
          ))}
          <SidebarItem label="Logout" icon={BiLogOut} onClick={() => {}} />
          <TweetButton />
        </div>
      </div>
    </div>
  );
}

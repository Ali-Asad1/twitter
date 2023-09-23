import Link from "next/link";

import { BsTwitter } from "react-icons/bs";

export default function SidebarLogo() {
  return (
    <Link
      href="/"
      className="h-14 w-14 flex justify-center items-center rounded-full hover:bg-blue-4  cursor-pointer transition"
    >
      <BsTwitter size={28} className="fill-blue-10" />
    </Link>
  );
}

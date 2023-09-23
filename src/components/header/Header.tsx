"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";

import { BiArrowBack } from "react-icons/bi";

interface HeaderProps {
  lable: string;
  showBackArrow?: boolean;
}

const Header: React.FC<HeaderProps> = ({ lable, showBackArrow }) => {
  const { back } = useRouter();

  const handleBack = useCallback(() => {
    back();
  }, [back]);
  return (
    <div className="border-b border-b-slate-6 p-5">
      <div className="flex items-center gap-2">
        {showBackArrow && (
          <BiArrowBack
            size={24}
            className="cursor-pointer fill-slate-12 hover:fill-slate-11 transition"
            onClick={handleBack}
          />
        )}
        <h1 className="font-semibold text-xl">{lable}</h1>
      </div>
    </div>
  );
};
export default Header;

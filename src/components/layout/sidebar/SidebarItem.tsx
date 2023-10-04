"use client";
import Button from "@/components/common/Button";
import { useRouter } from "next/navigation";
import { IconType } from "react-icons/";

interface SidebarItemProps {
  label: string;
  href?: string;
  icon: IconType;
  onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ label, icon: Icon, href, onClick }) => {
  const { push } = useRouter();

  const clickHandler = () => {
    if (onClick) {
      onClick();
    } else if (href) {
      push(href);
    }
  };
  return (
    <>
      <Button
        onClick={() => clickHandler()}
        btnWidth="full"
        btnStyle="tertiary"
        className="hidden lg:flex justify-start gap-x-3 text-slate-12"
      >
        <Icon size={22} className="fill-slate-11" />
        {label}
      </Button>
      <Button
        onClick={() => clickHandler()}
        btnSize="lg"
        btnStyle="tertiary"
        btnType="iconOnly"
        className="flex lg:hidden"
      >
        <Icon size={22} className="fill-slate-11" />
      </Button>
    </>
  );
};

export default SidebarItem;

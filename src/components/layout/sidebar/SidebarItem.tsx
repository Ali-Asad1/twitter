import { IconType } from "react-icons/";

interface SidebarItemProps {
  label: string;
  href?: string;
  icon: IconType;
  onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ label, icon: Icon, href, onClick }) => {
  return (
    <div className="flex items-center select-none">
      <div className="relative h-14 w-14 flex items-center justify-center p-4 rounded-full hover:bg-slate-4 active:bg-slate-5 cursor-pointer lg:hidden transition">
        <Icon size={28} className="fill-slate-11" />
      </div>
      <div className="relative hidden w-full lg:flex items-center gap-4 p-4 rounded-full hover:bg-slate-4 active:bg-slate-5 cursor-pointer transition">
        <Icon size={24} className="fill-slate-11" />
        <p className="text-slate-12 text-xl">{label}</p>
      </div>
    </div>
  );
};

export default SidebarItem;

const SidebarLoadingItem = () => {
  return (
    <>
      <div className="hidden lg:flex w-full h-12 px-3 justify-start items-center gap-x-3 animate-pulse">
        <div className="w-5 h-5 bg-slate-6 rounded-full"></div>
        <div className="w-1/3 h-5 bg-slate-6 rounded-sm"></div>
      </div>

      <div className="flex lg:hidden w-14 h-14 justify-center items-center bg-slate-4 rounded-full animate-pulse">
        <div className="w-5 h-5 bg-slate-6 rounded-md"></div>
      </div>
    </>
  );
};
export default SidebarLoadingItem;

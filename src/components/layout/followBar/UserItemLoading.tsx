const UserItemLoading = () => {
  return (
    <div className="grid grid-cols-[auto_1fr] items-center gap-x-3 animate-pulse">
      <div className="w-12 h-12 bg-slate-4 rounded-full"></div>
      <div className="flex flex-col gap-y-2">
        <div className="max-w-[100px] min-w-0 w-full h-3 bg-slate-4"></div>
        <div className="max-w-[50px] min-w-0 w-full h-3 bg-slate-4"></div>
      </div>
    </div>
  );
};
export default UserItemLoading;

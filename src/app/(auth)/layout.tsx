export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-full h-full max-w-[560px] min-w-[300px] px-5">{children}</div>
    </div>
  );
}

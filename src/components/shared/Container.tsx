export default function Container({ children }: { children: React.ReactNode }) {
  return <div className="w-full h-full xl:container xl:mx-auto px-5 lg:px-10">{children}</div>;
}

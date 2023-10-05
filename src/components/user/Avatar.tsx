"use client";

import { cn } from "@/utils/clsx";
import { VariantProps, cva } from "class-variance-authority";
import Image from "next/image";
import { useRouter } from "next/navigation";

const avatarVariants = cva(
  "relative rounded-full border-slate-6 overflow-hidden hover:opacity-90 active:opacity-80 transition-all cursor-pointer",
  {
    variants: {
      size: {
        sm: "w-8 h-8",
        md: "w-12 h-12",
        lg: "w-24 h-24",
      },
      border: {
        none: "border-none",
        sm: "border-2",
        md: "border-3",
        lg: "border-4",
      },
    },
    defaultVariants: {
      size: "md",
      border: "none",
    },
  }
);

interface AvatarProps extends VariantProps<typeof avatarVariants> {
  username: string;
  src?: string;
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ username, border, size, src, className }) => {
  const { push } = useRouter();

  const imageSrc = src || "/images/placeholder.png";
  const clickHandler = () => {
    push(`/user/${username}`);
  };
  return (
    <div onClick={() => clickHandler()} className={cn(avatarVariants({ border, className, size }))}>
      <Image
        src={imageSrc}
        alt="avatar"
        placeholder="blur"
        blurDataURL={imageSrc}
        loading="lazy"
        fill
      />
    </div>
  );
};
export default Avatar;

"use client";

import { cn } from "@/utils/clsx";
import { VariantProps, cva } from "class-variance-authority";
import Image from "next/image";
import { useRouter } from "next/navigation";

const avatarVariants = cva("relative rounded-full border-slate-6 overflow-hidden transition-all", {
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
});

interface AvatarProps extends VariantProps<typeof avatarVariants> {
  username: string;
  src?: string;
  className?: string;
  clickAble?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ username, border, size, src, className, clickAble }) => {
  const { push } = useRouter();

  const imageSrc = src || "/images/placeholder.png";
  const clickHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();

    if (!clickAble) {
      return null;
    }
    push(`/user/${username}`);
  };

  return (
    <div
      onClick={(e) => clickHandler(e)}
      className={cn(
        avatarVariants({ border, className, size }),
        clickAble && "hover:opacity-90 active:opacity-80 cursor-pointer"
      )}
    >
      <Image
        src={imageSrc}
        fill
        sizes="50"
        objectFit="cover"
        quality={80}
        alt="avatar"
        placeholder="blur"
        blurDataURL={imageSrc}
        loading="lazy"
      />
    </div>
  );
};
export default Avatar;

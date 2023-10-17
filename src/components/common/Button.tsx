import { forwardRef } from "react";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/utils/clsx";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-xl text-base font-semibold focus-visible:outline-none ring-offset-background px-5 transition-colors select-none disabled:pointer-events-none disabled:opacity-80",
  {
    variants: {
      btnStyle: {
        primary:
          "px-8 bg-blue-9 hover:bg-blue-10 active:bg-blue-11 text-white hover:text-slate/80 active:text-slate/60",
        secondary:
          "bg-slate-3 hover:bg-slate-4 active:bg-slate-5 text-blue-11 hover:text-blue-11/80 active:text-blue-11/60",
        tertiary: "bg-transparent text-blue-11 hover:bg-blue-9/10 active:bg-blue-9/20",
        outline:
          "bg-transparent ring-1 ring-slate-6 hover:ring-slate-7 active:ring-slate-8 text-blue-11 hover:bg-slate-9/10 active:bg-slate-9/20",
      },
      btnType: {
        default: "",
        iconOnly: "rounded-full flex justify-center items-center",
        leftIcon: "ring-1 ring-slate-6 flex justify-center items-center",
        rightIcon: "ring-1 ring-slate-6 flex justify-center items-center",
      },
      btnSize: {
        sm: "h-10",
        md: "h-12",
        lg: "h-14",
      },
      btnWidth: {
        full: "w-full",
        fit: "w-fit",
      },
    },
    compoundVariants: [
      {
        btnType: "default",
        btnSize: "sm",
        className: "px-4",
      },
      {
        btnType: "default",
        btnSize: "md",
        className: "px-5",
      },
      {
        btnType: "default",
        btnSize: "lg",
        className: "px-6",
      },
      {
        btnType: "iconOnly",
        btnSize: "sm",
        className: "px-2",
      },
      {
        btnType: "iconOnly",
        btnSize: "md",
        className: "px-3",
      },
      {
        btnType: "iconOnly",
        btnSize: "lg",
        className: "px-4",
      },
      {
        btnType: "leftIcon",
        btnSize: "sm",
        className: "pl-2 pr-4 gap-1",
      },
      {
        btnType: "leftIcon",
        btnSize: "md",
        className: "pl-3 pr-5 gap-2",
      },
      {
        btnType: "leftIcon",
        btnSize: "lg",
        className: "pl-4 pr-6 gap-3",
      },
      {
        btnType: "rightIcon",
        btnSize: "sm",
        className: "pl-4 pr-2 gap-1",
      },
      {
        btnType: "rightIcon",
        btnSize: "md",
        className: "pl-5 pr-3 gap-2",
      },
      {
        btnType: "rightIcon",
        btnSize: "lg",
        className: "pl-6 pr-4 gap-3",
      },
    ],
    defaultVariants: {
      btnStyle: "primary",
      btnType: "default",
      btnSize: "md",
      btnWidth: "fit",
    },
  }
);
interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ btnSize, btnStyle, btnType, btnWidth, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ btnSize, btnStyle, btnType, btnWidth, className }))}
        {...props}
      />
    );
  }
);
export default Button;

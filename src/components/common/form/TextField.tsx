import { cn } from "@/utils/clsx";
import { useField } from "formik";
import { forwardRef } from "react";

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(({ label, ...props }, ref) => {
  const [field, meta] = useField(props.name as string);

  return (
    <div className="w-full relative">
      <input
        ref={ref}
        className={cn(
          "peer w-full h-16 px-3 pt-3 bg-transparent border border-slate-6 rounded-md focus:border-blue-9 outline-none",
          meta.touched && meta.error && "!border-red-9"
        )}
        {...field}
        {...props}
        autoComplete="off"
      />
      <label
        htmlFor=""
        className={cn(
          "absolute top-[20px] left-[12px] text-base text-slate-11 peer-focus:-translate-y-3 peer-focus:text-xs peer-focus:text-blue-9 transition-all select-none pointer-events-none",
          field.value.trim() && "-translate-y-3 text-xs",
          meta.touched && meta.error && "peer-focus:text-red-9",
          meta.error && field.value && "text-red-9"
        )}
      >
        {label}
      </label>
      {meta.touched && meta.error && (
        <p className="absolute bottom-0 left-[12px] translate-y-[calc(100%+2px)] text-sm text-red-9">
          {meta.error}
        </p>
      )}
    </div>
  );
});
export default TextField;

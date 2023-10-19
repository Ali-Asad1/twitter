import { cn } from "@/utils/clsx";
import { useField } from "formik";
import { forwardRef } from "react";

interface TextFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextFieldProps>(
  ({ label, className, ...props }, ref) => {
    const [field, meta] = useField(props.name as string);

    return (
      <div className="w-full relative">
        <textarea
          ref={ref}
          className={cn(
            "peer w-full h-24 px-3 pt-3 pb-2 bg-transparent border border-slate-6 rounded-md focus:border-blue-9 outline-none resize-none",
            className,
            meta.touched && meta.error && "!border-red-9"
          )}
          {...field}
          {...props}
          autoComplete="off"
        />
        {meta.touched && meta.error && (
          <p className="absolute bottom-0 left-[12px] translate-y-[calc(100%+2px)] text-sm text-red-9">
            {meta.error}
          </p>
        )}
      </div>
    );
  }
);
export default TextArea;

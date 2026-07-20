import { cn } from "@/utils/utility";
import * as React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-lg border bg-white px-3 py-2 text-sm text-zinc-950 ring-offset-white transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-400",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "[&::-webkit-search-cancel-button]:appearance-none",
          "[&::-webkit-search-decoration]:appearance-none",
          error
            ? "border-rose-500 focus-visible:ring-rose-500"
            : "border-zinc-200 focus-visible:ring-zinc-900",
          className,
        )}
        ref={ref}
        aria-invalid={error ? "true" : "false"}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };

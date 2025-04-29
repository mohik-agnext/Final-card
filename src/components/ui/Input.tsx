"use client";

import { cn } from "@/lib/utils";
import { forwardRef } from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="mb-2 block text-sm font-medium text-white/80">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            type={type}
            className={cn(
              "w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-black placeholder-gray-400",
              "shadow-sm transition-colors",
              "focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200",
              error && "border-red-500 focus:border-red-500 focus:ring-red-200",
              "!text-black",
              className
            )}
            style={{
              color: 'black !important',
              caretColor: 'black !important'
            }}
            ref={ref}
            {...props}
          />
        </div>
        {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input; 
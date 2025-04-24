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
              "w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/40",
              "shadow-sm backdrop-blur-sm transition-colors",
              "focus:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/20",
              error && "border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20",
              className
            )}
            style={{
              color: 'white',
              caretColor: 'white'
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
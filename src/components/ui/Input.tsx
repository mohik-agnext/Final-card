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
    // Check if className contains bg-white, if so we need to adjust styles
    const hasWhiteBackground = className?.includes('bg-white');
    const hasCustomInput = className?.includes('custom-input');
    
    // Determine text color based on background
    const textStyle = (hasWhiteBackground || hasCustomInput) 
      ? { color: '#333', caretColor: '#333' }
      : { color: 'white', caretColor: 'white' };
    
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
              "w-full rounded-lg border px-4 py-3 shadow-sm backdrop-blur-sm transition-colors",
              (hasWhiteBackground || hasCustomInput) 
                ? "border-gray-200 bg-white placeholder-gray-400 text-black"
                : "border-white/20 bg-white/10 text-white placeholder-white/40",
              "focus:outline-none focus:ring-2",
              (hasWhiteBackground || hasCustomInput)
                ? "focus:border-gray-300 focus:ring-gray-200"
                : "focus:border-white/30 focus:ring-white/20",
              error && "border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20",
              className
            )}
            style={textStyle}
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
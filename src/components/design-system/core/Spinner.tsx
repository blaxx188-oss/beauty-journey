"use client";

/**
 * Spinner — Loading indicator with size variants.
 */

import { cn } from "@/utils/cn";

export interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  color?: "current" | "accent" | "white";
  className?: string;
}

const sizeMap = {
  sm: "w-4 h-4 border-2",
  md: "w-5 h-5 border-2",
  lg: "w-8 h-8 border-3",
};

const colorMap = {
  current: "border-current/30 border-t-current",
  accent: "border-accent/30 border-t-accent",
  white: "border-white/30 border-t-white",
};

export default function Spinner({ size = "md", color = "current", className }: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label="جاري التحميل..."
      className={cn(
        "inline-block rounded-full animate-spin",
        sizeMap[size],
        colorMap[color],
        className
      )}
    >
      <span className="sr-only">جاري التحميل...</span>
    </span>
  );
}

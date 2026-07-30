"use client";

/**
 * Spinner — Loading spinner with Rose Gold color.
 */

import React from "react";
import { cn } from "@/utils/cn";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "w-4 h-4 border-2",
  md: "w-6 h-6 border-2",
  lg: "w-10 h-10 border-3",
};

export default function Spinner({ size = "md", className }: SpinnerProps) {
  return (
    <div
      className={cn(
        "border-accent/30 border-t-accent rounded-full animate-spin",
        sizeClasses[size],
        className
      )}
      role="status"
      aria-label="Loading"
    />
  );
}

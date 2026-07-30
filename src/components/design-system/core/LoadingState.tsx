"use client";

/**
 * LoadingState — Full-page or inline loading indicator with optional message.
 */

import { cn } from "@/utils/cn";
import Spinner from "./Spinner";

// ============================================
// TYPES
// ============================================

export interface LoadingStateProps {
  message?: string;
  size?: "sm" | "md" | "lg";
  fullPage?: boolean;
  className?: string;
}

// ============================================
// COMPONENT
// ============================================

function LoadingState({ message, size = "lg", fullPage = false, className }: LoadingStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4",
        fullPage ? "min-h-[60vh]" : "py-16",
        className
      )}
      role="status"
      aria-live="polite"
    >
      <Spinner size={size} color="accent" />
      {message && (
        <p className="text-sm text-text-secondary">{message}</p>
      )}
      <span className="sr-only">جاري التحميل...</span>
    </div>
  );
}

LoadingState.displayName = "LoadingState";

export { LoadingState };
export default LoadingState;

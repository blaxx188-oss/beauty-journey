"use client";

/**
 * ErrorState — Error display with icon, message, and retry action.
 */

import React from "react";
import { cn } from "@/utils/cn";
import { AlertCircle } from "lucide-react";

// ============================================
// TYPES
// ============================================

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

// ============================================
// COMPONENT
// ============================================

function ErrorState({
  title = "حدث خطأ",
  message = "عذرًا، حدث خطأ أثناء تحميل البيانات. يرجى المحاولة مرة أخرى.",
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-16 px-6 text-center",
        className
      )}
      role="alert"
    >
      {/* Icon */}
      <div className="w-16 h-16 flex items-center justify-center rounded-full bg-error/10 mb-4">
        <AlertCircle className="w-8 h-8 text-error" />
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-text-primary mb-2">{title}</h3>

      {/* Message */}
      <p className="text-sm text-text-secondary max-w-sm mb-6 leading-relaxed">
        {message}
      </p>

      {/* Retry Button */}
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="px-6 py-2.5 text-sm font-medium bg-accent text-white rounded-sm hover:bg-accent-hover transition-colors duration-150"
        >
          إعادة المحاولة
        </button>
      )}
    </div>
  );
}

ErrorState.displayName = "ErrorState";

export { ErrorState };
export default ErrorState;

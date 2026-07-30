"use client";

/**
 * Rating — Star rating display with count.
 */

import React from "react";
import { cn } from "@/utils/cn";
import { Star } from "lucide-react";

// ============================================
// TYPES
// ============================================

export interface RatingProps {
  value: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  showCount?: boolean;
  count?: number;
  interactive?: boolean;
  onValueChange?: (value: number) => void;
  className?: string;
}

// ============================================
// COMPONENT
// ============================================

function Rating({
  value,
  max = 5,
  size = "md",
  showCount = false,
  count = 0,
  interactive = false,
  onValueChange,
  className,
}: RatingProps) {
  const sizeClasses = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  const handleClick = (starValue: number) => {
    if (interactive && onValueChange) {
      onValueChange(starValue);
    }
  };

  return (
    <div className={cn("inline-flex items-center gap-1", className)}>
      {/* Stars */}
      <div className="flex items-center gap-0.5">
        {Array.from({ length: max }).map((_, index) => {
          const starValue = index + 1;
          const isFilled = value >= starValue;
          const isHalf = !isFilled && value >= starValue - 0.5;

          return (
            <button
              key={index}
              type="button"
              disabled={!interactive}
              onClick={() => handleClick(starValue)}
              className={cn(
                "flex items-center justify-center transition-colors duration-150",
                interactive ? "cursor-pointer hover:scale-110" : "cursor-default"
              )}
              aria-label={`${starValue} من ${max} نجوم`}
            >
              <Star
                className={cn(
                  sizeClasses[size],
                  isFilled
                    ? "text-warning fill-warning"
                    : isHalf
                    ? "text-warning fill-warning/50"
                    : "text-neutral-secondary fill-none"
                )}
              />
            </button>
          );
        })}
      </div>

      {/* Count */}
      {showCount && (
        <span className="text-xs text-text-secondary ms-1">
          ({count})
        </span>
      )}
    </div>
  );
}

Rating.displayName = "Rating";

export { Rating };
export default Rating;

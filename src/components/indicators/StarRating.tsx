"use client";

/**
 * StarRating — 5-star rating display.
 * Per spec: Rose Gold for filled stars.
 */

import React from "react";
import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  showCount?: boolean;
  count?: number;
}

export default function StarRating({
  rating,
  maxRating = 5,
  size = "md",
  showCount = false,
  count,
}: StarRatingProps) {
  const sizeClasses = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  const stars = Array.from({ length: maxRating }, (_, index) => {
    const isFilled = index < Math.floor(rating);
    const isHalf = index === Math.floor(rating) && rating % 1 !== 0;

    return (
      <span key={index} className="relative inline-block">
        <Star
          className={sizeClasses[size]}
          fill="none"
          strokeWidth={1.5}
          style={{ color: "var(--color-warm-taupe)" }}
        />
        <span
          className="absolute inset-0 overflow-hidden"
          style={{
            width: isHalf ? "50%" : isFilled ? "100%" : "0%",
          }}
        >
          <Star
            className={sizeClasses[size]}
            fill="var(--color-rose-gold)"
            stroke="var(--color-rose-gold)"
            strokeWidth={1.5}
          />
        </span>
      </span>
    );
  });

  return (
    <div className="flex items-center gap-1">
      <div className="flex gap-0.5">{stars}</div>
      {showCount && count !== undefined && (
        <span className="text-xs text-text-secondary mr-1">
          ({count})
        </span>
      )}
    </div>
  );
}

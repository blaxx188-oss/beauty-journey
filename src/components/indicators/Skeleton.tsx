/**
 * Skeleton — Shimmering Soft Pearl blocks for perceived performance.
 * Used for product cards, text blocks, and image placeholders.
 */

import React from "react";
import { cn } from "@/utils/cn";

interface SkeletonProps {
  className?: string;
  variant?: "rect" | "circle" | "text";
}

export default function Skeleton({
  className,
  variant = "rect",
}: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse bg-soft-pearl",
        variant === "circle" && "rounded-full",
        variant === "rect" && "rounded-sm",
        variant === "text" && "rounded-sm h-4",
        className
      )}
    />
  );
}

/**
 * ProductCardSkeleton — Placeholder for product card loading state.
 */
export function ProductCardSkeleton() {
  return (
    <div className="bg-soft-pearl rounded-sm overflow-hidden">
      <Skeleton className="aspect-[3/4] w-full" />
      <div className="p-4 space-y-3">
        <Skeleton className="w-2/3 h-3" />
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-1/2 h-4" />
      </div>
    </div>
  );
}

/**
 * TextSkeleton — Placeholder for text content loading state.
 */
export function TextSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn(
            "h-4",
            i === lines - 1 ? "w-3/4" : "w-full"
          )}
        />
      ))}
    </div>
  );
}

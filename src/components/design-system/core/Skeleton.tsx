"use client";

/**
 * Skeleton — Loading placeholder with pulse animation.
 */

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const skeletonVariants = cva(
  "bg-neutral-secondary animate-pulse rounded-sm",
  {
    variants: {
      shape: {
        rect: "",
        circle: "rounded-full",
        text: "h-4 rounded-sm",
      },
      size: {
        sm: "h-8 w-8",
        md: "h-12 w-12",
        lg: "h-16 w-16",
        full: "w-full",
      },
    },
    defaultVariants: {
      shape: "rect",
      size: "full",
    },
  }
);

export interface SkeletonProps extends VariantProps<typeof skeletonVariants> {
  className?: string;
  width?: string | number;
  height?: string | number;
}

function Skeleton({ shape, size, className, width, height }: SkeletonProps) {
  return (
    <div
      className={cn(skeletonVariants({ shape, size }), className)}
      style={{
        width: width !== undefined ? (typeof width === "number" ? `${width}px` : width) : undefined,
        height: height !== undefined ? (typeof height === "number" ? `${height}px` : height) : undefined,
      }}
      aria-busy="true"
      role="status"
    >
      <span className="sr-only">جاري التحميل...</span>
    </div>
  );
}

// ============================================
// COMPOSITE SKELETONS
// ============================================

export function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-sm bg-surface">
      <Skeleton height="280px" className="w-full !h-[280px]" />
      <div className="p-4 space-y-3">
        <Skeleton shape="text" className="!w-3/4" />
        <Skeleton shape="text" className="!w-1/2" />
      </div>
    </div>
  );
}

export function TextSkeleton({ lines = 3, className }: { lines?: number; className?: string }) {
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          shape="text"
          className={i === lines - 1 ? "!w-3/4" : "!w-full"}
        />
      ))}
    </div>
  );
}

Skeleton.displayName = "Skeleton";

export { Skeleton, skeletonVariants };
export default Skeleton;

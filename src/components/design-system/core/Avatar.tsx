"use client";

/**
 * Avatar — User avatar with image, initials fallback, and online status.
 */

import React, { useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

// ============================================
// VARIANTS
// ============================================

const avatarVariants = cva(
  "relative inline-flex items-center justify-center rounded-full overflow-hidden bg-neutral-secondary text-text-primary font-medium shrink-0",
  {
    variants: {
      size: {
        xs: "w-6 h-6 text-[10px]",
        sm: "w-8 h-8 text-xs",
        md: "w-10 h-10 text-sm",
        lg: "w-12 h-12 text-base",
        xl: "w-16 h-16 text-xl",
        "2xl": "w-20 h-20 text-2xl",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

// ============================================
// TYPES
// ============================================

export interface AvatarProps extends VariantProps<typeof avatarVariants> {
  src?: string;
  alt?: string;
  initials?: string;
  status?: "online" | "offline" | "away" | "busy";
  className?: string;
}

// ============================================
// COMPONENT
// ============================================

const statusColors: Record<string, string> = {
  online: "bg-success",
  offline: "bg-disabled",
  away: "bg-warning",
  busy: "bg-error",
};

function Avatar({
  size,
  src,
  alt = "",
  initials,
  status,
  className,
}: AvatarProps) {
  const [imgError, setImgError] = useState(false);

  // Generate initials from name if not provided
  const fallbackInitials = initials || (alt ? alt.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) : "?");

  return (
    <div className={cn(avatarVariants({ size }), className)} role="img" aria-label={alt || "صورة المستخدم"}>
      {src && !imgError ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          onError={() => setImgError(true)}
        />
      ) : (
        <span>{fallbackInitials}</span>
      )}

      {/* Status Indicator */}
      {status && (
        <span
          className={cn(
            "absolute bottom-0 start-0 w-3 h-3 rounded-full border-2 border-surface",
            statusColors[status],
            size === "xs" && "w-2 h-2 border",
            size === "sm" && "w-2.5 h-2.5 border",
          )}
          aria-label={`الحالة: ${status}`}
        />
      )}
    </div>
  );
}

Avatar.displayName = "Avatar";

export { Avatar, avatarVariants };
export default Avatar;

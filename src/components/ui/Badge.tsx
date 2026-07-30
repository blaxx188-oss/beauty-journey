/**
 * Badge — "New", "Sale", "Limited" elegant pill shapes.
 * Per spec: radius-full, 48px touch target on mobile.
 */

import React from "react";
import { cn } from "@/utils/cn";

type BadgeVariant = "new" | "sale" | "limited" | "stock" | "custom";

interface BadgeProps {
  variant: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const badgeStyles: Record<BadgeVariant, string> = {
  new: "bg-accent text-white",
  sale: "bg-error text-white",
  limited: "bg-warning text-white",
  stock: "bg-success text-white",
  custom: "bg-text-primary text-surface",
};

export default function Badge({ variant, children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 text-xs font-medium rounded-full min-h-[24px]",
        badgeStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

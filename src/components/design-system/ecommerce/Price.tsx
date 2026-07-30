"use client";

/**
 * Price — Formatted price display with original/discounted price, percentage badge.
 * Supports Arabic currency formatting (ج.م).
 */

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

// ============================================
// VARIANTS
// ============================================

const priceVariants = cva("", {
  variants: {
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg font-semibold",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

// ============================================
// TYPES
// ============================================

export interface PriceProps extends VariantProps<typeof priceVariants> {
  current: number;
  original?: number;
  currency?: string;
  showDiscount?: boolean;
  className?: string;
}

// ============================================
// HELPERS
// ============================================

function formatPrice(amount: number, currency: string = "ج.م"): string {
  return `${amount.toLocaleString("ar-EG")} ${currency}`;
}

function calculateDiscount(original: number, current: number): number {
  return Math.round(((original - current) / original) * 100);
}

// ============================================
// COMPONENT
// ============================================

function Price({
  size,
  current,
  original,
  currency = "ج.م",
  showDiscount = true,
  className,
}: PriceProps) {
  const discount = original ? calculateDiscount(original, current) : 0;
  const hasDiscount = original && original > current;

  return (
    <div className={cn("inline-flex items-baseline gap-2", className)}>
      {/* Current Price */}
      <span className={cn(priceVariants({ size }), "text-accent font-medium")}>
        {formatPrice(current, currency)}
      </span>

      {/* Original Price (strikethrough) */}
      {hasDiscount && (
        <span className="text-sm text-placeholder line-through">
          {formatPrice(original, currency)}
        </span>
      )}

      {/* Discount Badge */}
      {hasDiscount && showDiscount && discount > 0 && (
        <span className="text-[10px] font-medium text-error bg-error/10 px-1.5 py-0.5 rounded-sm">
          -{discount}%
        </span>
      )}
    </div>
  );
}

Price.displayName = "Price";

export { Price, priceVariants };
export default Price;

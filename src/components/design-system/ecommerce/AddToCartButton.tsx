"use client";

/**
 * AddToCartButton — Ecommerce add-to-cart button with loading state.
 */

import React from "react";
import { cn } from "@/utils/cn";
import { ShoppingBag } from "lucide-react";

// ============================================
// TYPES
// ============================================

export interface AddToCartButtonProps {
  onClick?: () => void | Promise<void>;
  isLoading?: boolean;
  disabled?: boolean;
  added?: boolean;
  fullWidth?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

// ============================================
// COMPONENT
// ============================================

function AddToCartButton({
  onClick,
  isLoading = false,
  disabled = false,
  added = false,
  fullWidth = false,
  size = "md",
  className,
}: AddToCartButtonProps) {
  const sizeClasses = {
    sm: "h-10 px-4 text-xs gap-1.5",
    md: "h-12 px-6 text-sm gap-2",
    lg: "h-14 px-8 text-base gap-2.5",
  };

  const handleClick = async () => {
    if (onClick) {
      const result = onClick();
      if (result instanceof Promise) {
        await result;
      }
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled || isLoading || added}
      className={cn(
        "inline-flex items-center justify-center font-medium rounded-sm transition-all duration-150",
        "focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        sizeClasses[size],
        added
          ? "bg-success text-white"
          : "bg-accent text-white hover:bg-accent-hover shadow-md hover:shadow-md",
        fullWidth && "w-full",
        className
      )}
      aria-label={added ? "تمت الإضافة إلى السلة" : "إضافة إلى السلة"}
    >
      {isLoading ? (
        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      ) : added ? (
        <>
          <span className="text-sm">تمت الإضافة</span>
        </>
      ) : (
        <>
          <ShoppingBag className="w-4 h-4" />
          <span>إضافة إلى السلة</span>
        </>
      )}
    </button>
  );
}

AddToCartButton.displayName = "AddToCartButton";

export { AddToCartButton };
export default AddToCartButton;

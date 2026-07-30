"use client";

/**
 * Chip — Interactive filter/tag chip with close button.
 * Variants: default, selected, removable
 */

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";
import { X } from "lucide-react";

// ============================================
// VARIANTS
// ============================================

const chipVariants = cva(
  "inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-full border transition-all duration-150 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-surface border-border text-text-primary hover:border-accent hover:text-accent",
        selected:
          "bg-accent border-accent text-white",
        outline:
          "bg-transparent border-border text-text-secondary hover:border-accent hover:text-accent",
      },
      size: {
        sm: "px-2 py-1 text-xs gap-1",
        md: "px-3 py-1.5 text-sm gap-1.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

// ============================================
// TYPES
// ============================================

export interface ChipProps extends VariantProps<typeof chipVariants> {
  children: React.ReactNode;
  onClose?: () => void;
  onClick?: () => void;
  selected?: boolean;
  className?: string;
}

// ============================================
// COMPONENT
// ============================================

function Chip({
  variant,
  size,
  children,
  onClose,
  onClick,
  selected = false,
  className,
}: ChipProps) {
  const effectiveVariant = selected ? "selected" : variant;

  return (
    <button
      type="button"
      role={onClose ? "button" : undefined}
      aria-pressed={selected}
      className={cn(
        chipVariants({ variant: effectiveVariant, size }),
        "focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2",
        className
      )}
      onClick={onClick}
    >
      <span>{children}</span>
      {onClose && (
        <span
          className="flex items-center justify-center p-0 rounded-full hover:bg-black/10 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          role="presentation"
        >
          <X className="w-3 h-3" />
        </span>
      )}
    </button>
  );
}

Chip.displayName = "Chip";

export { Chip, chipVariants };
export default Chip;

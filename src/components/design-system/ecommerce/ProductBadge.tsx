"use client";

/**
 * ProductBadge — Ecommerce-specific badge (New, Sale, Limited, Out of Stock).
 */

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const productBadgeVariants = cva(
  "inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-sm transition-colors duration-150",
  {
    variants: {
      variant: {
        new: "bg-accent text-white",
        sale: "bg-error text-white",
        limited: "bg-warning text-midnight-onyx",
        stock: "bg-success text-white",
        soldOut: "bg-disabled text-text-primary",
      },
    },
    defaultVariants: {
      variant: "new",
    },
  }
);

export interface ProductBadgeProps extends VariantProps<typeof productBadgeVariants> {
  children?: React.ReactNode;
  discount?: number;
  className?: string;
}

function ProductBadge({ variant, children, discount, className }: ProductBadgeProps) {
  const label = children || (() => {
    switch (variant) {
      case "new": return "جديد";
      case "sale": return discount ? `خصم ${discount}%` : "تخفيض";
      case "limited": return "كمية محدودة";
      case "stock": return "متوفر";
      case "soldOut": return "نفد";
      default: return "";
    }
  })();

  return (
    <span className={cn(productBadgeVariants({ variant }), className)}>
      {label}
    </span>
  );
}

ProductBadge.displayName = "ProductBadge";

export { ProductBadge, productBadgeVariants };
export default ProductBadge;

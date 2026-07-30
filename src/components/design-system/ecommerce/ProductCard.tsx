"use client";

/**
 * ProductCard — Ecommerce product card with image, badge, title, price, rating, and actions.
 * Reusable component decoupled from stores (no direct Zustand coupling).
 */

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import { Heart, ShoppingBag } from "lucide-react";

// ============================================
// TYPES
// ============================================

export interface ProductCardProps {
  id: string;
  title: string;
  slug: string;
  imageUrl: string;
  price: number;
  originalPrice?: number;
  currency?: string;
  rating?: number;
  reviewCount?: number;
  badge?: "new" | "sale" | "limited" | "soldOut";
  discount?: number;
  onWishlistToggle?: (id: string) => void;
  onAddToCart?: (id: string) => void;
  isWishlisted?: boolean;
  className?: string;
}

// ============================================
// COMPONENT
// ============================================

function ProductCard({
  id,
  title,
  slug,
  imageUrl,
  price,
  originalPrice,
  currency = "ج.م",
  rating,
  reviewCount = 0,
  badge,
  discount,
  onWishlistToggle,
  onAddToCart,
  isWishlisted = false,
  className,
}: ProductCardProps) {
  return (
    <Link href={`/products/${slug}`} className="group block">
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.15 }}
        className={cn(
          "relative overflow-hidden rounded-sm bg-surface shadow-sm hover:shadow-md transition-shadow duration-300",
          className
        )}
      >
        {/* Image Area (70% of card height) */}
        <div className="relative aspect-[3/4] overflow-hidden bg-neutral-secondary">
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />

          {/* Badge */}
          {badge && (
            <span
              className={cn(
                "absolute top-3 start-3 px-2.5 py-1 text-xs font-medium rounded-sm z-10",
                badge === "new" && "bg-accent text-white",
                badge === "sale" && "bg-error text-white",
                badge === "limited" && "bg-warning text-midnight-onyx",
                badge === "soldOut" && "bg-disabled text-text-primary"
              )}
            >
              {badge === "new" && "جديد"}
              {badge === "sale" && `خصم ${discount}%`}
              {badge === "limited" && "كمية محدودة"}
              {badge === "soldOut" && "نفد"}
            </span>
          )}

          {/* Quick Actions Overlay */}
          <div className="absolute inset-x-0 bottom-0 p-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {/* Wishlist */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                onWishlistToggle?.(id);
              }}
              className={cn(
                "w-10 h-10 flex items-center justify-center rounded-full bg-surface shadow-md transition-colors duration-150",
                isWishlisted ? "text-accent" : "text-text-primary hover:text-accent"
              )}
              aria-label={isWishlisted ? "إزالة من المفضلة" : "إضافة إلى المفضلة"}
            >
              <Heart className={cn("w-4 h-4", isWishlisted && "fill-accent")} />
            </button>

            {/* Add to Cart */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                onAddToCart?.(id);
              }}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-accent text-white shadow-md hover:bg-accent-hover transition-colors duration-150"
              aria-label="إضافة إلى السلة"
            >
              <ShoppingBag className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-4">
          {/* Title */}
          <h3 className="text-sm font-medium text-text-primary line-clamp-2 leading-snug mb-2">
            {title}
          </h3>

          {/* Rating */}
          {rating !== undefined && (
            <div className="flex items-center gap-1 mb-2">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={cn(
                      "w-3 h-3",
                      i < Math.floor(rating) ? "text-warning" : "text-neutral-secondary"
                    )}
                  >
                    ★
                  </span>
                ))}
              </div>
              {reviewCount > 0 && (
                <span className="text-xs text-text-secondary">({reviewCount})</span>
              )}
            </div>
          )}

          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-semibold text-accent">
              {price.toLocaleString("ar-EG")} {currency}
            </span>
            {originalPrice && originalPrice > price && (
              <span className="text-xs text-placeholder line-through">
                {originalPrice.toLocaleString("ar-EG")} {currency}
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

ProductCard.displayName = "ProductCard";

export { ProductCard };
export default ProductCard;

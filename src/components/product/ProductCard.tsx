"use client";

/**
 * ProductCard — 70% image area, vertical layout, zoom on hover.
 * Per spec: Soft Pearl background, Tajawal font for title, Amiri for price.
 */

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ShoppingBag } from "lucide-react";
import { cn } from "@/utils/cn";
import { useWishlistStore } from "@/stores/wishlist-store";
import { useCartStore } from "@/stores/cart-store";

// ============================================
// TYPES
// ============================================

interface ProductCardProps {
  id: string;
  title: string;
  slug: string;
  imageUrl: string;
  price: number;
  currency: string;
  originalPrice?: number;
  brandName?: string;
  badge?: "new" | "sale" | "limited";
  isInStock?: boolean;
}

// ============================================
// COMPONENT
// ============================================

export default function ProductCard({
  id,
  title,
  slug,
  imageUrl,
  price,
  currency,
  originalPrice,
  brandName,
  badge,
  isInStock = true,
}: ProductCardProps) {
  const { addItem: addToWishlist, isInWishlist } = useWishlistStore();
  const { addItem: addToCart, openCart } = useCartStore();
  const isWishlisted = isInWishlist(id);

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToWishlist({
      productId: id,
      title,
      slug,
      imageUrl,
      price,
      currency,
      isInStock,
      addedAt: new Date().toISOString(),
    });
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      productId: id,
      id: `${id}-${Date.now()}`,
      title,
      slug,
      imageUrl,
      price,
      currency,
      maxQuantity: 10,
    });
    openCart();
  };

  return (
    <Link href={`/products/${slug}`} className="group block">
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.15 }}
        className="relative bg-soft-pearl rounded-sm overflow-hidden"
      >
        {/* Image Area (70%) */}
        <div className="relative aspect-[3/4] overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) 45vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Overlay Actions */}
          <div className="absolute inset-0 bg-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
            <button
              onClick={handleQuickAdd}
              className="w-12 h-12 bg-surface rounded-full flex items-center justify-center shadow-md hover:bg-accent hover:text-white transition-colors duration-150"
              aria-label="إضافة إلى السلة"
            >
              <ShoppingBag className="w-5 h-5" />
            </button>
            <button
              onClick={handleAddToWishlist}
              className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center shadow-md transition-colors duration-150",
                isWishlisted
                  ? "bg-accent text-white"
                  : "bg-surface hover:bg-accent hover:text-white"
              )}
              aria-label={isWishlisted ? "إزالة من المفضلة" : "إضافة إلى المفضلة"}
            >
              <Heart className="w-5 h-5" fill={isWishlisted ? "currentColor" : "none"} />
            </button>
          </div>

          {/* Badge */}
          {badge && (
            <span
              className={cn(
                "absolute top-3 right-3 px-3 py-1 text-xs font-medium rounded-full",
                badge === "new" && "bg-accent text-white",
                badge === "sale" && "bg-error text-white",
                badge === "limited" && "bg-warning text-white"
              )}
            >
              {badge === "new" ? "جديد" : badge === "sale" ? "تخفيض" : "محدود"}
            </span>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4 space-y-2">
          {brandName && (
            <p className="text-xs text-text-secondary">{brandName}</p>
          )}
          <h3 className="text-sm font-medium text-text-primary line-clamp-1" style={{ fontFamily: "var(--font-body-ar)" }}>
            {title}
          </h3>
          <div className="flex items-center gap-2">
            <span
              className="text-base font-bold text-accent"
              style={{ fontFamily: "var(--font-heading-ar)" }}
            >
              {price} {currency}
            </span>
            {originalPrice && originalPrice > price && (
              <span className="text-sm text-text-secondary line-through">
                {originalPrice} {currency}
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

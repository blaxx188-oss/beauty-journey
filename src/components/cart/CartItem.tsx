"use client";

/**
 * CartItem — Individual cart item row with quantity controls,
 * price display, and remove/save-for-later actions.
 * Reuses the existing QuantitySelector from the Design System.
 */

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { X, Heart } from "lucide-react";
import Image from "next/image";
import { useCartStore } from "@/stores/cart-store";
import { QuantitySelector } from "@/components/design-system/ecommerce/QuantitySelector";
import { formatPrice } from "@/utils/format";
import type { CartItem as CartItemType } from "@/types";

// ============================================
// TYPES
// ============================================

interface CartItemProps {
  item: CartItemType;
  showSaveForLater?: boolean;
}

// ============================================
// COMPONENT
// ============================================

export default function CartItemComponent({
  item,
  showSaveForLater = true,
}: CartItemProps) {
  const {
    removeItem,
    updateQuantity,
    moveToSaved,
  } = useCartStore();

  const lineTotal = item.price * item.quantity;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="flex gap-4 py-4 border-b border-border last:border-b-0"
      role="listitem"
    >
      {/* Product Image */}
      <div className="relative w-20 h-24 flex-shrink-0 overflow-hidden rounded-sm bg-neutral-secondary">
        <Image
          src={item.imageUrl}
          alt={item.title}
          fill
          sizes="80px"
          className="object-cover"
        />
      </div>

      {/* Product Info */}
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        {/* Top Row: Title & Remove */}
        <div className="flex items-start justify-between gap-2">
          <Link
            href={`/products/${item.slug}`}
            className="text-sm font-medium text-text-primary hover:text-accent transition-colors line-clamp-2 leading-relaxed"
          >
            {item.title}
          </Link>
          <button
            onClick={() => removeItem(item.productId)}
            className="p-1 text-text-secondary hover:text-error transition-colors duration-150 flex-shrink-0"
            aria-label={`إزالة ${item.title} من السلة`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Middle Row: Quantity & Price */}
        <div className="flex items-center justify-between mt-3">
          {/* Quantity Selector */}
          <QuantitySelector
            value={item.quantity}
            min={1}
            max={item.maxQuantity}
            size="sm"
            onChange={(newQty) => updateQuantity(item.productId, newQty)}
          />

          {/* Price */}
          <div className="text-sm font-semibold text-text-primary">
            {formatPrice(lineTotal, item.currency)}
          </div>
        </div>

        {/* Bottom Row: Save for Later */}
        {showSaveForLater && (
          <button
            onClick={() => moveToSaved(item.productId)}
            className="flex items-center gap-1.5 mt-2 text-xs text-text-secondary hover:text-accent transition-colors duration-150"
            aria-label={`حفظ ${item.title} للمُشتريات لاحقًا`}
          >
            <Heart className="w-3.5 h-3.5" />
            <span>حفظ للمُشتريات لاحقًا</span>
          </button>
        )}
      </div>
    </motion.div>
  );
}

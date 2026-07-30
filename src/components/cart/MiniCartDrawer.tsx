"use client";

/**
 * MiniCartDrawer — Slide-in drawer for quick cart review.
 * Reuses existing Design System Drawer component.
 */

import React from "react";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import { Drawer } from "@/components/design-system/core/Drawer";
import { useCartStore } from "@/stores/cart-store";
import CartItemComponent from "./CartItem";
import OrderSummary from "./OrderSummary";

export default function MiniCartDrawer() {
  const {
    isOpen,
    closeCart,
    items,
  } = useCartStore();

  return (
    <Drawer
      open={isOpen}
      onClose={closeCart}
      title="سلة التسوق"
      size="sm"
      side="start"
    >
      {/* Cart Items */}
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-20 h-20 flex items-center justify-center rounded-full bg-neutral-secondary mb-4">
            <svg
              className="w-10 h-10 text-text-secondary/60"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-text-primary mb-2">
            سلة التسوق فارغة
          </h3>
          <p className="text-sm text-text-secondary max-w-xs leading-relaxed">
            اكتشفي منتجاتنا وأضيفيها إلى سلتك لتستمتعي بأفضل تجربة تسوق
          </p>
          <Link
            href="/products"
            onClick={closeCart}
            className="mt-6 px-6 py-3 text-sm font-medium bg-accent text-white rounded-sm hover:bg-accent-hover transition-colors duration-150"
          >
            تصفحي المنتجات
          </Link>
        </div>
      ) : (
        <div className="flex flex-col min-h-[calc(100%-4rem)]">
          {/* Items List */}
          <div className="flex-1 space-y-4 overflow-y-auto">
            <AnimatePresence mode="popLayout">
              {items.map((item) => (
                <CartItemComponent key={item.productId} item={item} />
              ))}
            </AnimatePresence>
          </div>

          {/* Cart Footer */}
          <div className="sticky bottom-0 bg-surface border-t border-border pt-4 space-y-4">
            {/* Order Summary */}
            <OrderSummary compact />

            {/* Checkout Button */}
            <div className="space-y-3">
              <Link
                href="/cart"
                onClick={closeCart}
                className="block w-full py-3 text-center text-sm font-medium bg-accent text-white rounded-sm hover:bg-accent-hover transition-colors duration-150"
              >
                إتمام الشراء
              </Link>
              <button
                onClick={closeCart}
                className="block w-full py-3 text-center text-sm font-medium text-text-primary border border-border rounded-sm hover:bg-neutral-secondary transition-colors duration-150"
              >
                متابعة التسوق
              </button>
            </div>
          </div>
        </div>
      )}
    </Drawer>
  );
}

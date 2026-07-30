"use client";

/**
 * CartDrawer — Slide-in drawer from the right (RTL) for cart review.
 * Glassmorphism backdrop per design spec.
 */

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useCartStore } from "@/stores/cart-store";

export default function CartDrawer() {
  const { isOpen, closeCart, items, getSubtotal, getTotal: _getTotal } = useCartStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-[40] bg-[rgba(10,10,10,0.4)]"
            onClick={closeCart}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: [0.25, 0.8, 0.5, 1] }}
            className="fixed top-0 left-0 rtl:right-0 rtl:left-auto w-full max-w-[420px] h-full z-[50] bg-surface shadow-lg overflow-y-auto"
            role="dialog"
            aria-label="Shopping cart"
            aria-modal="true"
          >
            {/* Drawer Header */}
            <div className="sticky top-0 z-10 bg-surface border-b border-border px-6 py-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-text-primary">
                سلة التسوق
              </h2>
              <button
                onClick={closeCart}
                className="p-2 hover:bg-neutral-secondary rounded-sm transition-colors duration-150"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Content */}
            <div className="px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <p className="text-text-secondary text-base">
                    سلة التسوق فارغة
                  </p>
                  <p className="text-text-secondary/70 text-sm mt-2">
                    اكتشفي منتجاتنا وأضيفيها إلى سلتك
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.productId}
                      className="flex gap-4 py-4 border-b border-border last:border-0"
                    >
                      {/* Product Image Placeholder */}
                      <div className="w-20 h-20 bg-neutral-secondary rounded-sm flex-shrink-0" />
                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-text-primary truncate">
                          {item.title}
                        </h4>
                        <p className="text-sm text-text-secondary mt-1">
                          {item.price} {item.currency}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <button className="w-7 h-7 border border-border rounded-sm flex items-center justify-center text-sm hover:border-accent transition-colors">
                            -
                          </button>
                          <span className="text-sm font-medium min-w-[20px] text-center">
                            {item.quantity}
                          </span>
                          <button className="w-7 h-7 border border-border rounded-sm flex items-center justify-center text-sm hover:border-accent transition-colors">
                            +
                          </button>
                        </div>
                      </div>
                      {/* Remove Button */}
                      <button
                        className="text-text-secondary hover:text-error transition-colors self-start"
                        aria-label={`Remove ${item.title}`}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Drawer Footer */}
            {items.length > 0 && (
              <div className="sticky bottom-0 bg-surface border-t border-border px-6 py-4 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">المجموع الفرعي</span>
                  <span className="font-semibold text-text-primary">
                    {getSubtotal()} ج.م
                  </span>
                </div>
                <button className="w-full py-3 bg-accent text-white text-sm font-medium rounded-sm hover:bg-accent-hover transition-colors duration-150">
                  إتمام الشراء
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

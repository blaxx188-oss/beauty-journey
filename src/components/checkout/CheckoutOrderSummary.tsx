"use client";

/**
 * CheckoutOrderSummary — Order totals display for the checkout sidebar.
 * Shows items, subtotal, coupon, shipping, tax, and grand total.
 * Arabic RTL, mobile-first, responsive, accessible.
 */

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag, Tag, Truck, Receipt, Banknote } from "lucide-react";
import type { CartItem, OrderTotals, AppliedCoupon, ShippingAddress } from "@/types";
import { useCheckoutStore } from "@/stores/checkout-store";

// ============================================
// TYPES
// ============================================

interface CheckoutOrderSummaryProps {
  items: CartItem[];
  totals: OrderTotals;
  coupon: AppliedCoupon | null;
  shippingAddress: ShippingAddress | null;
}

// ============================================
// COMPONENT
// ============================================

export default function CheckoutOrderSummary({
  items,
  totals,
  coupon,
  shippingAddress,
}: CheckoutOrderSummaryProps) {
  const deliveryInfo = useCheckoutStore((state) => state.deliveryInfo);
  const paymentInfo = useCheckoutStore((state) => state.paymentInfo);

  return (
    <div className="bg-surface border border-border rounded-sm p-6 space-y-6 lg:sticky lg:top-24">
      {/* Title */}
      <h2 className="text-base font-semibold text-text-primary" style={{ fontFamily: "var(--font-heading-ar)" }}>
        ملخص الطلب
      </h2>

      {/* Items Summary */}
      <div className="space-y-3 max-h-60 overflow-y-auto">
        {items.map((item) => (
          <div key={item.productId} className="flex items-center gap-3">
            {/* Thumbnail */}
            <div className="relative w-12 h-12 flex-shrink-0 overflow-hidden rounded-sm bg-neutral-secondary">
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                sizes="48px"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-text-primary line-clamp-1">
                {item.title}
              </p>
              <p className="text-xs text-text-secondary">
                {item.quantity} × {item.price} ج.م
              </p>
            </div>

            {/* Price */}
            <p className="text-xs font-semibold text-text-primary flex-shrink-0">
              {(item.price * item.quantity).toFixed(0)} ج.م
            </p>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="space-y-3 pt-4 border-t border-border">
        {/* Subtotal */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-text-secondary">المجموع الفرعي</span>
          <span className="text-sm font-medium text-text-primary">
            {totals.subtotal.toFixed(0)} ج.م
          </span>
        </div>

        {/* Coupon Discount */}
        <AnimatePresence>
          {coupon && totals.discount > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-center justify-between"
            >
              <span className="flex items-center gap-1.5 text-sm text-success">
                <Tag className="w-3.5 h-3.5" />
                <span>خصم ({coupon.code})</span>
              </span>
              <span className="text-sm font-medium text-success">
                -{totals.discount.toFixed(0)} ج.م
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Shipping */}
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-sm text-text-secondary">
            <Truck className="w-3.5 h-3.5" />
            الشحن
          </span>
          <span
            className={`text-sm font-medium ${
              totals.shipping === 0 ? "text-success" : "text-text-primary"
            }`}
          >
            {totals.shipping === 0 ? "مجاناً" : `${totals.shipping.toFixed(0)} ج.م`}
          </span>
        </div>

        {/* Tax */}
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-sm text-text-secondary">
            <Receipt className="w-3.5 h-3.5" />
            الضريبة (14%)
          </span>
          <span className="text-sm font-medium text-text-primary">
            {totals.tax.toFixed(0)} ج.م
          </span>
        </div>

        {/* COD Fee */}
        {paymentInfo.method === "cod" && (
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-sm text-text-secondary">
              <Banknote className="w-3.5 h-3.5" />
              رسوم الدفع عند الاستلام
            </span>
            <span className="text-sm font-medium text-text-primary">
              25 ج.م
            </span>
          </div>
        )}

        {/* Divider */}
        <div className="border-t border-border" />

        {/* Grand Total */}
        <div className="flex items-center justify-between">
          <span className="text-base font-semibold text-text-primary">
            الإجمالي
          </span>
          <span className="text-lg font-bold text-accent">
            {totals.grandTotal.toFixed(0)} ج.م
          </span>
        </div>
      </div>

      {/* Shipping Address Preview */}
      {shippingAddress && (
        <div className="pt-4 border-t border-border">
          <p className="text-xs font-medium text-text-secondary mb-1">
            عنوان الشحن:
          </p>
          <p className="text-xs text-text-primary line-clamp-2">
            {shippingAddress.fullName} — {shippingAddress.street}،{" "}
            {shippingAddress.area}، {shippingAddress.city}،{" "}
            {shippingAddress.governorate}
          </p>
          <p className="text-xs text-text-secondary mt-1">
            {shippingAddress.phoneNumber}
          </p>
        </div>
      )}

      {/* Return to cart link */}
      <Link
        href="/cart"
        className="block text-center text-xs text-text-secondary hover:text-accent transition-colors"
      >
        العودة إلى سلة التسوق
      </Link>
    </div>
  );
}

"use client";

/**
 * OrderSummary — Displays subtotal, discount, shipping, tax, and total.
 * Reuses existing Design System Divider component.
 */

import React from "react";
import { Divider } from "@/components/design-system/core/Divider";
import { useCartStore } from "@/stores/cart-store";
import { formatPrice } from "@/utils/format";

// ============================================
// TYPES
// ============================================

interface OrderSummaryProps {
  compact?: boolean;
}

// ============================================
// COMPONENT
// ============================================

export default function OrderSummary({ compact = false }: OrderSummaryProps) {
  const {
    getSubtotal,
    getDiscountAmount,
    getShippingCost,
    getEstimatedTax,
    getTotal,
    couponCode,
  } = useCartStore();

  const subtotal = getSubtotal();
  const discount = getDiscountAmount();
  const shipping = getShippingCost();
  const tax = getEstimatedTax();
  const total = getTotal();

  const hasDiscount = discount > 0;

  if (compact) {
    return (
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-text-secondary">المجموع الفرعي</span>
          <span className="font-medium text-text-primary">
            {formatPrice(subtotal)}
          </span>
        </div>
        {hasDiscount && (
          <div className="flex justify-between text-sm">
            <span className="text-text-secondary">الخصم</span>
            <span className="font-medium text-success">
              - {formatPrice(discount)}
            </span>
          </div>
        )}
        <div className="flex justify-between text-sm">
          <span className="text-text-secondary">الشحن</span>
          <span className="font-medium text-text-primary">
            {shipping === 0 ? (
              <span className="text-success">مجاني</span>
            ) : (
              formatPrice(shipping)
            )}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-text-secondary">الضريبة (14%)</span>
          <span className="font-medium text-text-primary">
            {formatPrice(tax)}
          </span>
        </div>
        <Divider />
        <div className="flex justify-between">
          <span className="text-base font-bold text-text-primary">المجموع</span>
          <span className="text-base font-bold text-accent">
            {formatPrice(total)}
          </span>
        </div>
      </div>
    );
  }

  // Full order summary for cart page
  return (
    <div className="space-y-4">
      {/* Subtotal */}
      <div className="flex justify-between items-center py-1">
        <span className="text-sm text-text-secondary">المجموع الفرعي</span>
        <span className="text-sm font-medium text-text-primary">
          {formatPrice(subtotal)}
        </span>
      </div>

      {/* Discount */}
      {hasDiscount && (
        <div className="flex justify-between items-center py-1">
          <span className="text-sm text-text-secondary">
            الخصم
            {couponCode && (
              <span className="text-xs text-success mr-1">
                ({couponCode})
              </span>
            )}
          </span>
          <span className="text-sm font-medium text-success">
            - {formatPrice(discount)}
          </span>
        </div>
      )}

      {/* Shipping */}
      <div className="flex justify-between items-center py-1">
        <span className="text-sm text-text-secondary">الشحن</span>
        <span className="text-sm font-medium">
          {shipping === 0 ? (
            <span className="text-success">مجاني</span>
          ) : (
            <span className="text-text-primary">{formatPrice(shipping)}</span>
          )}
        </span>
      </div>

      {/* Tax */}
      <div className="flex justify-between items-center py-1">
        <span className="text-sm text-text-secondary">
          الضريبة المُضافة (14%)
        </span>
        <span className="text-sm font-medium text-text-primary">
          {formatPrice(tax)}
        </span>
      </div>

      <Divider />

      {/* Total */}
      <div className="flex justify-between items-center pt-2">
        <span className="text-base font-bold text-text-primary">المجموع</span>
        <div className="text-left">
          <span className="text-xl font-bold text-accent">
            {formatPrice(total)}
          </span>
        </div>
      </div>
    </div>
  );
}

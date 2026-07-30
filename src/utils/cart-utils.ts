/**
 * Cart Utilities — Price calculation helpers and cart-specific utilities.
 */

import type { CartItem } from "@/types";
import {
  FREE_SHIPPING_THRESHOLD,
  SHIPPING_COST,
  FREE_SHIPPING_COST,
  TAX_RATE,
  MAX_QUANTITY,
} from "@/stores/cart-store";

// ============================================
// PRICE CALCULATION HELPERS
// ============================================

/**
 * Calculate the line item total (price × quantity).
 */
export function calculateLineTotal(item: CartItem): number {
  return item.price * item.quantity;
}

/**
 * Calculate the cart subtotal (sum of all line items).
 */
export function calculateSubtotal(items: CartItem[]): number {
  return items.reduce((total, item) => total + calculateLineTotal(item), 0);
}

/**
 * Calculate discount amount based on coupon type and value.
 */
export function calculateDiscount(
  subtotal: number,
  couponDiscount: number,
  couponType: "percentage" | "fixed" | null,
  isCouponValid: boolean
): number {
  if (!isCouponValid || !couponType) return 0;

  if (couponType === "percentage") {
    return (subtotal * couponDiscount) / 100;
  }

  return Math.min(couponDiscount, subtotal);
}

/**
 * Calculate shipping cost based on subtotal and threshold.
 */
export function calculateShipping(subtotal: number): number {
  return subtotal >= FREE_SHIPPING_THRESHOLD ? FREE_SHIPPING_COST : SHIPPING_COST;
}

/**
 * Calculate estimated tax (VAT) on the discounted subtotal.
 */
export function calculateTax(afterDiscount: number): number {
  return Math.round(afterDiscount * TAX_RATE);
}

/**
 * Calculate the grand total including discount, shipping, and tax.
 */
export function calculateGrandTotal(
  items: CartItem[],
  couponDiscount: number,
  couponType: "percentage" | "fixed" | null,
  isCouponValid: boolean
): {
  subtotal: number;
  discount: number;
  afterDiscount: number;
  shipping: number;
  tax: number;
  grandTotal: number;
} {
  const subtotal = calculateSubtotal(items);
  const discount = calculateDiscount(subtotal, couponDiscount, couponType, isCouponValid);
  const afterDiscount = Math.max(0, subtotal - discount);
  const shipping = calculateShipping(afterDiscount);
  const tax = calculateTax(afterDiscount);
  const grandTotal = afterDiscount + shipping + tax;

  return {
    subtotal,
    discount,
    afterDiscount,
    shipping,
    tax,
    grandTotal,
  };
}

// ============================================
// QUANTITY VALIDATION
// ============================================

/**
 * Validate quantity is within allowed range.
 */
export function isValidQuantity(quantity: number): boolean {
  return quantity >= 1 && quantity <= MAX_QUANTITY;
}

/**
 * Clamp quantity to valid range.
 */
export function clampQuantity(quantity: number): number {
  return Math.max(1, Math.min(quantity, MAX_QUANTITY));
}

/**
 * Get available quantity for a product (stock validation).
 */
export function getAvailableQuantity(
  item: CartItem,
  availableStock?: number
): number {
  return Math.min(item.maxQuantity, availableStock ?? item.maxQuantity);
}

// ============================================
// FREE SHIPPING HELPERS
// ============================================

/**
 * Calculate remaining amount needed for free shipping.
 */
export function getFreeShippingRemaining(subtotal: number): number {
  return Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
}

/**
 * Calculate progress percentage toward free shipping.
 */
export function getFreeShippingProgress(subtotal: number): number {
  return Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
}

/**
 * Check if cart qualifies for free shipping.
 */
export function isFreeShippingEligible(subtotal: number): boolean {
  return subtotal >= FREE_SHIPPING_THRESHOLD;
}

// ============================================
// CART ITEM HELPERS
// ============================================

/**
 * Check if an item exists in the cart.
 */
export function isItemInCart(items: CartItem[], productId: string): boolean {
  return items.some((item) => item.productId === productId);
}

/**
 * Get a specific item from the cart by product ID.
 */
export function getCartItem(items: CartItem[], productId: string): CartItem | undefined {
  return items.find((item) => item.productId === productId);
}

/**
 * Count total items in the cart (sum of quantities).
 */
export function countTotalItems(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.quantity, 0);
}

// ============================================
// FORMATTING HELPERS
// ============================================

/**
 * Format the free shipping remaining amount as a message.
 */
export function formatFreeShippingMessage(subtotal: number): string {
  const remaining = getFreeShippingRemaining(subtotal);
  if (remaining <= 0) return "🎉 حصلتِ على شحن مجاني!";
  return `أضيفي ${remaining} ج.م للحصول على شحن مجاني`;
}

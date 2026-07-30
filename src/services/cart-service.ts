/**
 * Cart Service — API architecture for cart operations.
 * Provides server-side cart synchronization, coupon validation,
 * and shipping estimation endpoints.
 */

import { supabaseClient } from "@/lib/supabase";
import type { CartItem } from "@/types";

// ============================================
// TYPES
// ============================================

export interface CouponValidation {
  isValid: boolean;
  discount: number;
  type: "percentage" | "fixed";
  message?: string;
}

export interface ShippingEstimate {
  cost: number;
  currency: string;
  estimatedDays: string;
  freeShippingEligible: boolean;
}

export interface CartSyncResult {
  items: CartItem[];
  lastUpdated: string;
}

// ============================================
// COUPON VALIDATION (Architecture)
// ============================================

/**
 * Validate a coupon code against the backend.
 * Architecture: In production, this calls the Supabase Edge Function.
 */
export async function validateCoupon(
  code: string
): Promise<CouponValidation> {
  const { data, error } = await supabaseClient
    .from("coupons")
    .select("*")
    .eq("code", code.toUpperCase().trim())
    .eq("is_active", true)
    .single();

  if (error || !data) {
    return {
      isValid: false,
      discount: 0,
      type: "percentage",
      message: "رمز الخصم غير صالح",
    };
  }

  // Check expiration
  const now = new Date();
  if (data.expires_at && new Date(data.expires_at) < now) {
    return {
      isValid: false,
      discount: 0,
      type: "percentage",
      message: "رمز الخصم منتهي الصلاحية",
    };
  }

  // Check usage limit
  if (data.usage_limit && data.usage_count >= data.usage_limit) {
    return {
      isValid: false,
      discount: 0,
      type: "percentage",
      message: "تم استنفاد عدد مرات استخدام هذا الرمز",
    };
  }

  return {
    isValid: true,
    discount: data.discount_value,
    type: data.discount_type === "percentage" ? "percentage" : "fixed",
    message: `تم تطبيق الخصم: ${data.discount_value}${data.discount_type === "percentage" ? "%" : " ج.م"}`,
  };
}

// ============================================
// SHIPPING ESTIMATION (Architecture)
// ============================================

/**
 * Estimate shipping cost and delivery time.
 * Architecture: In production, this calls the Supabase Edge Function.
 */
export async function estimateShipping(
  governorate?: string
): Promise<ShippingEstimate> {
  // Architecture: Replace with actual API call
  // const response = await supabase.functions.invoke('estimate-shipping', { body: { governorate } });

  const isFree = false; // Will be determined by cart subtotal
  const FREE_SHIPPING_THRESHOLD = 500;

  return {
    cost: 60,
    currency: "EGP",
    estimatedDays: "2-5 أيام عمل",
    freeShippingEligible: false,
  };
}

// ============================================
// CART SYNCHRONIZATION (Architecture)
// ============================================

/**
 * Fetch cart items from the server for authenticated users.
 * Architecture: In production, this calls the Supabase Edge Function.
 */
export async function fetchServerCart(): Promise<CartSyncResult | null> {
  // Architecture: Replace with actual Supabase call
  // const { data, error } = await supabase.functions.invoke('sync-cart');
  // if (error) throw new Error(error.message);

  return null; // No server items for guest users
}

/**
 * Push local cart items to the server for authenticated users.
 * Architecture: In production, this calls the Supabase Edge Function.
 */
export async function pushCartToServer(
  items: CartItem[]
): Promise<void> {
  // Architecture: Replace with actual Supabase call
  // await supabase.functions.invoke('push-cart', { body: { items } });

  // Silently fail for guest users
  if (items.length === 0) return;
}

// ============================================
// STOCK VALIDATION (Architecture)
// ============================================

/**
 * Validate stock availability for cart items.
 * Architecture: In production, this checks against inventory table.
 */
export async function validateStock(
  productIds: string[]
): Promise<Map<string, number>> {
  const { data, error } = await supabaseClient
    .from("inventory")
    .select("product_id, available_stock")
    .in("product_id", productIds);

  if (error) throw error;

  const stockMap = new Map<string, number>();
  (data || []).forEach((item) => {
    stockMap.set(item.product_id, item.available_stock);
  });

  return stockMap;
}

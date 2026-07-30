/**
 * Checkout Service — Orchestrates the complete checkout flow.
 * Handles order creation, payment initiation, and checkout state management.
 */

import type {
  ShippingAddress,
  CartItem,
  OrderCreationResult,
  PaymentMethodType,
  ShippingMethod,
  AppliedCoupon,
} from "@/types";

// ============================================
// TYPES
// ============================================

export interface CreateCheckoutOrderInput {
  items: CartItem[];
  shippingAddress: ShippingAddress;
  shippingMethod: ShippingMethod;
  paymentMethod: PaymentMethodType;
  coupon?: AppliedCoupon | null;
  orderNotes?: string;
  isGuest: boolean;
  guestEmail?: string;
  guestPhone?: string;
}

export interface CheckoutTotals {
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  grandTotal: number;
}

// ============================================
// CONSTANTS
// ============================================

const TAX_RATE = 0.14; // 14% VAT
const FREE_SHIPPING_THRESHOLD = 500;

// ============================================
// FUNCTIONS
// ============================================

/**
 * Calculate checkout totals.
 */
export function calculateCheckoutTotals(
  items: CartItem[],
  discount: number,
  shippingCost: number
): CheckoutTotals {
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const afterDiscount = Math.max(0, subtotal - discount);
  const shipping = shippingCost;
  const tax = Math.round(afterDiscount * TAX_RATE);
  const grandTotal = afterDiscount + shipping + tax;

  return {
    subtotal,
    discount,
    shipping,
    tax,
    grandTotal,
  };
}

/**
 * Generate a unique order number.
 * Format: BJ-{YYYYMMDD}-{random4digits}
 */
export function generateOrderNumber(): string {
  const now = new Date();
  const dateStr = now
    .toISOString()
    .slice(0, 10)
    .replace(/-/g, "");
  const randomDigits = Math.floor(1000 + Math.random() * 9000);
  return `BJ-${dateStr}-${randomDigits}`;
}

/**
 * Create a checkout order via Edge Function.
 */
export async function createCheckoutOrder(
  input: CreateCheckoutOrderInput
): Promise<OrderCreationResult> {
  const orderNumber = generateOrderNumber();

  const _orderData = {
    orderNumber,
    items: input.items.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
      unitPrice: item.price,
      title: item.title,
    })),
    shippingAddress: {
      fullName: input.shippingAddress.fullName,
      phoneNumber: input.shippingAddress.phoneNumber,
      governorate: input.shippingAddress.governorate,
      city: input.shippingAddress.city,
      area: input.shippingAddress.area,
      street: input.shippingAddress.street,
      buildingNumber: input.shippingAddress.buildingNumber,
      floor: input.shippingAddress.floor,
      apartment: input.shippingAddress.apartment,
      landmark: input.shippingAddress.landmark,
    },
    shippingMethod: input.shippingMethod,
    paymentMethod: input.paymentMethod,
    coupon: input.coupon
      ? {
          code: input.coupon.code,
          discount: input.coupon.discount,
          type: input.coupon.type,
        }
      : null,
    orderNotes: input.orderNotes || null,
    isGuest: input.isGuest,
    guestEmail: input.guestEmail || null,
    guestPhone: input.guestPhone || null,
    totals: calculateCheckoutTotals(
      input.items,
      input.coupon?.discount || 0,
      0 // Will be calculated server-side
    ),
  };

  // Architecture: In production, this calls the Supabase Edge Function
  // const { data, error } = await supabaseClient.functions.invoke(
  //   "create-checkout-order",
  //   { body: _orderData }
  // );
  //
  // if (error) throw new Error(error.message || "Failed to create order");
  // return data;

  // Simulated response for architecture
  return {
    orderId: crypto.randomUUID(),
    orderNumber,
    status: input.paymentMethod === "cod" ? "cod" : "requires_payment",
    paymentIntentId: crypto.randomUUID(),
  };
}

/**
 * Validate cart before checkout.
 * Checks for empty cart, out-of-stock items, and invalid quantities.
 */
export function validateCartForCheckout(items: CartItem[]): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (items.length === 0) {
    errors.push("سلة التسوق فارغة");
  }

  for (const item of items) {
    if (item.quantity <= 0) {
      errors.push(`كمية ${item.title} غير صحيحة`);
    }
    if (item.quantity > item.maxQuantity) {
      errors.push(
        `كمية ${item.title} تتجاوز الحد الأقصى (${item.maxQuantity})`
      );
    }
    if (item.price <= 0) {
      errors.push(`سعر ${item.title} غير صحيح`);
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Validate shipping address completeness.
 */
export function validateShippingAddress(
  address: ShippingAddress
): { isValid: boolean; missingFields: string[] } {
  const missingFields: string[] = [];

  if (!address.fullName || address.fullName.trim().length < 2) {
    missingFields.push("الاسم الكامل");
  }
  if (!address.phoneNumber || !/^(\+20)?01[0125][0-9]{8}$/.test(
    address.phoneNumber.replace(/[\s\-\(\)]/g, "")
  )) {
    missingFields.push("رقم الهاتف");
  }
  if (!address.governorate) missingFields.push("المحافظة");
  if (!address.city) missingFields.push("المدينة");
  if (!address.area) missingFields.push("المنطقة");
  if (!address.street) missingFields.push("الشارع");

  return {
    isValid: missingFields.length === 0,
    missingFields,
  };
}

/**
 * Validate guest checkout info.
 */
export function validateGuestInfo(email: string, phoneNumber: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push("صيغة البريد الإلكتروني غير صحيحة");
  }
  if (!phoneNumber || !/^(\+20)?01[0125][0-9]{8}$/.test(
    phoneNumber.replace(/[\s\-\(\)]/g, "")
  )) {
    errors.push("صيغة رقم الهاتف غير صحيحة");
  }

  return { isValid: errors.length === 0, errors };
}

/**
 * Calculate coupon discount amount.
 */
export function calculateCouponDiscount(
  subtotal: number,
  discount: number,
  type: "percentage" | "fixed"
): number {
  if (type === "percentage") {
    return (subtotal * discount) / 100;
  }
  return Math.min(discount, subtotal);
}

/**
 * Check if an order qualifies for free shipping.
 */
export function isEligibleForFreeShipping(
  afterDiscountTotal: number
): boolean {
  return afterDiscountTotal >= FREE_SHIPPING_THRESHOLD;
}

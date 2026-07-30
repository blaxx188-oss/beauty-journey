/**
 * Beauty Journey — Checkout Type Definitions
 * Extended types for the complete checkout flow.
 */

import type { ShippingAddress } from "./index";

// ============================================
// CHECKOUT STEPS
// ============================================

export type CheckoutStep =
  | "shipping"
  | "delivery"
  | "payment"
  | "review";

export interface CheckoutStepItem {
  id: CheckoutStep;
  label: string;
  description: string;
  completed: boolean;
  current: boolean;
}

// ============================================
// SHIPPING & DELIVERY
// ============================================

export type ShippingMethod = "standard" | "express" | "same_day";

export interface ShippingOption {
  id: ShippingMethod;
  label: string;
  description: string;
  cost: number;
  currency: string;
  estimatedDays: string;
  icon?: string;
}

export interface DeliveryInfo {
  method: ShippingMethod | null;
  estimatedDays: string;
  cost: number;
  notes: string;
}

// ============================================
// PAYMENT
// ============================================

export type PaymentMethodType = "card" | "fawry" | "cod" | "mobile_wallet";

export interface PaymentOption {
  id: PaymentMethodType;
  label: string;
  description: string;
  icon?: string;
  fee: number;
}

export interface PaymentInfo {
  method: PaymentMethodType | null;
  cardToken?: string;
  paymentIntentId?: string;
  walletId?: string;
}

// ============================================
// ADDRESS
// ============================================

export interface SavedAddress {
  id: string;
  address: ShippingAddress;
  label: string;
  isDefault: boolean;
}

export interface AddressFormData {
  fullName: string;
  phoneNumber: string;
  governorate: string;
  city: string;
  area: string;
  street: string;
  buildingNumber: string;
  floor: string;
  apartment: string;
  landmark: string;
  isDefault: boolean;
}

// ============================================
// GUEST CHECKOUT
// ============================================

export interface GuestInfo {
  email: string;
  phoneNumber: string;
}

// ============================================
// COUPON
// ============================================

export interface AppliedCoupon {
  code: string;
  discount: number;
  type: "percentage" | "fixed";
  message: string;
}

// ============================================
// ORDER TOTALS
// ============================================

export interface OrderTotals {
  subtotal: number;
  discount: number;
  afterDiscount: number;
  shipping: number;
  tax: number;
  grandTotal: number;
}

// ============================================
// ORDER CREATION
// ============================================

export type OrderCheckoutStatus =
  | "idle"
  | "creating"
  | "processing_payment"
  | "success"
  | "failed";

export interface OrderCreationResult {
  orderId: string;
  orderNumber: string;
  paymentIntentId?: string;
  paymentUrl?: string;
  status: "success" | "requires_payment" | "cod";
}

// ============================================
// CHECKOUT STATE
// ============================================

export interface CheckoutState {
  currentStep: CheckoutStep;
  isGuest: boolean;
  guestInfo: GuestInfo | null;
  shippingAddress: ShippingAddress | null;
  selectedSavedAddress: string | null;
  deliveryInfo: DeliveryInfo;
  paymentInfo: PaymentInfo;
  appliedCoupon: AppliedCoupon | null;
  orderNotes: string;
  billingSameAsShipping: boolean;
  termsAccepted: boolean;
  isLoading: boolean;
  error: string | null;
  orderStatus: OrderCheckoutStatus;
  lastOrderId: string | null;
}

export interface OrderSummaryItem {
  product: {
    title: string;
    imageUrl: string;
    variant?: string;
  };
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

// ============================================
// PAYMOB TYPES
// ============================================

export interface PaymobTokenResponse {
  token: string;
}

export interface PaymobOrderResponse {
  id: string;
  delivery_needed: boolean;
  amount_cents: string;
  shipping_data: Record<string, unknown>;
  items: Record<string, unknown>[];
  currency: string;
}

export interface PaymobPaymentKeyResponse {
  token: string;
}

export interface PaymobWebhookPayload {
  type: string;
  obj: {
    id: number;
    success: boolean;
    amount_cents: number;
    order: {
      id: number;
      merchant_order_id: string;
    };
  };
}

// ============================================
// GOVERNORATE DATA
// ============================================

export interface Governorate {
  name: string;
  nameAr: string;
  cities: City[];
  shippingCost: number;
}

export interface City {
  name: string;
  nameAr: string;
}

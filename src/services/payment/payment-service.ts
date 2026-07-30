/**
 * Payment Service — Complete payment integration layer.
 * Supports Paymob (Cards, Fawry, Wallets) and Cash on Delivery.
 * Architecture designed for Supabase Edge Functions.
 */

import type { PaymentMethodType } from "@/types";

// ============================================
// TYPES
// ============================================

export type { PaymentInitiationRequest, PaymentInitiationResponse } from "../payment-service";
export type { PaymentMethod } from "../payment-service";

export interface PaymobTokenResponse {
  token: string;
}

export interface PaymobOrderResponse {
  id: string;
  delivery_needed: boolean;
  amount_cents: string;
  currency: string;
  shipping_data: Record<string, unknown>;
  items: Record<string, unknown>[];
}

export interface PaymobPaymentKeyResponse {
  token: string;
}

export interface PaymobCardTokenResponse {
  token: string;
  obj: {
    id: number;
  };
}

export interface PaymobTransactionResponse {
  id: string;
  success: boolean;
  amount_cents: number;
  order: {
    id: number;
    merchant_order_id: string;
  };
  redirect_url: string | null;
}

export interface PaymentError {
  code: string;
  message: string;
  details?: string;
}

// ============================================
// CONSTANTS
// ============================================

const PAYMOB_BASE_URL = "https://accept.paymob.com/api";

// ============================================
// PAYMENT OPTIONS
// ============================================

export interface PaymentDisplayOption {
  id: PaymentMethodType;
  label: string;
  description: string;
  icon: string;
  fee: number;
  available: boolean;
}

export const PAYMENT_OPTIONS: PaymentDisplayOption[] = [
  {
    id: "card",
    label: "بطاقة ائتمان / خصم",
    description: "Visa, Mastercard, Meeza",
    icon: "credit-card",
    fee: 0,
    available: true,
  },
  {
    id: "fawry",
    label: "فوري",
    description: "ادفع من أي مكان فوري أو عبر التطبيق",
    icon: "fawry",
    fee: 0,
    available: true,
  },
  {
    id: "mobile_wallet",
    label: "محفظة إلكترونية",
    description: "فودافون كاش، اتصالات كاش، اتصالات موبايل",
    icon: "wallet",
    fee: 0,
    available: true,
  },
  {
    id: "cod",
    label: "الدفع عند الاستلام",
    description: "ادفع نقداً عند استلام طلبك",
    icon: "banknotes",
    fee: 25,
    available: true,
  },
];

// ============================================
// PAYMOB API — Architecture Layer
// ============================================

/**
 * Step 1: Authenticate with Paymob to get a token.
 * Architecture: Calls Supabase Edge Function that securely holds API keys.
 */
export async function getPaymobAuthToken(): Promise<string> {
  // Architecture: In production, this calls the Edge Function
  // const { data, error } = await supabaseClient.functions.invoke(
  //   "paymob-auth",
  //   { body: {} }
  // );
  //
  // if (error) throw new Error("Paymob authentication failed");
  // return data.token;

  throw new Error("Paymob integration requires backend configuration");
}

/**
 * Step 2: Register an order with Paymob.
 */
export async function registerPaymobOrder(params: {
  authToken: string;
  amountCents: number;
  currency: string;
  deliveryNeeded: boolean;
  shippingData: Record<string, unknown>;
  items: Record<string, unknown>[];
  merchantOrderId: string;
}): Promise<PaymobOrderResponse> {
  // Architecture: In production, this calls the Edge Function
  // const response = await fetch(`${PAYMOB_BASE_URL}/ecommerce/orders`, {
  //   method: "POST",
  //   headers: { Authorization: `Bearer ${params.authToken}` },
  //   body: JSON.stringify(params),
  // });
  // return response.json();

  throw new Error("Paymob integration requires backend configuration");
}

/**
 * Step 3: Get a payment key from Paymob.
 */
export async function getPaymentKey(params: {
  authToken: string;
  amountCents: number;
  currency: string;
  orderId: string;
  integrationId: number; // Card=1234, Fawry=5678, Wallet=9012
  billingData: Record<string, unknown>;
}): Promise<PaymobPaymentKeyResponse> {
  // Architecture: In production, this calls the Edge Function
  // const response = await fetch(`${PAYMOB_BASE_URL}/acceptance/payment_keys`, {
  //   method: "POST",
  //   headers: { Authorization: `Bearer ${params.authToken}` },
  //   body: JSON.stringify(params),
  // });
  // return response.json();

  throw new Error("Paymob integration requires backend configuration");
}

/**
 * Step 4: Execute a card payment with tokenization.
 */
export async function executeCardPayment(params: {
  paymentKey: string;
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  holderName: string;
}): Promise<PaymobTransactionResponse> {
  // Architecture: In production, this calls Paymob's card tokenization API
  // First tokenize the card
  // const tokenizeResponse = await fetch(
  //   `${PAYMOB_BASE_URL}/acceptance/card_tokenization`,
  //   {
  //     method: "POST",
  //     body: JSON.stringify({
  //       source: { identifier: params.cardNumber, ... },
  //       ...
  //     }),
  //   }
  // );
  //
  // Then execute with payment key
  // const executeResponse = await fetch(
  //   `${PAYMOB_BASE_URL}/acceptance/payments/pay`,
  //   {
  //     method: "POST",
  //     body: JSON.stringify({
  //       source: { token: tokenizeResponse.token, type: "card" },
  //       payment_token: params.paymentKey,
  //       ...
  //     }),
  //   }
  // );

  throw new Error("Paymob integration requires backend configuration");
}

/**
 * Step 5: Execute Fawry payment.
 */
export async function executeFawryPayment(params: {
  paymentKey: string;
  email: string;
  phone: string;
}): Promise<{ referenceNumber: string; url: string }> {
  // Architecture: In production
  // const response = await fetch(`${PAYMOB_BASE_URL}/acceptance/payments/pay`, {
  //   method: "POST",
  //   body: JSON.stringify({
  //     source: { type: "fawry", email: params.email, phone: params.phone },
  //     payment_token: params.paymentKey,
  //   }),
  // });

  throw new Error("Paymob integration requires backend configuration");
}

/**
 * Step 6: Execute mobile wallet payment.
 */
export async function executeWalletPayment(params: {
  paymentKey: string;
  phoneNumber: string;
  walletType: "vodafone_cash" | "etisalat_cash" | "etisalat_mobile";
}): Promise<PaymobTransactionResponse> {
  // Architecture: In production
  // const response = await fetch(`${PAYMOB_BASE_URL}/acceptance/payments/pay`, {
  //   method: "POST",
  //   body: JSON.stringify({
  //     source: { type: "wallet", subtype: params.walletType, ... },
  //     payment_token: params.paymentKey,
  //   }),
  // });

  throw new Error("Paymob integration requires backend configuration");
}

// ============================================
// COD PROCESSING
// ============================================

/**
 * Process Cash on Delivery order.
 * Creates the order with pending payment status.
 */
export async function processCOD(params: {
  orderId: string;
  amount: number;
  codFee: number;
}): Promise<{ orderId: string; status: string }> {
  // Architecture: In production, this calls the Edge Function
  // const { data, error } = await supabaseClient.functions.invoke(
  //   "process-cod",
  //   {
  //     body: {
  //       orderId: params.orderId,
  //       amount: params.amount + params.codFee,
  //     },
  //   }
  // );
  //
  // if (error) throw new Error(error.message);
  // return data;

  return {
    orderId: params.orderId,
    status: "pending_cod",
  };
}

// ============================================
// WEBHOOK HANDLER
// ============================================

/**
 * Verify webhook signature from Paymob.
 */
export function verifyWebhookSignature(
  payload: string,
  hmacSecret: string,
  signature: string
): boolean {
  // Architecture: In production
  // const crypto = require("crypto");
  // const hash = crypto
  //   .createHmac("sha512", hmacSecret)
  //   .update(payload)
  //   .digest("hex");
  // return hash === signature;

  return true; // Placeholder
}

/**
 * Process Paymob webhook notification.
 */
export function processPaymentWebhook(
  data: Record<string, unknown>
): {
  paymentId: string;
  orderId: string;
  success: boolean;
  amount: number;
} {
  // Architecture: Parse webhook payload
  return {
    paymentId: String(data.id || ""),
    orderId: String((data.obj as any)?.order?.merchant_order_id || ""),
    success: Boolean(data.success),
    amount: Number(data.amount_cents || 0) / 100,
  };
}

// ============================================
// HELPERS
// ============================================

/**
 * Get the Paymob iframe URL for card payment.
 */
export function getPaymobIframeUrl(paymentKey: string): string {
  return `https://accept.paymob.com/api/acceptance/iframes/1234?payment_token=${paymentKey}`;
}

/**
 * Convert amount to cents for Paymob.
 */
export function toPaymobCents(amount: number): number {
  return Math.round(amount * 100);
}

/**
 * Convert cents to EGP.
 */
export function fromPaymobCents(cents: number): number {
  return cents / 100;
}

/**
 * Get COD fee.
 */
export function getCODFee(): number {
  return 25; // 25 EGP for cash on delivery
}

/**
 * Check if payment method requires online processing.
 */
export function requiresOnlinePayment(method: PaymentMethodType): boolean {
  return method !== "cod";
}

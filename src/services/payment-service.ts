/**
 * Payment Service — Paymob integration via Supabase Edge Functions.
 * Handles Cards, Fawry, and Cash on Delivery.
 */

import { supabaseClient } from "@/lib/supabase";

// ============================================
// TYPES
// ============================================

export type PaymentMethod = "card" | "fawry" | "cod" | "mobile_wallet";

export interface PaymentInitiationRequest {
  orderId: string;
  paymentMethod: PaymentMethod;
  amount: number;
  currency: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
}

export interface PaymentInitiationResponse {
  token: string;
  iframeUrl?: string;
  redirectUrl?: string;
  paymentId: string;
}

// ============================================
// FUNCTIONS
// ============================================

/**
 * Initiate payment via Paymob Edge Function.
 */
export async function initiatePayment(
  request: PaymentInitiationRequest
): Promise<PaymentInitiationResponse> {
  const { data, error } = await supabaseClient.functions.invoke(
    "initiate-payment",
    {
      body: request,
    }
  );

  if (error) {
    throw new Error(error.message || "Payment initiation failed");
  }

  return data as PaymentInitiationResponse;
}

/**
 * Handle Cash on Delivery — skip Paymob, create order directly.
 */
export async function processCOD(orderId: string): Promise<void> {
  const { error } = await supabaseClient.functions.invoke("process-cod", {
    body: { orderId },
  });

  if (error) {
    throw new Error(error.message || "COD processing failed");
  }
}

/**
 * Verify payment status via webhook.
 */
export async function verifyPaymentStatus(
  paymentId: string
): Promise<{ status: "success" | "failed" | "pending" }> {
  const { data, error } = await supabaseClient.functions.invoke(
    "verify-payment",
    {
      body: { paymentId },
    }
  );

  if (error) {
    throw new Error(error.message || "Payment verification failed");
  }

  return data;
}

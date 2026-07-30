/**
 * Shipping Service — Shipping methods, cost calculation, and delivery estimation.
 */

import type { ShippingOption, ShippingMethod } from "@/types";
import { estimateShippingCost } from "./governorate-data";

// ============================================
// SHIPPING OPTIONS
// ============================================

export const SHIPPING_OPTIONS: ShippingOption[] = [
  {
    id: "standard",
    label: "شحن عادي",
    description: "التوصيل خلال 2-5 أيام عمل",
    cost: 60,
    currency: "EGP",
    estimatedDays: "2-5 أيام عمل",
  },
  {
    id: "express",
    label: "شحن سريع",
    description: "التوصيل خلال 1-2 يوم عمل",
    cost: 120,
    currency: "EGP",
    estimatedDays: "1-2 أيام عمل",
  },
  {
    id: "same_day",
    label: "توصيل في نفس اليوم",
    description: "متاح في القاهرة والجيزة فقط",
    cost: 200,
    currency: "EGP",
    estimatedDays: "نفس اليوم",
  },
];

// ============================================
// FUNCTIONS
// ============================================

/**
 * Get shipping options filtered by governorate eligibility.
 */
export function getShippingOptions(governorate?: string): ShippingOption[] {
  if (!governorate) {
    return SHIPPING_OPTIONS.filter((opt) => opt.id !== "same_day");
  }

  // Same day delivery only for Cairo and Giza
  if (governorate === "القاهرة" || governorate === "الجيزة") {
    return SHIPPING_OPTIONS;
  }

  return SHIPPING_OPTIONS.filter((opt) => opt.id !== "same_day");
}

/**
 * Calculate shipping cost based on method and governorate.
 */
export function calculateShippingCost(
  method: ShippingMethod,
  governorate: string,
  subtotal: number
): number {
  const option = SHIPPING_OPTIONS.find((opt) => opt.id === method);
  if (!option) return 0;

  // Free shipping threshold
  if (subtotal >= 500) return 0;

  // Governorate-specific cost
  const governorateCost = estimateShippingCost(governorate, subtotal);

  if (governorateCost.isFree) return 0;

  // Express adds premium, same day adds premium
  if (method === "express") {
    return option.cost;
  }

  if (method === "same_day") {
    return option.cost;
  }

  return governorateCost.cost;
}

/**
 * Get estimated delivery days for a shipping method and governorate.
 */
export function getEstimatedDeliveryDays(
  method: ShippingMethod,
  governorate: string
): string {
  const { estimatedDays } = estimateShippingCost(governorate, 0);

  switch (method) {
    case "express":
      return "1-2 أيام عمل";
    case "same_day":
      return "نفس اليوم";
    default:
      return estimatedDays;
  }
}

/**
 * Get the shipping cost adjustment for express/same-day vs standard.
 */
export function getShippingPremium(method: ShippingMethod): number {
  switch (method) {
    case "express":
      return 60; // Extra 60 EGP
    case "same_day":
      return 140; // Extra 140 EGP
    default:
      return 0;
  }
}

/**
 * Check if governorate is eligible for same-day delivery.
 */
export function isSameDayEligible(governorate: string): boolean {
  return governorate === "القاهرة" || governorate === "الجيزة";
}

/**
 * Get shipping method display info.
 */
export function getShippingMethodInfo(method: ShippingMethod) {
  const option = SHIPPING_OPTIONS.find((opt) => opt.id === method);
  return option || SHIPPING_OPTIONS[0];
}

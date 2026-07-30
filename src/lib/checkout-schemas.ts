/**
 * Checkout Validation Schemas — Zod schemas for all checkout forms.
 * Covers shipping address, guest info, delivery method, payment, and review.
 * Compatible with Zod v4.
 */

import { z } from "zod";

// ============================================
// SHIPPING ADDRESS SCHEMA
// ============================================

export const shippingAddressSchema = z.object({
  fullName: z
    .string()
    .min(2, "الاسم الكامل مطلوب")
    .max(100, "الاسم طويل جداً"),
  phoneNumber: z
    .string()
    .min(1, "رقم الهاتف مطلوب")
    .refine(
      (val) =>
        /^(\+20)?01[0125][0-9]{8}$/.test(val.replace(/[\s\-\(\)]/g, "")),
      { message: "صيغة رقم الهاتف غير صحيحة" }
    ),
  governorate: z.string().min(1, "المحافظة مطلوبة"),
  city: z.string().min(1, "المدينة مطلوبة"),
  area: z.string().min(1, "المنطقة مطلوبة"),
  street: z.string().min(1, "الشارع مطلوب"),
  buildingNumber: z.string().optional(),
  floor: z.string().optional(),
  apartment: z.string().optional(),
  landmark: z.string().optional(),
  isDefault: z.boolean().default(false),
});

// ============================================
// GUEST CHECKOUT SCHEMA
// ============================================

export const guestCheckoutSchema = z.object({
  email: z
    .string()
    .min(1, "البريد الإلكتروني مطلوب")
    .email("صيغة البريد الإلكتروني غير صحيحة"),
  phoneNumber: z
    .string()
    .min(1, "رقم الهاتف مطلوب")
    .refine(
      (val) =>
        /^(\+20)?01[0125][0-9]{8}$/.test(val.replace(/[\s\-\(\)]/g, "")),
      { message: "صيغة رقم الهاتف غير صحيحة" }
    ),
});

// ============================================
// SHIPPING METHOD SCHEMA
// ============================================

export const shippingMethodSchema = z.object({
  method: z.enum(["standard", "express", "same_day"]),
});

// ============================================
// PAYMENT METHOD SCHEMA
// ============================================

export const paymentMethodSchema = z.object({
  method: z.enum(["card", "fawry", "cod", "mobile_wallet"]),
});

// ============================================
// COUPON SCHEMA
// ============================================

export const couponSchema = z.object({
  code: z
    .string()
    .min(1, "رمز الخصم مطلوب")
    .transform((val) => val.toUpperCase().trim()),
});

// ============================================
// TERMS ACCEPTANCE SCHEMA
// ============================================

export const termsSchema = z.object({
  accepted: z.boolean().refine((val) => val === true, {
    message: "يجب الموافقة على الشروط والأحكام",
  }),
});

// ============================================
// ORDER REVIEW SCHEMA (Final validation)
// ============================================

export const orderReviewSchema = z.object({
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "يجب الموافقة على الشروط والأحكام",
  }),
});

// ============================================
// COMBINED CHECKOUT FLOW SCHEMA
// ============================================

export const fullCheckoutSchema = z.object({
  // Shipping
  shippingAddress: shippingAddressSchema,
  // Guest info
  guestInfo: guestCheckoutSchema.optional(),
  // Delivery
  shippingMethod: shippingMethodSchema,
  // Payment
  paymentMethod: paymentMethodSchema,
  // Terms
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "يجب الموافقة على الشروط والأحكام",
  }),
});

// ============================================
// TYPE EXPORTS
// ============================================

export type ShippingAddressInput = z.infer<typeof shippingAddressSchema>;
export type GuestCheckoutInput = z.infer<typeof guestCheckoutSchema>;
export type ShippingMethodInput = z.infer<typeof shippingMethodSchema>;
export type PaymentMethodInput = z.infer<typeof paymentMethodSchema>;
export type CouponInput = z.infer<typeof couponSchema>;
export type TermsInput = z.infer<typeof termsSchema>;
export type OrderReviewInput = z.infer<typeof orderReviewSchema>;
export type FullCheckoutInput = z.infer<typeof fullCheckoutSchema>;

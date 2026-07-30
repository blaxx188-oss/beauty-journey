/**
 * Zod Validation Schemas — Shared across forms.
 * Covers login, register, address, checkout, and quiz forms.
 */

import { z } from "zod";

// ============================================
// AUTH SCHEMAS
// ============================================

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "البريد الإلكتروني أو رقم الهاتف مطلوب")
    .refine(
      (val) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) ||
        /^(\+20)?01[0125][0-9]{8}$/.test(val.replace(/[\s\-\(\)]/g, "")),
      { message: "صيغة غير صحيحة" }
    ),
  password: z
    .string()
    .min(1, "كلمة المرور مطلوبة")
    .min(8, "يجب أن تكون كلمة المرور 8 أحرف على الأقل"),
});

export const registerSchema = z
  .object({
    fullName: z
      .string()
      .min(2, "الاسم الكامل مطلوب")
      .refine((val) => val.trim().split(/\s+/).length >= 2, {
        message: "يجب أن يحتوي على اسم العائلة",
      }),
    email: z
      .string()
      .min(1, "البريد الإلكتروني مطلوب")
      .email("صيغة البريد الإلكتروني غير صحيحة"),
    password: z
      .string()
      .min(8, "يجب أن تكون كلمة المرور 8 أحرف على الأقل")
      .regex(/[a-z]/, "يجب أن تحتوي على حرف صغير واحد على الأقل")
      .regex(/[A-Z]/, "يجب أن تحتوي على حرف كبير واحد على الأقل")
      .regex(/\d/, "يجب أن تحتوي على رقم واحد على الأقل")
      .regex(/[@$!%*?&]/, "يجب أن تحتوي على رمز خاص واحد على الأقل"),
    confirmPassword: z.string().min(1, "تأكيد كلمة المرور مطلوب"),
    phoneNumber: z
      .string()
      .optional()
      .refine(
        (val) =>
          !val ||
          /^(\+20)?01[0125][0-9]{8}$/.test(val.replace(/[\s\-\(\)]/g, "")),
        { message: "صيغة رقم الهاتف غير صحيحة" }
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "كلمة المرور غير متطابقة",
    path: ["confirmPassword"],
  });

// ============================================
// ADDRESS SCHEMA
// ============================================

export const addressSchema = z.object({
  fullName: z.string().min(2, "الاسم الكامل مطلوب"),
  phoneNumber: z
    .string()
    .min(1, "رقم الهاتف مطلوب")
    .refine(
      (val) => /^(\+20)?01[0125][0-9]{8}$/.test(val.replace(/[\s\-\(\)]/g, "")),
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
// CHECKOUT SCHEMA
// ============================================

export const checkoutSchema = z.object({
  shippingMethod: z.enum(["standard", "express", "pickup"]),
  paymentMethod: z.enum(["card", "fawry", "cod"]),
});

// ============================================
// BEAUTY QUIZ SCHEMA
// ============================================

export const quizSchema = z.object({
  skinType: z.enum(["dry", "oily", "combination", "normal", "sensitive"]),
  primaryConcerns: z.array(z.string()).min(1, "يرجى اختيار مشكلة واحدة على الأقل"),
  allergies: z.array(z.string()).optional(),
  hairType: z.enum(["straight", "wavy", "curly", "coily"]).optional(),
  hairConcerns: z.array(z.string()).optional(),
  ageRange: z.enum(["under-18", "18-24", "25-34", "35-44", "45+"]),
  skinGoals: z.array(z.string()).min(1, "يرجى اختيار هدف واحد على الأقل"),
});

// ============================================
// TYPE EXPORTS
// ============================================

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type AddressInput = z.infer<typeof addressSchema>;
export type CheckoutInput = z.infer<typeof checkoutSchema>;
export type QuizInput = z.infer<typeof quizSchema>;

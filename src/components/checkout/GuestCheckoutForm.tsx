"use client";

/**
 * GuestCheckoutForm — Guest checkout email and phone input.
 * Allows unauthenticated users to complete checkout.
 */

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Phone } from "lucide-react";
import { Input } from "@/components/design-system/core";
import { guestCheckoutSchema, type GuestCheckoutInput } from "@/lib/checkout-schemas";
import type { GuestInfo } from "@/types";

// ============================================
// TYPES
// ============================================

interface GuestCheckoutFormProps {
  onSubmit: (info: GuestInfo) => void;
  defaultValues?: GuestInfo | null;
}

// ============================================
// COMPONENT
// ============================================

export default function GuestCheckoutForm({
  onSubmit,
  defaultValues,
}: GuestCheckoutFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<GuestCheckoutInput>({
    resolver: zodResolver(guestCheckoutSchema),
    defaultValues: defaultValues || {
      email: "",
      phoneNumber: "",
    },
  });

  const handleSubmitForm = (data: GuestCheckoutInput) => {
    onSubmit({
      email: data.email,
      phoneNumber: data.phoneNumber,
    });
  };

  return (
    <div className="bg-surface border border-border rounded-sm p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-base font-semibold text-text-primary" style={{ fontFamily: "var(--font-heading-ar)" }}>
          معلومات التواصل
        </h2>
        <p className="text-sm text-text-secondary">
          سنرسل لك تأكيد الطلب على البريد الإلكتروني ورقم الهاتف
        </p>
      </div>

      {/* Guest Mode Toggle */}
      <div className="flex items-center justify-between p-4 bg-neutral-secondary/50 rounded-sm">
        <div>
          <p className="text-sm font-medium text-text-primary">
            إتمام الطلب كضيف
          </p>
          <p className="text-xs text-text-secondary mt-0.5">
            لا تحتاج لإنشاء حساب
          </p>
        </div>
        <span className="text-xs font-medium text-accent bg-accent/10 px-3 py-1 rounded-sm">
          نشط
        </span>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(handleSubmitForm)}
        className="space-y-4"
        noValidate
      >
        {/* Email */}
        <div>
          <Input
            label="البريد الإلكتروني"
            placeholder="example@email.com"
            leftIcon={<Mail className="w-4 h-4" />}
            type="email"
            error={errors.email?.message ? String(errors.email?.message) : undefined}
            {...register("email")}
            aria-required="true"
            aria-label="البريد الإلكتروني"
          />
        </div>

        {/* Phone */}
        <div>
          <Input
            label="رقم الهاتف"
            placeholder="01XXXXXXXXX"
            leftIcon={<Phone className="w-4 h-4" />}
            type="tel"
            error={errors.phoneNumber?.message ? String(errors.phoneNumber?.message) : undefined}
            {...register("phoneNumber")}
            aria-required="true"
            aria-label="رقم الهاتف"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 bg-accent text-white text-sm font-medium rounded-sm hover:bg-accent-hover transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "جاري الحفظ..." : "متابعة"}
        </button>
      </form>

      {/* Login CTA */}
      <div className="text-center pt-2 border-t border-border">
        <p className="text-sm text-text-secondary">
          لديك حساب؟{" "}
          <a
            href="/login?redirect=/checkout"
            className="text-accent hover:text-accent-hover font-medium transition-colors"
          >
            سجل دخولك
          </a>{" "}
          لمتابعة طلباتك
        </p>
      </div>
    </div>
  );
}

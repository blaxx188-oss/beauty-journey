"use client";

/**
 * ShippingAddressForm — Address input form for checkout.
 * Arabic RTL, mobile-first, responsive, accessible.
 */

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MapPin, Phone, User, Building2, Home, Star } from "lucide-react";
import {
  Input,
  Select,
  Checkbox,
} from "@/components/design-system/core";
import type { ShippingAddress, SavedAddress } from "@/types";
import { EGYPT_GOVERNORATES, getCitiesForGovernorate } from "@/services/shipping";
import { z } from "zod";

// ============================================
// SCHEMA (matching form shape exactly)
// ============================================

const addressFormSchema = z.object({
  fullName: z.string().min(2, "الاسم الكامل مطلوب").max(100, "الاسم طويل جداً"),
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

type AddressFormValues = z.input<typeof addressFormSchema>;

// ============================================
// TYPES
// ============================================

interface ShippingAddressFormProps {
  onSubmit: (address: ShippingAddress) => void;
  defaultValues?: ShippingAddress | null;
  savedAddresses?: SavedAddress[];
  onSelectSaved?: (id: string) => void;
  isGuest: boolean;
}

// ============================================
// COMPONENT
// ============================================

export default function ShippingAddressForm({
  onSubmit,
  defaultValues,
  savedAddresses = [],
  onSelectSaved,
  isGuest,
}: ShippingAddressFormProps) {
  const formDefaults: AddressFormValues = {
    fullName: defaultValues?.fullName || "",
    phoneNumber: defaultValues?.phoneNumber || "",
    governorate: defaultValues?.governorate || "",
    city: defaultValues?.city || "",
    area: defaultValues?.area || "",
    street: defaultValues?.street || "",
    buildingNumber: defaultValues?.buildingNumber || "",
    floor: defaultValues?.floor || "",
    apartment: defaultValues?.apartment || "",
    landmark: defaultValues?.landmark || "",
    isDefault: false,
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<AddressFormValues>({
    resolver: zodResolver(addressFormSchema),
    defaultValues: formDefaults,
  });

  const selectedGovernorate = watch("governorate");
  const cities = getCitiesForGovernorate(selectedGovernorate);

  const handleSubmitForm = (data: AddressFormValues) => {
    onSubmit({
      fullName: data.fullName,
      phoneNumber: data.phoneNumber,
      governorate: data.governorate,
      city: data.city,
      area: data.area,
      street: data.street,
      buildingNumber: data.buildingNumber || undefined,
      floor: data.floor || undefined,
      apartment: data.apartment || undefined,
      landmark: data.landmark || undefined,
    });
  };

  return (
    <div className="space-y-6">
      {/* Saved Addresses */}
      {!isGuest && savedAddresses.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-text-primary">
            العناوين المحفوظة
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {savedAddresses.map((saved) => (
              <button
                key={saved.id}
                type="button"
                onClick={() => onSelectSaved?.(saved.id)}
                className={`
                  text-right p-4 border rounded-sm transition-all duration-200 hover:shadow-sm
                  ${
                    "selectedSavedAddress" === saved.id
                      ? "border-accent bg-accent/5"
                      : "border-border hover:border-accent/50"
                  }
                `}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-text-secondary">
                    {saved.label}
                  </span>
                  {saved.isDefault && (
                    <span className="flex items-center gap-1 text-xs text-accent">
                      <Star className="w-3 h-3" />
                      الافتراضي
                    </span>
                  )}
                </div>
                <p className="text-sm text-text-primary">
                  {saved.address.fullName}
                </p>
                <p className="text-xs text-text-secondary mt-1 line-clamp-2">
                  {saved.address.street}، {saved.address.area}، {saved.address.city}، {saved.address.governorate}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* New Address Form */}
      <div className="border-t border-border pt-6">
        <h3 className="text-sm font-semibold text-text-primary mb-4 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-accent" />
          عنوان شحن جديد
        </h3>

        <form
          onSubmit={handleSubmit(handleSubmitForm as any)}
          className="space-y-4"
          noValidate
        >
          {/* Full Name */}
          <div>
            <Input
              label="الاسم الكامل"
              placeholder="أدخل اسمك الكامل"
              leftIcon={<User className="w-4 h-4" />}
              error={errors.fullName?.message}
              {...register("fullName")}
              aria-required="true"
              aria-label="الاسم الكامل"
            />
          </div>

          {/* Phone Number */}
          <div>
            <Input
              label="رقم الهاتف"
              placeholder="01XXXXXXXXX"
              leftIcon={<Phone className="w-4 h-4" />}
              error={errors.phoneNumber?.message}
              type="tel"
              {...register("phoneNumber")}
              aria-required="true"
              aria-label="رقم الهاتف"
            />
          </div>

          {/* Governorate */}
          <div>
            <Controller
              control={control}
              name="governorate"
              render={({ field }) => (
                <Select
                  label="المحافظة"
                  placeholder="اختر المحافظة"
                  options={EGYPT_GOVERNORATES.map((g) => ({
                    value: g.nameAr,
                    label: g.nameAr,
                  }))}
                  value={field.value || ""}
                  onValueChange={field.onChange}
                  error={errors.governorate?.message}
                />
              )}
            />
          </div>

          {/* City */}
          <div>
            <Controller
              control={control}
              name="city"
              render={({ field }) => (
                <Select
                  label="المدينة"
                  placeholder="اختر المدينة"
                  options={cities.map((c) => ({
                    value: c.nameAr,
                    label: c.nameAr,
                  }))}
                  value={field.value || ""}
                  onValueChange={field.onChange}
                  error={errors.city?.message}
                />
              )}
            />
          </div>

          {/* Area */}
          <div>
            <Input
              label="المنطقة / الحي"
              placeholder="أدخل اسم المنطقة"
              leftIcon={<Home className="w-4 h-4" />}
              error={errors.area?.message}
              {...register("area")}
              aria-required="true"
              aria-label="المنطقة"
            />
          </div>

          {/* Street */}
          <div>
            <Input
              label="الشارع"
              placeholder="أدخل اسم الشارع"
              leftIcon={<Building2 className="w-4 h-4" />}
              error={errors.street?.message}
              {...register("street")}
              aria-required="true"
              aria-label="الشارع"
            />
          </div>

          {/* Building, Floor, Apartment - Inline */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <Input
                label="رقم المبنى"
                placeholder="رقم المبنى"
                error={errors.buildingNumber?.message}
                {...register("buildingNumber")}
              />
            </div>
            <div>
              <Input
                label="الدور"
                placeholder="رقم الدور"
                error={errors.floor?.message}
                {...register("floor")}
              />
            </div>
            <div>
              <Input
                label="الشقة"
                placeholder="رقم الشقة"
                error={errors.apartment?.message}
                {...register("apartment")}
              />
            </div>
          </div>

          {/* Landmark */}
          <div>
            <Input
              label="علامة مميزة (اختياري)"
              placeholder="مثال: بجوار مسجد..."
              leftIcon={<MapPin className="w-4 h-4" />}
              error={errors.landmark?.message}
              {...register("landmark")}
            />
          </div>

          {/* Set as Default */}
          <div>
            <Checkbox
              label="حفظ العنوان كافتراضي"
              error={errors.isDefault?.message}
              {...register("isDefault")}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-accent text-white text-sm font-medium rounded-sm hover:bg-accent-hover transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "جاري الحفظ..." : "حفظ العنوان"}
          </button>
        </form>
      </div>
    </div>
  );
}

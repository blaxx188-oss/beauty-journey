"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { MapPin, Save, X, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { DashboardHeader } from "@/components/account/DashboardHeader";
import { Button } from "@/components/design-system/core/Button";
import { Input } from "@/components/design-system/core/Input";
import { Checkbox } from "@/components/design-system/core/Checkbox";

const addressSchema = z.object({
  title: z.string().min(2, "يرجى تسمية العنوان (مثلاً: المنزل، العمل)"),
  name: z.string().min(3, "الاسم الكامل مطلوب"),
  phone: z.string().min(10, "رقم الهاتف غير صالح"),
  city: z.string().min(2, "المدينة مطلوبة"),
  area: z.string().min(2, "المنطقة مطلوبة"),
  details: z.string().min(5, "تفاصيل العنوان مطلوبة"),
  isDefault: z.boolean(),
});

type AddressFormValues = z.infer<typeof addressSchema>;

export default function AddAddressPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      isDefault: false,
    },
  });

  const onSubmit = async (data: AddressFormValues) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    // console.log("New Address:", data);
    setIsSubmitting(false);
    router.push("/account/addresses");
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 text-sm text-text-secondary">
        <Link href="/account/addresses" className="hover:text-accent">عناوين التوصيل</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-text-primary">إضافة عنوان جديد</span>
      </div>

      <DashboardHeader 
        title="إضافة عنوان جديد" 
        description="أضيفي تفاصيل عنوان الشحن الجديد لتسهيل عملية التوصيل."
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-neutral-primary rounded-2xl border border-border shadow-sm p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-bold text-text-primary">تسمية العنوان (مثلاً: المنزل، العمل)</label>
              <Input 
                {...register("title")}
                placeholder="أدخلي اسماً للعنوان"
                className={errors.title ? "border-red-500" : ""}
              />
              {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-text-primary">الاسم الكامل للمستلم</label>
              <Input 
                {...register("name")}
                placeholder="اسم الشخص الذي سيستلم الطلب"
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-text-primary">رقم الهاتف</label>
              <Input 
                {...register("phone")}
                placeholder="01xxxxxxxxx"
                className={errors.phone ? "border-red-500" : ""}
              />
              {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-text-primary">المدينة</label>
              <Input 
                {...register("city")}
                placeholder="مثال: القاهرة"
                className={errors.city ? "border-red-500" : ""}
              />
              {errors.city && <p className="text-xs text-red-500">{errors.city.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-text-primary">المنطقة</label>
              <Input 
                {...register("area")}
                placeholder="مثال: المعادي"
                className={errors.area ? "border-red-500" : ""}
              />
              {errors.area && <p className="text-xs text-red-500">{errors.area.message}</p>}
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-bold text-text-primary">العنوان بالتفصيل</label>
              <Input 
                {...register("details")}
                placeholder="رقم الشارع، رقم العمارة، رقم الشقة"
                className={errors.details ? "border-red-500" : ""}
              />
              {errors.details && <p className="text-xs text-red-500">{errors.details.message}</p>}
            </div>

            <div className="md:col-span-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <Checkbox {...register("isDefault")} />
                <span className="text-sm text-text-secondary">تعيين كعنوان افتراضي للشحن</span>
              </label>
            </div>
          </div>
        </motion.div>

        <div className="flex items-center justify-end gap-4">
          <Link href="/account/addresses">
            <Button type="button" variant="outline" className="gap-2">
              <X className="w-4 h-4" />
              إلغاء
            </Button>
          </Link>
          <Button 
            type="submit" 
            className="bg-accent hover:bg-accent/90 text-white gap-2 min-w-[120px]"
            isLoading={isSubmitting}
          >
            <Save className="w-4 h-4" />
            حفظ العنوان
          </Button>
        </div>
      </form>
    </div>
  );
}

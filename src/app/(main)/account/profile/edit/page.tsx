"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Camera, Save, X, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useAuth } from "@/lib/auth-context";
import { DashboardHeader } from "@/components/account/DashboardHeader";
import { Button } from "@/components/design-system/core/Button";
import { Input } from "@/components/design-system/core/Input";
import { Avatar } from "@/components/design-system/core/Avatar";

const profileSchema = z.object({
  full_name: z.string().min(3, "الاسم يجب أن يكون 3 أحرف على الأقل"),
  email: z.string().email("البريد الإلكتروني غير صالح"),
  phone: z.string().min(10, "رقم الهاتف غير صالح"),
  city: z.string().min(2, "يرجى تحديد المدينة"),
  birthdate: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function EditProfilePage() {
  const { user } = useAuth();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      full_name: user?.user_metadata?.full_name || "",
      email: user?.email || "",
      phone: user?.user_metadata?.phone || "01012345678",
      city: user?.user_metadata?.city || "القاهرة",
      birthdate: user?.user_metadata?.birthdate || "1995-05-15",
    },
  });

  const onSubmit = async (data: ProfileFormValues) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    // console.log("Updated Profile:", data);
    setIsSubmitting(false);
    router.push("/account/profile");
  };

  if (!user) return null;

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 text-sm text-text-secondary">
        <Link href="/account/profile" className="hover:text-accent">الملف الشخصي</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-text-primary">تعديل</span>
      </div>

      <DashboardHeader 
        title="تعديل الملف الشخصي" 
        description="قومي بتحديث بياناتك الشخصية وصورة ملفك الشخصي."
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-neutral-primary rounded-2xl border border-border shadow-sm p-8"
        >
          {/* Avatar Upload */}
          <div className="flex flex-col items-center gap-4 mb-8">
            <div className="relative group">
              <Avatar 
                size="2xl" 
                alt={user.user_metadata?.full_name}
                className="border-4 border-neutral-secondary group-hover:opacity-80 transition-opacity"
              />
              <button 
                type="button"
                className="absolute bottom-0 left-0 bg-accent text-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-text-secondary">انقري لتغيير صورة الملف الشخصي</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-text-primary">الاسم الكامل</label>
              <Input 
                {...register("full_name")}
                placeholder="أدخلي اسمك الكامل"
                className={errors.full_name ? "border-red-500" : ""}
              />
              {errors.full_name && (
                <p className="text-xs text-red-500">{errors.full_name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-text-primary">البريد الإلكتروني</label>
              <Input 
                {...register("email")}
                placeholder="example@email.com"
                disabled
                className="bg-neutral-secondary/30 cursor-not-allowed"
              />
              <p className="text-[10px] text-text-secondary">لا يمكن تغيير البريد الإلكتروني الأساسي.</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-text-primary">رقم الهاتف</label>
              <Input 
                {...register("phone")}
                placeholder="01xxxxxxxxx"
                className={errors.phone ? "border-red-500" : ""}
              />
              {errors.phone && (
                <p className="text-xs text-red-500">{errors.phone.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-text-primary">المدينة</label>
              <Input 
                {...register("city")}
                placeholder="مثال: القاهرة"
                className={errors.city ? "border-red-500" : ""}
              />
              {errors.city && (
                <p className="text-xs text-red-500">{errors.city.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-text-primary">تاريخ الميلاد</label>
              <Input 
                {...register("birthdate")}
                type="date"
                className={errors.birthdate ? "border-red-500" : ""}
              />
            </div>
          </div>
        </motion.div>

        <div className="flex items-center justify-end gap-4">
          <Link href="/account/profile">
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
            حفظ التغييرات
          </Button>
        </div>
      </form>
    </div>
  );
}

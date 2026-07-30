"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Key, Save, X, ChevronRight, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { DashboardHeader } from "@/components/account/DashboardHeader";
import { Button } from "@/components/design-system/core/Button";
import { Input } from "@/components/design-system/core/Input";

const passwordSchema = z.object({
  currentPassword: z.string().min(6, "كلمة المرور الحالية مطلوبة"),
  newPassword: z.string().min(8, "كلمة المرور الجديدة يجب أن تكون 8 أحرف على الأقل"),
  confirmPassword: z.string().min(8, "تأكيد كلمة المرور مطلوب"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "كلمات المرور غير متطابقة",
  path: ["confirmPassword"],
});

type PasswordFormValues = z.infer<typeof passwordSchema>;

export default function ChangePasswordPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [showCurrent, setShowCurrent] = React.useState(false);
  const [showNew, setShowNew] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
  });

  const onSubmit = async (data: PasswordFormValues) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Password Changed");
    setIsSubmitting(false);
    alert("تم تغيير كلمة المرور بنجاح!");
    router.push("/account/security");
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 text-sm text-text-secondary">
        <Link href="/account/security" className="hover:text-accent">الأمان</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-text-primary">تغيير كلمة المرور</span>
      </div>

      <DashboardHeader 
        title="تغيير كلمة المرور" 
        description="قومي بتحديث كلمة المرور الخاصة بكِ لضمان أمان حسابك."
      />

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl space-y-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-neutral-primary rounded-2xl border border-border shadow-sm p-8 space-y-6"
        >
          <div className="space-y-2">
            <label className="text-sm font-bold text-text-primary">كلمة المرور الحالية</label>
            <div className="relative">
              <Input 
                {...register("currentPassword")}
                type={showCurrent ? "text" : "password"}
                placeholder="أدخلي كلمة المرور الحالية"
                className={errors.currentPassword ? "border-red-500 pr-10" : "pr-10"}
              />
              <button 
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-accent"
              >
                {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.currentPassword && <p className="text-xs text-red-500">{errors.currentPassword.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-text-primary">كلمة المرور الجديدة</label>
            <div className="relative">
              <Input 
                {...register("newPassword")}
                type={showNew ? "text" : "password"}
                placeholder="أدخلي كلمة المرور الجديدة"
                className={errors.newPassword ? "border-red-500 pr-10" : "pr-10"}
              />
              <button 
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-accent"
              >
                {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.newPassword && <p className="text-xs text-red-500">{errors.newPassword.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-text-primary">تأكيد كلمة المرور الجديدة</label>
            <Input 
              {...register("confirmPassword")}
              type="password"
              placeholder="أعيدي إدخال كلمة المرور الجديدة"
              className={errors.confirmPassword ? "border-red-500" : ""}
            />
            {errors.confirmPassword && <p className="text-xs text-red-500">{errors.confirmPassword.message}</p>}
          </div>

          <div className="bg-neutral-secondary/20 p-4 rounded-xl">
            <h4 className="text-xs font-bold text-text-primary mb-2">متطلبات كلمة المرور:</h4>
            <ul className="text-[10px] text-text-secondary space-y-1 list-disc list-inside">
              <li>8 أحرف على الأقل.</li>
              <li>يجب أن تحتوي على حرف كبير وحرف صغير.</li>
              <li>يجب أن تحتوي على رقم واحد على الأقل.</li>
            </ul>
          </div>
        </motion.div>

        <div className="flex items-center justify-end gap-4">
          <Link href="/account/security">
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
            تحديث كلمة المرور
          </Button>
        </div>
      </form>
    </div>
  );
}

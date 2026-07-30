"use client";

/**
 * Reset Password Page — Set a new password after recovery.
 */

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { z } from "zod";

import { useUpdatePassword } from "@/hooks/use-auth-actions";
import { Input } from "@/components/design-system/core/Input";
import { Button } from "@/components/design-system/core/Button";

const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(8, "يجب أن تكون كلمة المرور 8 أحرف على الأقل")
    .regex(/[a-z]/, "يجب أن تحتوي على حرف صغير واحد على الأقل")
    .regex(/[A-Z]/, "يجب أن تحتوي على حرف كبير واحد على الأقل")
    .regex(/\d/, "يجب أن تحتوي على رقم واحد على الأقل"),
  confirmPassword: z.string().min(1, "تأكيد كلمة المرور مطلوب"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "كلمة المرور غير متطابقة",
  path: ["confirmPassword"],
});

type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const updatePassword = useUpdatePassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const onSubmit = (data: ResetPasswordInput) => {
    updatePassword.mutate(data.password);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      className="bg-white dark:bg-neutral-primary p-8 rounded-2xl shadow-xl border border-border"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="text-center mb-8">
        <motion.h1 
          className="text-2xl md:text-3xl font-bold text-text-primary mb-2"
          variants={itemVariants}
        >
          تعيين كلمة مرور جديدة
        </motion.h1>
        <motion.p 
          className="text-text-secondary"
          variants={itemVariants}
        >
          يرجى اختيار كلمة مرور قوية لم تستخدمها من قبل
        </motion.p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <motion.div variants={itemVariants}>
          <div className="relative">
            <Input
              label="كلمة المرور الجديدة"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              {...register("password")}
              error={errors.password?.message}
              leftIcon={<Lock className="w-5 h-5" />}
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute left-3 top-[38px] text-text-secondary hover:text-accent transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Input
            label="تأكيد كلمة المرور"
            type="password"
            placeholder="••••••••"
            {...register("confirmPassword")}
            error={errors.confirmPassword?.message}
            leftIcon={<Lock className="w-5 h-5" />}
            autoComplete="new-password"
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <Button
            type="submit"
            className="w-full h-12 text-lg font-bold bg-accent hover:bg-accent/90 text-white"
            isLoading={updatePassword.isPending}
            disabled={updatePassword.isPending}
          >
            تحديث كلمة المرور
          </Button>
        </motion.div>
      </form>
    </motion.div>
  );
}

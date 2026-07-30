"use client";

/**
 * Forgot Password Page — Request password reset email.
 */

import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Mail, ArrowRight, KeyRound } from "lucide-react";
import { z } from "zod";

import { useResetPassword } from "@/hooks/use-auth-actions";
import { Input } from "@/components/design-system/core/Input";
import { Button } from "@/components/design-system/core/Button";

const forgotPasswordSchema = z.object({
  email: z.string().min(1, "البريد الإلكتروني مطلوب").email("صيغة غير صحيحة"),
});

type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const resetPassword = useResetPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = (data: ForgotPasswordInput) => {
    resetPassword.mutate(data.email);
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
        <motion.div 
          className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4"
          variants={itemVariants}
        >
          <KeyRound className="w-8 h-8 text-accent" />
        </motion.div>
        <motion.h1 
          className="text-2xl md:text-3xl font-bold text-text-primary mb-2"
          variants={itemVariants}
        >
          نسيت كلمة المرور؟
        </motion.h1>
        <motion.p 
          className="text-text-secondary"
          variants={itemVariants}
        >
          أدخل بريدك الإلكتروني وسنرسل لك رابطاً لاستعادة الوصول إلى حسابك
        </motion.p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <motion.div variants={itemVariants}>
          <Input
            label="البريد الإلكتروني"
            placeholder="example@mail.com"
            {...register("email")}
            error={errors.email?.message}
            leftIcon={<Mail className="w-5 h-5" />}
            autoComplete="email"
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <Button
            type="submit"
            className="w-full h-12 text-lg font-bold bg-accent hover:bg-accent/90 text-white"
            isLoading={resetPassword.isPending}
            disabled={resetPassword.isPending}
          >
            إرسال رابط الاستعادة
          </Button>
        </motion.div>
      </form>

      <motion.div 
        className="mt-8 text-center"
        variants={itemVariants}
      >
        <Link
          href="/login"
          className="text-text-secondary hover:text-accent font-medium flex items-center justify-center gap-2"
        >
          <ArrowRight className="w-4 h-4" />
          العودة لتسجيل الدخول
        </Link>
      </motion.div>
    </motion.div>
  );
}

"use client";

/**
 * Register Page — User sign-up form.
 */

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { User, Mail, Lock, Phone, UserPlus, Eye, EyeOff } from "lucide-react";

import { registerSchema, type RegisterInput } from "@/lib/schemas";
import { useSignUp } from "@/hooks/use-auth-actions";
import { Input } from "@/components/design-system/core/Input";
import { Button } from "@/components/design-system/core/Button";
import { Checkbox } from "@/components/design-system/core/Checkbox";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const signUp = useSignUp();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
    },
  });

  const password = watch("password", "");

  const onSubmit = (data: RegisterInput) => {
    signUp.mutate({
      email: data.email,
      password: data.password,
      fullName: data.fullName,
      phoneNumber: data.phoneNumber,
    });
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

  // Password strength calculation (simplified)
  const getPasswordStrength = (pwd: string) => {
    if (!pwd) return 0;
    let strength = 0;
    if (pwd.length >= 8) strength += 25;
    if (/[A-Z]/.test(pwd)) strength += 25;
    if (/[0-9]/.test(pwd)) strength += 25;
    if (/[^A-Za-z0-9]/.test(pwd)) strength += 25;
    return strength;
  };

  const strength = getPasswordStrength(password);

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
          إنشاء حساب جديد
        </motion.h1>
        <motion.p 
          className="text-text-secondary"
          variants={itemVariants}
        >
          انضمي إلى رحلة الجمال الخاصة بك اليوم
        </motion.p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <motion.div variants={itemVariants}>
          <Input
            label="الاسم الكامل"
            placeholder="الاسم الأول واسم العائلة"
            {...register("fullName")}
            error={errors.fullName?.message}
            leftIcon={<User className="w-5 h-5" />}
            autoComplete="name"
          />
        </motion.div>

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
          <Input
            label="رقم الهاتف (اختياري)"
            placeholder="01xxxxxxxxx"
            {...register("phoneNumber")}
            error={errors.phoneNumber?.message}
            leftIcon={<Phone className="w-5 h-5" />}
            autoComplete="tel"
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <div className="relative">
            <Input
              label="كلمة المرور"
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
          
          {/* Password Strength Indicator */}
          {password && (
            <div className="mt-2">
              <div className="h-1.5 w-full bg-neutral-secondary rounded-full overflow-hidden">
                <motion.div
                  className={`h-full ${
                    strength <= 25 ? "bg-red-500" : 
                    strength <= 50 ? "bg-yellow-500" : 
                    strength <= 75 ? "bg-blue-500" : "bg-green-500"
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: `${strength}%` }}
                />
              </div>
              <p className="text-[10px] text-text-secondary mt-1 text-left">
                {strength <= 25 ? "ضعيفة" : 
                 strength <= 50 ? "متوسطة" : 
                 strength <= 75 ? "جيدة" : "قوية جداً"}
              </p>
            </div>
          )}
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

        <motion.div 
          className="flex items-start gap-2 text-sm"
          variants={itemVariants}
        >
          <Checkbox id="terms" required />
          <label htmlFor="terms" className="text-text-secondary leading-tight cursor-pointer">
            أوافق على{" "}
            <Link href="/terms-and-conditions" className="text-accent hover:underline">الشروط والأحكام</Link>
            {" "}و{" "}
            <Link href="/privacy-policy" className="text-accent hover:underline">سياسة الخصوصية</Link>
          </label>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Button
            type="submit"
            className="w-full h-12 text-lg font-bold bg-accent hover:bg-accent/90 text-white"
            isLoading={signUp.isPending}
            disabled={signUp.isPending}
          >
            <UserPlus className="w-5 h-5 ml-2" />
            إنشاء حساب
          </Button>
        </motion.div>
      </form>

      <motion.p 
        className="mt-8 text-center text-text-secondary"
        variants={itemVariants}
      >
        لديك حساب بالفعل؟{" "}
        <Link
          href="/login"
          className="text-accent font-bold hover:underline"
        >
          تسجيل الدخول
        </Link>
      </motion.p>
    </motion.div>
  );
}

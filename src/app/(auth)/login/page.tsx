"use client";

/**
 * Login Page — User sign-in form with email and password.
 */

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Eye, EyeOff, LogIn, Mail, Lock } from "lucide-react";

import { loginSchema, type LoginInput } from "@/lib/schemas";
import { useSignIn } from "@/hooks/use-auth-actions";
import { Input } from "@/components/design-system/core/Input";
import { Button } from "@/components/design-system/core/Button";
import { Checkbox } from "@/components/design-system/core/Checkbox";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const signIn = useSignIn();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginInput) => {
    signIn.mutate(data);
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
          تسجيل الدخول
        </motion.h1>
        <motion.p 
          className="text-text-secondary"
          variants={itemVariants}
        >
          مرحباً بك مرة أخرى في عالم الجمال
        </motion.p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
          <div className="relative">
            <Input
              label="كلمة المرور"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              {...register("password")}
              error={errors.password?.message}
              leftIcon={<Lock className="w-5 h-5" />}
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute left-3 top-[38px] text-text-secondary hover:text-accent transition-colors"
              aria-label={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </motion.div>

        <motion.div 
          className="flex items-center justify-between text-sm"
          variants={itemVariants}
        >
          <label className="flex items-center gap-2 cursor-pointer group">
            <Checkbox />
            <span className="text-text-secondary group-hover:text-text-primary transition-colors">
              تذكرني
            </span>
          </label>
          <Link
            href="/forgot-password"
            className="text-accent hover:underline font-medium"
          >
            نسيت كلمة المرور؟
          </Link>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Button
            type="submit"
            className="w-full h-12 text-lg font-bold bg-accent hover:bg-accent/90 text-white"
            isLoading={signIn.isPending}
            disabled={signIn.isPending}
          >
            <LogIn className="w-5 h-5 ml-2" />
            تسجيل الدخول
          </Button>
        </motion.div>
      </form>

      <motion.div 
        className="mt-8 pt-6 border-t border-border text-center"
        variants={itemVariants}
      >
        <p className="text-text-secondary mb-4">أو تسجيل الدخول بواسطة</p>
        <div className="flex gap-4 justify-center">
          <Button
            variant="outline"
            className="flex-1 h-11 border-border hover:bg-neutral-secondary"
            onClick={() => {}} // Handle Google Auth
          >
            Google
          </Button>
        </div>
      </motion.div>

      <motion.p 
        className="mt-8 text-center text-text-secondary"
        variants={itemVariants}
      >
        ليس لديك حساب؟{" "}
        <Link
          href="/register"
          className="text-accent font-bold hover:underline"
        >
          إنشاء حساب جديد
        </Link>
      </motion.p>
    </motion.div>
  );
}

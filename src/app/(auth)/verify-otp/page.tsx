"use client";

/**
 * Verify OTP Page — Phone verification via SMS code.
 */

import React, { useState, Suspense } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Smartphone, ArrowRight, RefreshCw } from "lucide-react";
import { z } from "zod";
import { useSearchParams, useRouter } from "next/navigation";

import { verifyOTP } from "@/services/auth-service";
import { useToast } from "@/components/design-system/core/Toast";
import { Input } from "@/components/design-system/core/Input";
import { Button } from "@/components/design-system/core/Button";

const otpSchema = z.object({
  otp: z.string().length(6, "رمز التحقق يجب أن يتكون من 6 أرقام"),
});

type OTPInput = z.infer<typeof otpSchema>;

function VerifyOTPContent() {
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();
  
  const phone = searchParams.get("phone") || "";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OTPInput>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" },
  });

  const onSubmit = async (data: OTPInput) => {
    if (!phone) {
      toast({ title: "خطأ", message: "رقم الهاتف غير موجود", variant: "error" });
      return;
    }

    setIsLoading(true);
    try {
      const result = await verifyOTP(phone, data.otp);
      if (result.error) {
        toast({ title: "فشل التحقق", message: result.error, variant: "error" });
      } else {
        toast({ title: "تم التحقق", message: "تم تفعيل رقم الهاتف بنجاح", variant: "success" });
        router.push("/success");
      }
    } catch (err: any) {
      toast({ title: "خطأ", message: err.message, variant: "error" });
    } finally {
      setIsLoading(false);
    }
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
      className="bg-white dark:bg-neutral-primary p-8 rounded-2xl shadow-xl border border-border text-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div 
        className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4"
        variants={itemVariants}
      >
        <Smartphone className="w-8 h-8 text-accent" />
      </motion.div>

      <motion.h1 
        className="text-2xl md:text-3xl font-bold text-text-primary mb-2"
        variants={itemVariants}
      >
        تأكيد رقم الهاتف
      </motion.h1>
      
      <motion.p 
        className="text-text-secondary mb-8"
        variants={itemVariants}
      >
        أدخل رمز التحقق المكون من 6 أرقام المرسل إلى <span dir="ltr" className="font-bold text-text-primary">{phone}</span>
      </motion.p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <motion.div variants={itemVariants}>
          <Input
            label="رمز التحقق"
            placeholder="000000"
            className="text-center text-2xl tracking-[0.5em] font-bold"
            {...register("otp")}
            error={errors.otp?.message}
            maxLength={6}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <Button
            type="submit"
            className="w-full h-12 text-lg font-bold bg-accent hover:bg-accent/90 text-white"
            isLoading={isLoading}
            disabled={isLoading}
          >
            تأكيد الرمز
          </Button>
        </motion.div>
      </form>

      <motion.div 
        className="mt-8 flex flex-col gap-4"
        variants={itemVariants}
      >
        <button
          type="button"
          className="text-accent hover:underline font-medium flex items-center justify-center gap-2"
          onClick={() => {}} // Resend logic
        >
          إعادة إرسال الرمز
        </button>

        <button
          onClick={() => router.back()}
          className="text-text-secondary hover:text-accent font-medium flex items-center justify-center gap-2"
        >
          <ArrowRight className="w-4 h-4" />
          تغيير رقم الهاتف
        </button>
      </motion.div>
    </motion.div>
  );
}

export default function VerifyOTPPage() {
  return (
    <Suspense fallback={<div className="text-center py-20">جاري التحميل...</div>}>
      <VerifyOTPContent />
    </Suspense>
  );
}

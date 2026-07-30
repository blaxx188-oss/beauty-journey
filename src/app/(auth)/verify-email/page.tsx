"use client";

/**
 * Verify Email Page — Instructions after registration.
 */

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, ArrowRight, RefreshCw } from "lucide-react";

import { Button } from "@/components/design-system/core/Button";

export default function VerifyEmailPage() {
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
        className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6"
        variants={itemVariants}
      >
        <Mail className="w-10 h-10 text-accent" />
      </motion.div>

      <motion.h1 
        className="text-2xl md:text-3xl font-bold text-text-primary mb-4"
        variants={itemVariants}
      >
        تحققي من بريدك الإلكتروني
      </motion.h1>

      <motion.p 
        className="text-text-secondary mb-8 leading-relaxed"
        variants={itemVariants}
      >
        لقد أرسلنا رابط تفعيل إلى بريدك الإلكتروني. يرجى النقر على الرابط لتفعيل حسابك والبدء في التسوق.
      </motion.p>

      <motion.div className="space-y-4" variants={itemVariants}>
        <Button
          variant="outline"
          className="w-full h-12 border-border hover:bg-neutral-secondary flex items-center justify-center gap-2"
          onClick={() => {}} // Re-send logic
        >
          <RefreshCw className="w-4 h-4" />
          إعادة إرسال الرابط
        </Button>

        <Link
          href="/auth/login"
          className="text-accent hover:underline font-medium flex items-center justify-center gap-2"
        >
          <ArrowRight className="w-4 h-4" />
          العودة لتسجيل الدخول
        </Link>
      </motion.div>

      <motion.div 
        className="mt-10 pt-6 border-t border-border text-sm text-text-secondary"
        variants={itemVariants}
      >
        لم تصلك الرسالة؟ تأكدي من ملف البريد العشوائي (Spam)
      </motion.div>
    </motion.div>
  );
}

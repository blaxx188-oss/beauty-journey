"use client";

/**
 * CheckoutFailed — Order failure/error page.
 * Shows error details and retry options.
 * Arabic RTL, mobile-first, responsive, accessible.
 */

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { AlertCircle, RefreshCw, ArrowLeft, ShoppingBag, Headphones } from "lucide-react";

// ============================================
// TYPES
// ============================================

interface CheckoutFailedProps {
  error?: string | null;
  onRetry?: () => void;
}

// ============================================
// COMPONENT
// ============================================

export default function CheckoutFailed({
  error,
  onRetry,
}: CheckoutFailedProps) {
  return (
    <div className="max-w-lg mx-auto text-center space-y-8 py-12">
      {/* Error Animation */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 15,
          delay: 0.1,
        }}
        className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-error/10"
      >
        <motion.div
          initial={{ rotate: -10 }}
          animate={{ rotate: 0 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
        >
          <AlertCircle className="w-10 h-10 text-error" />
        </motion.div>
      </motion.div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-3"
      >
        <h1
          className="text-2xl font-bold text-text-primary"
          style={{ fontFamily: "var(--font-heading-ar)" }}
        >
          لم نتمكن من تأكيد الطلب
        </h1>
        <p className="text-sm text-text-secondary">
          حدث خطأ أثناء معالجة طلبك. نعتذر عن الإزعاج.
        </p>
      </motion.div>

      {/* Error Details */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-error/5 border border-error/20 rounded-sm p-4 text-right"
        >
          <p className="text-sm text-error font-medium mb-1">تفاصيل الخطأ</p>
          <p className="text-xs text-text-secondary">{error}</p>
        </motion.div>
      )}

      {/* Possible Causes */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-surface border border-border rounded-sm p-6 text-right space-y-3"
      >
        <p className="text-sm font-medium text-text-primary">
          الأسباب المحتملة:
        </p>
        <ul className="text-xs text-text-secondary space-y-2 list-disc list-inside">
          <li>مشكلة في الاتصال بالإنترنت</li>
          <li>خطأ في بيانات البطاقة أو طريقة الدفع</li>
          <li>المنتجات غير متوفرة في المخزون</li>
          <li>انتهاء صلاحية كوبون الخصم</li>
        </ul>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="space-y-3 pt-4"
      >
        {onRetry && (
          <button
            onClick={onRetry}
            className="w-full py-3.5 text-center text-sm font-medium bg-accent text-white rounded-sm hover:bg-accent-hover transition-colors duration-150 flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            إعادة المحاولة
          </button>
        )}
        <Link
          href="/checkout"
          className="block w-full py-3.5 text-center text-sm font-medium text-text-primary border border-border rounded-sm hover:bg-neutral-secondary transition-colors duration-150"
        >
          <span className="flex items-center justify-center gap-2">
            <ShoppingBag className="w-4 h-4" />
            العودة إلى صفحة الدفع
          </span>
        </Link>
        <Link
          href="/"
          className="block w-full py-3 text-center text-sm text-text-secondary hover:text-accent transition-colors"
        >
          <span className="flex items-center justify-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            العودة للرئيسية
          </span>
        </Link>
      </motion.div>

      {/* Support */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="pt-6 border-t border-border"
      >
        <p className="text-xs text-text-secondary mb-2">
          تحتاج مساعدة؟
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-1.5 text-xs text-accent hover:text-accent-hover transition-colors"
        >
          <Headphones className="w-3.5 h-3.5" />
          تواصل مع خدمة العملاء
        </Link>
      </motion.div>
    </div>
  );
}

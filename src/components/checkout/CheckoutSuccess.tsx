"use client";

/**
 * CheckoutSuccess — Order confirmation success page.
 * Shows order number, summary, and next steps.
 * Arabic RTL, mobile-first, responsive, accessible.
 */

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, Package, Mail, ShoppingBag, ArrowLeft } from "lucide-react";

// ============================================
// TYPES
// ============================================

interface CheckoutSuccessProps {
  orderNumber: string;
  isCOD: boolean;
  email: string;
}

// ============================================
// COMPONENT
// ============================================

export default function CheckoutSuccess({
  orderNumber,
  isCOD,
  email,
}: CheckoutSuccessProps) {
  return (
    <div className="max-w-lg mx-auto text-center space-y-8 py-12">
      {/* Success Animation */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 15,
          delay: 0.1,
        }}
        className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-success/10"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
        >
          <CheckCircle className="w-10 h-10 text-success" />
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
          تم تأكيد طلبك بنجاح!
        </h1>
        <p className="text-sm text-text-secondary">
          شكراً لثقتك بـ Beauty Journey
        </p>
      </motion.div>

      {/* Order Number */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-surface border border-border rounded-sm p-6 space-y-3"
      >
        <div className="flex items-center justify-center gap-2 text-text-secondary">
          <Package className="w-4 h-4" />
          <span className="text-sm">رقم الطلب</span>
        </div>
        <p className="text-2xl font-bold text-accent tracking-wide">
          {orderNumber}
        </p>
      </motion.div>

      {/* Info Cards */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-4"
      >
        {/* Email Confirmation */}
        <div className="bg-info/5 border border-info/20 rounded-sm p-4 flex items-start gap-3 text-right">
          <Mail className="w-5 h-5 text-info flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-text-primary">
              تأكيد عبر البريد الإلكتروني
            </p>
            <p className="text-xs text-text-secondary mt-1">
              تم إرسال تفاصيل الطلب إلى{" "}
              <span className="font-medium">{email}</span>
            </p>
          </div>
        </div>

        {/* COD Notice */}
        {isCOD && (
          <div className="bg-warning/5 border border-warning/20 rounded-sm p-4 flex items-start gap-3 text-right">
            <Package className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-text-primary">
                الدفع عند الاستلام
              </p>
              <p className="text-xs text-text-secondary mt-1">
                سيتم تحضير طلبك وإرساله لك. الدفع عند الاستلام.
              </p>
            </div>
          </div>
        )}
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="space-y-3 pt-4"
      >
        <Link
          href="/account/orders"
          className="block w-full py-3.5 text-center text-sm font-medium bg-accent text-white rounded-sm hover:bg-accent-hover transition-colors duration-150"
        >
          <span className="flex items-center justify-center gap-2">
            <Package className="w-4 h-4" />
            متابعة الطلبات
          </span>
        </Link>
        <Link
          href="/products"
          className="block w-full py-3.5 text-center text-sm font-medium text-text-primary border border-border rounded-sm hover:bg-neutral-secondary transition-colors duration-150"
        >
          <span className="flex items-center justify-center gap-2">
            <ShoppingBag className="w-4 h-4" />
            متابعة التسوق
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
    </div>
  );
}

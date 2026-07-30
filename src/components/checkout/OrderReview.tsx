"use client";

/**
 * OrderReview — Final order review before placing the order.
 * Shows all order details: items, address, shipping method, payment method.
 * Arabic RTL, mobile-first, responsive, accessible.
 */

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  MapPin,
  Truck,
  CreditCard,
  Banknote,
  Receipt,
  Smartphone,
  Tag,
  FileText,
  Edit3,
  ShoppingBag,
} from "lucide-react";
import type {
  CartItem,
  ShippingAddress,
  ShippingMethod,
  PaymentMethodType,
  OrderTotals,
  AppliedCoupon,
} from "@/types";

// ============================================
// TYPES
// ============================================

interface OrderReviewProps {
  items: CartItem[];
  shippingAddress: ShippingAddress;
  shippingMethod: ShippingMethod;
  paymentMethod: PaymentMethodType;
  totals: OrderTotals;
  coupon: AppliedCoupon | null;
  orderNotes: string;
  onEditStep: (step: "shipping" | "delivery" | "payment") => void;
  onPlaceOrder: () => void;
  onAcceptTerms: (accepted: boolean) => void;
  termsAccepted: boolean;
  isLoading: boolean;
}

// ============================================
// HELPERS
// ============================================

function getShippingMethodLabel(method: ShippingMethod): string {
  const labels: Record<ShippingMethod, string> = {
    standard: "شحن عادي",
    express: "شحن سريع",
    same_day: "توصيل في نفس اليوم",
  };
  return labels[method];
}

function getPaymentMethodLabel(method: PaymentMethodType): string {
  const labels: Record<PaymentMethodType, string> = {
    card: "بطاقة ائتمان / خصم",
    fawry: "فوري",
    cod: "الدفع عند الاستلام",
    mobile_wallet: "محفظة إلكترونية",
  };
  return labels[method];
}

function getPaymentIcon(method: PaymentMethodType) {
  const icons: Record<PaymentMethodType, React.ReactNode> = {
    card: <CreditCard className="w-4 h-4" />,
    fawry: <Receipt className="w-4 h-4" />,
    cod: <Banknote className="w-4 h-4" />,
    mobile_wallet: <Smartphone className="w-4 h-4" />,
  };
  return icons[method];
}

function formatAddress(address: ShippingAddress): string {
  const parts = [
    address.street,
    address.buildingNumber && `مبنى ${address.buildingNumber}`,
    address.floor && `دور ${address.floor}`,
    address.apartment && `شقة ${address.apartment}`,
    address.landmark && `بجوار ${address.landmark}`,
    address.area,
    address.city,
    address.governorate,
  ].filter(Boolean);
  return parts.join("، ");
}

// ============================================
// COMPONENT
// ============================================

export default function OrderReview({
  items,
  shippingAddress,
  shippingMethod,
  paymentMethod,
  totals,
  coupon,
  orderNotes,
  onEditStep,
  onPlaceOrder,
  onAcceptTerms,
  termsAccepted,
  isLoading,
}: OrderReviewProps) {
  return (
    <div className="space-y-6">
      {/* Items Review */}
      <div className="bg-surface border border-border rounded-sm p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-text-primary flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-accent" />
            المنتجات ({items.length})
          </h3>
        </div>

        <div className="space-y-3">
          {items.map((item, index) => (
            <motion.div
              key={item.productId}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center gap-4 pb-3 border-b border-border last:border-b-0 last:pb-0"
            >
              {/* Thumbnail */}
              <div className="relative w-16 h-16 flex-shrink-0 overflow-hidden rounded-sm bg-neutral-secondary">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  sizes="64px"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary line-clamp-1">
                  {item.title}
                </p>
                <p className="text-xs text-text-secondary mt-0.5">
                  {item.quantity} × {item.price} ج.م
                </p>
              </div>

              {/* Total */}
              <p className="text-sm font-semibold text-text-primary flex-shrink-0">
                {(item.price * item.quantity).toFixed(0)} ج.م
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Shipping Address */}
      <div className="bg-surface border border-border rounded-sm p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-text-primary flex items-center gap-2">
            <MapPin className="w-4 h-4 text-accent" />
            عنوان الشحن
          </h3>
          <button
            onClick={() => onEditStep("shipping")}
            className="text-xs text-accent hover:text-accent-hover flex items-center gap-1 transition-colors"
            aria-label="تعديل عنوان الشحن"
          >
            <Edit3 className="w-3 h-3" />
            تعديل
          </button>
        </div>

        <div className="text-sm text-text-primary space-y-1">
          <p className="font-medium">{shippingAddress.fullName}</p>
          <p className="text-text-secondary">
            {formatAddress(shippingAddress)}
          </p>
          <p className="text-text-secondary">{shippingAddress.phoneNumber}</p>
        </div>
      </div>

      {/* Shipping & Payment Methods */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Shipping Method */}
        <div className="bg-surface border border-border rounded-sm p-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-medium text-text-secondary flex items-center gap-2">
              <Truck className="w-3.5 h-3.5" />
              طريقة الشحن
            </h4>
            <button
              onClick={() => onEditStep("delivery")}
              className="text-xs text-accent hover:text-accent-hover flex items-center gap-1 transition-colors"
            >
              <Edit3 className="w-3 h-3" />
              تعديل
            </button>
          </div>
          <p className="text-sm font-medium text-text-primary">
            {getShippingMethodLabel(shippingMethod)}
          </p>
        </div>

        {/* Payment Method */}
        <div className="bg-surface border border-border rounded-sm p-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-medium text-text-secondary flex items-center gap-2">
              {getPaymentIcon(paymentMethod)}
              طريقة الدفع
            </h4>
            <button
              onClick={() => onEditStep("payment")}
              className="text-xs text-accent hover:text-accent-hover flex items-center gap-1 transition-colors"
            >
              <Edit3 className="w-3 h-3" />
              تعديل
            </button>
          </div>
          <p className="text-sm font-medium text-text-primary">
            {getPaymentMethodLabel(paymentMethod)}
          </p>
          {paymentMethod === "cod" && (
            <p className="text-xs text-warning mt-1">
              رسوم إضافية: 25 ج.م
            </p>
          )}
        </div>
      </div>

      {/* Order Notes */}
      {orderNotes && (
        <div className="bg-surface border border-border rounded-sm p-4">
          <h4 className="text-xs font-medium text-text-secondary flex items-center gap-2 mb-2">
            <FileText className="w-3.5 h-3.5" />
            ملاحظات الطلب
          </h4>
          <p className="text-sm text-text-primary">{orderNotes}</p>
        </div>
      )}

      {/* Coupon */}
      {coupon && (
        <div className="bg-success/5 border border-success/20 rounded-sm p-3 flex items-center gap-2">
          <Tag className="w-4 h-4 text-success" />
          <span className="text-sm text-success">
            تم تطبيق كود الخصم: <strong>{coupon.code}</strong> ({coupon.message})
          </span>
        </div>
      )}

      {/* Totals */}
      <div className="bg-surface border border-border rounded-sm p-6 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-text-secondary">المجموع الفرعي</span>
          <span className="font-medium">{totals.subtotal.toFixed(0)} ج.م</span>
        </div>
        {totals.discount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-success">الخصم</span>
            <span className="font-medium text-success">
              -{totals.discount.toFixed(0)} ج.م
            </span>
          </div>
        )}
        <div className="flex justify-between text-sm">
          <span className="text-text-secondary">الشحن</span>
          <span className={`font-medium ${totals.shipping === 0 ? "text-success" : ""}`}>
            {totals.shipping === 0 ? "مجاناً" : `${totals.shipping.toFixed(0)} ج.م`}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-text-secondary">الضريبة (14%)</span>
          <span className="font-medium">{totals.tax.toFixed(0)} ج.م</span>
        </div>
        {paymentMethod === "cod" && (
          <div className="flex justify-between text-sm">
            <span className="text-text-secondary">رسوم الدفع عند الاستلام</span>
            <span className="font-medium">25 ج.م</span>
          </div>
        )}
        <div className="border-t border-border pt-3 flex justify-between">
          <span className="text-base font-bold text-text-primary">
            الإجمالي
          </span>
          <span className="text-xl font-bold text-accent">
            {totals.grandTotal.toFixed(0)} ج.م
          </span>
        </div>
      </div>

      {/* Terms & Conditions */}
      <div className="space-y-3">
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={termsAccepted}
            onChange={(e) => onAcceptTerms(e.target.checked)}
            className="w-4 h-4 mt-0.5 accent-accent rounded-sm"
            aria-label="أوافق على الشروط والأحكام وسياسة الخصوصية"
          />
          <span className="text-sm text-text-secondary leading-relaxed">
            أوافق على{" "}
            <a href="/terms-and-conditions" className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">
              الشروط والأحكام
            </a>{" "}
            و{" "}
            <a href="/privacy-policy" className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">
              سياسة الخصوصية
            </a>{" "}
            الخاصة بـ Beauty Journey
          </span>
        </label>
      </div>

      {/* Place Order Button */}
      <button
        onClick={onPlaceOrder}
        disabled={!termsAccepted || isLoading}
        className={`
          w-full py-4 text-sm font-semibold rounded-sm transition-all duration-200
          ${
            termsAccepted && !isLoading
              ? "bg-accent text-white hover:bg-accent-hover active:scale-[0.98] shadow-md"
              : "bg-disabled text-white cursor-not-allowed"
          }
        `}
        aria-label="تأكيد الطلب"
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            جاري تأكيد الطلب...
          </span>
        ) : (
          "تأكيد الطلب"
        )}
      </button>

      {/* Order security note */}
      <p className="text-center text-xs text-text-secondary">
        طلبك آمن ومحمي بالكامل 🔒
      </p>
    </div>
  );
}

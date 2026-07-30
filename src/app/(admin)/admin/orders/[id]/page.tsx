"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  ArrowRight, 
  Printer, 
  Truck, 
  CreditCard, 
  User, 
  MapPin, 
  Phone, 
  Mail,
  ChevronDown,
  AlertCircle
} from "lucide-react";
import { AdminPageHeader } from "@/components/admin/shared/AdminPageHeader";
import { Button } from "@/components/design-system/core/Button";
import { OrderStatusBadge } from "@/components/admin/orders/OrderStatusBadge";
import { OrderTimeline } from "@/components/admin/orders/OrderTimeline";
import { ADMIN_MOCK_ORDERS } from "@/data/admin-mock-data";
import { formatDate } from "@/utils/format";
import { Divider } from "@/components/design-system/core/Divider";

export default function OrderDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const order = ADMIN_MOCK_ORDERS.find(o => o.id === id);

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <AlertCircle className="w-12 h-12 text-text-secondary" />
        <h2 className="text-xl font-bold">الطلب غير موجود</h2>
        <Button onClick={() => router.push("/admin/orders")}>العودة للطلبات</Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <AdminPageHeader 
        title={`طلب #${order.id}`}
        breadcrumbs={[
          { label: "الطلبات", href: "/admin/orders" },
          { label: `تفاصيل الطلب #${order.id}` }
        ]}
        action={
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <Printer className="w-4 h-4" />
              طباعة الفاتورة
            </Button>
            <Button className="gap-2 bg-accent text-white">
              تحديث الحالة
              <ChevronDown className="w-4 h-4" />
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-8">
          {/* Order Summary Card */}
          <div className="bg-white dark:bg-neutral-primary rounded-3xl border border-border shadow-sm overflow-hidden">
            <div className="p-6 border-b border-border bg-neutral-secondary/10 flex items-center justify-between">
              <h3 className="font-bold text-text-primary flex items-center gap-2">
                <Truck className="w-5 h-5 text-accent" />
                تفاصيل الشحن والمنتجات
              </h3>
              <OrderStatusBadge status={order.status as any} />
            </div>
            <div className="p-8">
              <table className="w-full text-right">
                <thead>
                  <tr className="text-sm text-text-secondary border-b border-border">
                    <th className="pb-4 font-bold">المنتج</th>
                    <th className="pb-4 font-bold">الكمية</th>
                    <th className="pb-4 font-bold text-left">السعر</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {/* Mock items since they weren't in the main mock data */}
                  {[1, 2].map((_, i) => (
                    <tr key={i} className="text-sm">
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg bg-neutral-secondary/50" />
                          <div>
                            <p className="font-bold text-text-primary">منتج تجريبي {i + 1}</p>
                            <p className="text-[10px] text-text-secondary">SKU-00{i + 1}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 font-bold">1</td>
                      <td className="py-4 text-left font-black text-accent">{(order.subtotal / 2).toFixed(2)} ج.م</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="mt-8 space-y-3 max-w-xs mr-auto">
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">المجموع الفرعي</span>
                  <span className="font-bold">{order.subtotal} ج.م</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">الضريبة</span>
                  <span className="font-bold">{order.tax} ج.م</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">تكلفة الشحن</span>
                  <span className="font-bold">{order.shippingCost} ج.م</span>
                </div>
                <Divider />
                <div className="flex justify-between text-lg font-black text-accent">
                  <span>الإجمالي</span>
                  <span>{order.total} ج.م</span>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline Card */}
          <div className="bg-white dark:bg-neutral-primary rounded-3xl border border-border shadow-sm overflow-hidden">
            <div className="p-6 border-b border-border bg-neutral-secondary/10">
              <h3 className="font-bold text-text-primary">سجل تتبع الطلب</h3>
            </div>
            <div className="p-8">
              <OrderTimeline events={order.timeline as any} />
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-8">
          {/* Customer Info */}
          <div className="bg-white dark:bg-neutral-primary rounded-3xl border border-border shadow-sm overflow-hidden">
            <div className="p-6 border-b border-border bg-neutral-secondary/10">
              <h3 className="font-bold text-text-primary flex items-center gap-2">
                <User className="w-5 h-5 text-accent" />
                العميل
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold">
                  {order.customerName.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-sm">{order.customerName}</p>
                  <p className="text-xs text-text-secondary">{order.customerEmail}</p>
                </div>
              </div>
              <Divider />
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                  <Phone className="w-4 h-4" />
                  <span>{order.shippingAddress.phoneNumber}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                  <Mail className="w-4 h-4" />
                  <span>{order.customerEmail}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-white dark:bg-neutral-primary rounded-3xl border border-border shadow-sm overflow-hidden">
            <div className="p-6 border-b border-border bg-neutral-secondary/10">
              <h3 className="font-bold text-text-primary flex items-center gap-2">
                <MapPin className="w-5 h-5 text-accent" />
                عنوان الشحن
              </h3>
            </div>
            <div className="p-6 space-y-2">
              <p className="text-sm font-bold text-text-primary">{order.shippingAddress.fullName}</p>
              <p className="text-sm text-text-secondary leading-relaxed">
                {order.shippingAddress.governorate}, {order.shippingAddress.city}, {order.shippingAddress.area}
                <br />
                {order.shippingAddress.street}
              </p>
            </div>
          </div>

          {/* Payment Info */}
          <div className="bg-white dark:bg-neutral-primary rounded-3xl border border-border shadow-sm overflow-hidden">
            <div className="p-6 border-b border-border bg-neutral-secondary/10">
              <h3 className="font-bold text-text-primary flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-accent" />
                الدفع
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-secondary">طريقة الدفع</span>
                <span className="text-sm font-bold">{order.paymentMethod === 'cod' ? 'دفع عند الاستلام' : 'بطاقة ائتمان'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-secondary">حالة الدفع</span>
                <OrderStatusBadge status={order.paymentStatus as any} type="payment" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import { useParams } from "next/navigation";
import { 
  ChevronRight, 
  Package, 
  Truck, 
  MapPin, 
  CreditCard, 
  Download,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

import { DashboardHeader } from "@/components/account/DashboardHeader";
import { Button } from "@/components/design-system/core/Button";
import { Badge } from "@/components/design-system/core/Badge";
import { Divider } from "@/components/design-system/core/Divider";

export default function OrderDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  // Mock data for a single order
  const order = {
    id,
    date: "2024-03-25",
    status: "shipped",
    statusText: "تم الشحن",
    paymentMethod: "بطاقة ائتمان (**** 4242)",
    address: {
      name: "سارة أحمد",
      phone: "01012345678",
      city: "القاهرة",
      area: "المعادي",
      details: "شارع 9، عمارة 15، شقة 4"
    },
    items: [
      {
        id: 1,
        name: "سيروم فيتامين سي للوجه",
        brand: "The Ordinary",
        price: 450,
        quantity: 1,
        image: "/images/placeholders/product.svg"
      },
      {
        id: 2,
        name: "كريم مرطب ليلي",
        brand: "CeraVe",
        price: 600,
        quantity: 2,
        image: "/images/placeholders/product.svg"
      }
    ],
    summary: {
      subtotal: 1650,
      shipping: 50,
      discount: 100,
      total: 1600
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 text-sm text-text-secondary">
        <Link href="/account/orders" className="hover:text-accent">طلباتي</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-text-primary">{id}</span>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <DashboardHeader 
          title={`تفاصيل الطلب ${id}`} 
          description={`تم إجراء الطلب في ${order.date}`}
        />
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 text-xs">
            <Download className="w-4 h-4" />
            تحميل الفاتورة
          </Button>
          <Link href={`/account/orders/${id}/track`}>
            <Button className="bg-accent text-white gap-2 text-xs">
              <Truck className="w-4 h-4" />
              تتبع الطلب
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items List */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-neutral-primary rounded-2xl border border-border shadow-sm overflow-hidden"
          >
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h3 className="font-bold text-text-primary">المنتجات ({order.items.length})</h3>
              <Badge variant="default">{order.statusText}</Badge>
            </div>
            <div className="divide-y divide-border">
              {order.items.map((item) => (
                <div key={item.id} className="p-6 flex gap-4">
                  <div className="w-20 h-20 bg-neutral-secondary rounded-xl overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-2">
                      <h4 className="font-bold text-text-primary truncate">{item.name}</h4>
                      <span className="font-bold text-accent">{item.price} ج.م</span>
                    </div>
                    <p className="text-xs text-text-secondary mt-1">{item.brand}</p>
                    <p className="text-xs text-text-secondary mt-2">الكمية: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Delivery Timeline */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-neutral-primary rounded-2xl border border-border shadow-sm p-6"
          >
            <h3 className="font-bold text-text-primary mb-6">تتبع الحالة</h3>
            <div className="space-y-8 relative before:absolute before:right-[19px] before:top-2 before:bottom-2 before:w-0.5 before:bg-neutral-secondary">
              <div className="relative flex items-start gap-6 pr-10">
                <div className="absolute right-0 w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center z-10">
                  <Package className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-text-primary">تم استلام الطلب</h4>
                  <p className="text-xs text-text-secondary mt-1">25 مارس 2024 - 10:30 ص</p>
                </div>
              </div>
              <div className="relative flex items-start gap-6 pr-10">
                <div className="absolute right-0 w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center z-10">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-text-primary">جاري التجهيز</h4>
                  <p className="text-xs text-text-secondary mt-1">26 مارس 2024 - 02:15 م</p>
                </div>
              </div>
              <div className="relative flex items-start gap-6 pr-10">
                <div className="absolute right-0 w-10 h-10 rounded-full bg-neutral-secondary text-text-secondary flex items-center justify-center z-10">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-text-secondary">في الطريق إليك</h4>
                  <p className="text-xs text-text-secondary mt-1">متوقع وصوله في 28 مارس</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          {/* Order Summary */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-neutral-primary rounded-2xl border border-border shadow-sm p-6"
          >
            <h3 className="font-bold text-text-primary mb-4">ملخص الطلب</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">المجموع الفرعي</span>
                <span className="font-medium">{order.summary.subtotal} ج.م</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">الشحن</span>
                <span className="font-medium">{order.summary.shipping} ج.م</span>
              </div>
              <div className="flex justify-between text-sm text-green-600">
                <span>الخصم</span>
                <span>-{order.summary.discount} ج.م</span>
              </div>
              <Divider className="my-2" />
              <div className="flex justify-between text-lg font-bold text-accent">
                <span>الإجمالي</span>
                <span>{order.summary.total} ج.م</span>
              </div>
            </div>
          </motion.div>

          {/* Shipping Address */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-neutral-primary rounded-2xl border border-border shadow-sm p-6"
          >
            <h3 className="font-bold text-text-primary mb-4 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-accent" />
              عنوان التوصيل
            </h3>
            <div className="text-sm space-y-1">
              <p className="font-bold">{order.address.name}</p>
              <p className="text-text-secondary">{order.address.phone}</p>
              <p className="text-text-secondary">{order.address.details}</p>
              <p className="text-text-secondary">{order.address.area}، {order.address.city}</p>
            </div>
          </motion.div>

          {/* Payment Method */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-neutral-primary rounded-2xl border border-border shadow-sm p-6"
          >
            <h3 className="font-bold text-text-primary mb-4 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-accent" />
              طريقة الدفع
            </h3>
            <p className="text-sm text-text-secondary">{order.paymentMethod}</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

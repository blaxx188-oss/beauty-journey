"use client";

import React from "react";
import { useParams } from "next/navigation";
import { 
  ChevronRight, 
  Truck, 
  MapPin, 
  Package, 
  CheckCircle2,
  Clock,
  Navigation
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

import { DashboardHeader } from "@/components/account/DashboardHeader";
import { Button } from "@/components/design-system/core/Button";

export default function OrderTrackingPage() {
  const params = useParams();
  const id = params.id as string;

  const trackingSteps = [
    {
      id: 1,
      title: "تم استلام الطلب",
      location: "المستودع الرئيسي - القاهرة",
      time: "25 مارس 2024 - 10:30 ص",
      status: "completed"
    },
    {
      id: 2,
      title: "جاري تجهيز الطلب",
      location: "مركز التعبئة - الجيزة",
      time: "26 مارس 2024 - 02:15 م",
      status: "completed"
    },
    {
      id: 3,
      title: "تم تسليم الطلب لشركة الشحن",
      location: "مركز التوزيع - المعادي",
      time: "27 مارس 2024 - 09:00 ص",
      status: "current"
    },
    {
      id: 4,
      title: "الطلب في الطريق إليك",
      location: "مندوب التوصيل",
      time: "متوقع اليوم قبل 8 م",
      status: "pending"
    },
    {
      id: 5,
      title: "تم التوصيل",
      location: "عنوانك المسجل",
      time: "--",
      status: "pending"
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 text-sm text-text-secondary">
        <Link href="/account/orders" className="hover:text-accent">طلباتي</Link>
        <ChevronRight className="w-4 h-4" />
        <Link href={`/account/orders/${id}`} className="hover:text-accent">{id}</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-text-primary">تتبع الطلب</span>
      </div>

      <DashboardHeader 
        title={`تتبع الطلب ${id}`} 
        description="تابعي مسار طلبك لحظة بلحظة حتى يصل إلى باب منزلك."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Tracking Map Placeholder */}
        <div className="lg:col-span-2">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-neutral-secondary/30 rounded-3xl border border-border h-[400px] relative overflow-hidden flex items-center justify-center"
          >
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto animate-pulse">
                <Navigation className="w-8 h-8 text-accent" />
              </div>
              <p className="text-text-secondary font-medium">جاري تحديد موقع المندوب على الخريطة...</p>
            </div>
            
            {/* Overlay Info */}
            <div className="absolute bottom-6 left-6 right-6 bg-white p-4 rounded-2xl shadow-xl border border-border flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                  <Truck className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-text-secondary">موعد الوصول المتوقع</p>
                  <p className="font-bold text-text-primary">اليوم، 04:30 م - 06:00 م</p>
                </div>
              </div>
              <Button size="sm" className="bg-accent text-white">اتصلي بالمندوب</Button>
            </div>
          </motion.div>
        </div>

        {/* Tracking Steps */}
        <div className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-neutral-primary rounded-2xl border border-border shadow-sm p-6"
          >
            <h3 className="font-bold text-text-primary mb-8">خطوات التوصيل</h3>
            <div className="space-y-0 relative">
              {trackingSteps.map((step, index) => (
                <div key={step.id} className="relative flex gap-6 pb-10 last:pb-0">
                  {/* Connector Line */}
                  {index !== trackingSteps.length - 1 && (
                    <div className={`absolute right-4 top-8 bottom-0 w-0.5 ${
                      step.status === 'completed' ? 'bg-accent' : 'bg-neutral-secondary'
                    }`} />
                  )}
                  
                  {/* Icon */}
                  <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    step.status === 'completed' ? 'bg-accent text-white' : 
                    step.status === 'current' ? 'bg-white border-2 border-accent text-accent animate-pulse' : 
                    'bg-neutral-secondary text-text-secondary'
                  }`}>
                    {step.status === 'completed' ? <CheckCircle2 className="w-5 h-5" /> : 
                     step.status === 'current' ? <Clock className="w-5 h-5" /> : 
                     <div className="w-2 h-2 rounded-full bg-current" />}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <h4 className={`font-bold text-sm ${
                      step.status === 'pending' ? 'text-text-secondary' : 'text-text-primary'
                    }`}>
                      {step.title}
                    </h4>
                    <p className="text-xs text-text-secondary mt-1">{step.location}</p>
                    <p className="text-[10px] text-text-secondary mt-1">{step.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

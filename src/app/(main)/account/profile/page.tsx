"use client";

import React from "react";
import { Edit2, Mail, Phone, Calendar, User, MapPin } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

import { useAuth } from "@/lib/auth-context";
import { DashboardHeader } from "@/components/account/DashboardHeader";
import { Avatar } from "@/components/design-system/core/Avatar";
import { Button } from "@/components/design-system/core/Button";

export default function ProfilePage() {
  const { user } = useAuth();

  if (!user) return null;

  const profileData = [
    {
      label: "الاسم الكامل",
      value: user.user_metadata?.full_name || "غير محدد",
      icon: <User className="w-5 h-5" />,
    },
    {
      label: "البريد الإلكتروني",
      value: user.email || "غير محدد",
      icon: <Mail className="w-5 h-5" />,
    },
    {
      label: "رقم الهاتف",
      value: user.user_metadata?.phone || "01012345678",
      icon: <Phone className="w-5 h-5" />,
    },
    {
      label: "تاريخ الميلاد",
      value: user.user_metadata?.birthdate || "15 مايو 1995",
      icon: <Calendar className="w-5 h-5" />,
    },
    {
      label: "المدينة",
      value: user.user_metadata?.city || "القاهرة",
      icon: <MapPin className="w-5 h-5" />,
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <DashboardHeader 
          title="الملف الشخصي" 
          description="إدارة معلوماتك الشخصية وتفاصيل حسابك."
        />
        <Link href="/account/profile/edit">
          <Button className="bg-accent hover:bg-accent/90 text-white gap-2">
            <Edit2 className="w-4 h-4" />
            تعديل الملف الشخصي
          </Button>
        </Link>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-neutral-primary rounded-2xl border border-border shadow-sm overflow-hidden"
      >
        <div className="h-32 bg-accent/10 relative">
          <div className="absolute -bottom-12 right-8">
            <Avatar 
              size="2xl" 
              alt={user.user_metadata?.full_name}
              className="border-4 border-white shadow-lg"
            />
          </div>
        </div>
        
        <div className="pt-16 pb-8 px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {profileData.map((item, index) => (
              <div key={item.label} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-neutral-secondary/30 flex items-center justify-center text-text-secondary">
                  {item.icon}
                </div>
                <div>
                  <p className="text-xs text-text-secondary mb-1">{item.label}</p>
                  <p className="font-bold text-text-primary">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Account Status Card */}
      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 text-right">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
            <User className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-blue-900">حالة الحساب: مفعل</h3>
            <p className="text-sm text-blue-700">لقد أكملتِ 85% من بيانات ملفك الشخصي.</p>
          </div>
        </div>
        <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-100">
          إكمال البيانات
        </Button>
      </div>
    </div>
  );
}

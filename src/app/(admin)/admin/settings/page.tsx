"use client";

import React from "react";
import { Settings, Globe, Bell, Shield, CreditCard, Mail, Phone, Truck } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/shared/AdminPageHeader";
import { Button } from "@/components/design-system/core/Button";
import { Input } from "@/components/design-system/core/Input";
import { Divider } from "@/components/design-system/core/Divider";
import { Switch } from "@/components/design-system/core/Switch";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-8">
      <AdminPageHeader 
        title="إعدادات المتجر"
        breadcrumbs={[{ label: "الإعدادات" }]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* General Settings */}
          <section className="bg-white dark:bg-neutral-primary rounded-3xl border border-border shadow-sm overflow-hidden">
            <div className="p-6 border-b border-border bg-neutral-secondary/10">
              <h3 className="font-bold text-text-primary flex items-center gap-2">
                <Globe className="w-5 h-5 text-accent" />
                الإعدادات العامة
              </h3>
            </div>
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-text-primary">اسم المتجر</label>
                  <Input defaultValue="Beauty Journey" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-text-primary">البريد الإلكتروني للدعم</label>
                  <Input defaultValue="support@beautyjourney.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-text-primary">رابط المتجر الأساسي</label>
                <Input defaultValue="https://beautyjourney.com" />
              </div>
            </div>
          </section>

          {/* Payment Settings */}
          <section className="bg-white dark:bg-neutral-primary rounded-3xl border border-border shadow-sm overflow-hidden">
            <div className="p-6 border-b border-border bg-neutral-secondary/10">
              <h3 className="font-bold text-text-primary flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-accent" />
                بوابات الدفع
              </h3>
            </div>
            <div className="p-8 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                    <CreditCard className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-text-primary">Paymob</h4>
                    <p className="text-xs text-text-secondary">مفعل لبطاقات الائتمان والمحافظ الإلكترونية</p>
                  </div>
                </div>
                <Switch checked={true} />
              </div>
              <Divider />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
                    <DollarSign className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-text-primary">الدفع عند الاستلام</h4>
                    <p className="text-xs text-text-secondary">السماح للعملاء بالدفع نقداً عند التوصيل</p>
                  </div>
                </div>
                <Switch checked={true} />
              </div>
            </div>
          </section>

          {/* Shipping Settings */}
          <section className="bg-white dark:bg-neutral-primary rounded-3xl border border-border shadow-sm overflow-hidden">
            <div className="p-6 border-b border-border bg-neutral-secondary/10">
              <h3 className="font-bold text-text-primary flex items-center gap-2">
                <Truck className="w-5 h-5 text-accent" />
                إعدادات الشحن
              </h3>
            </div>
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-text-primary">تكلفة الشحن الثابتة</label>
                  <Input defaultValue="50" type="number" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-text-primary">حد الشحن المجاني</label>
                  <Input defaultValue="1000" type="number" />
                </div>
              </div>
              <Divider />
              <div className="space-y-4">
                <h4 className="text-sm font-bold">شركات الشحن المدعومة</h4>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Aramex</span>
                  <Switch checked={true} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Bosta</span>
                  <Switch checked={true} />
                </div>
              </div>
            </div>
          </section>

          {/* Admin Profile */}
          <section className="bg-white dark:bg-neutral-primary rounded-3xl border border-border shadow-sm overflow-hidden">
            <div className="p-6 border-b border-border bg-neutral-secondary/10">
              <h3 className="font-bold text-text-primary flex items-center gap-2">
                <Shield className="w-5 h-5 text-accent" />
                الملف الشخصي للمسؤول
              </h3>
            </div>
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-text-primary">الاسم الكامل</label>
                  <Input defaultValue="Super Admin" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-text-primary">البريد الإلكتروني</label>
                  <Input defaultValue="admin@beautyjourney.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-text-primary">كلمة المرور الحالية</label>
                <Input type="password" placeholder="••••••••" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-text-primary">كلمة المرور الجديدة</label>
                  <Input type="password" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-text-primary">تأكيد كلمة المرور</label>
                  <Input type="password" />
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar Help */}
        <div className="space-y-6">
          <div className="bg-accent/5 border border-accent/20 rounded-3xl p-6 space-y-4">
            <h4 className="text-sm font-bold text-accent">تحديث الإعدادات</h4>
            <p className="text-xs text-text-secondary leading-relaxed">
              تغيير هذه الإعدادات قد يؤثر على تجربة التسوق لجميع العملاء. يرجى التأكد من البيانات قبل الحفظ.
            </p>
            <Button className="w-full bg-accent text-white">حفظ جميع التغييرات</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DollarSign({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <line x1="12" y1="1" x2="12" y2="23"></line>
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
    </svg>
  );
}

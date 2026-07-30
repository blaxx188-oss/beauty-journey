"use client";

import React from "react";
import { AlertTriangle, Trash2, X, ChevronRight, Info } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { DashboardHeader } from "@/components/account/DashboardHeader";
import { Button } from "@/components/design-system/core/Button";
import { Input } from "@/components/design-system/core/Input";
import { Checkbox } from "@/components/design-system/core/Checkbox";
import { useAuth } from "@/lib/auth-context";

export default function DeleteAccountPage() {
  const [confirmed, setConfirmed] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [isDeleting, setIsDeleting] = React.useState(false);
  const router = useRouter();
  const { signOut } = useAuth();

  const handleDelete = async () => {
    if (!confirmed || !password) return;
    
    setIsDeleting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    alert("تم حذف الحساب بنجاح. نأسف لرحيلك!");
    await signOut();
    router.push("/");
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 text-sm text-text-secondary">
        <Link href="/account/preferences" className="hover:text-accent">الإعدادات</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-text-primary">حذف الحساب</span>
      </div>

      <DashboardHeader 
        title="حذف الحساب" 
        description="نحن حزينون لرؤيتك ترحلين. يرجى قراءة المعلومات التالية بعناية."
      />

      <div className="max-w-2xl mx-auto space-y-8">
        {/* Warning Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-red-50 border-2 border-red-200 rounded-3xl p-8"
        >
          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center text-red-600">
              <AlertTriangle className="w-10 h-10" />
            </div>
            <h2 className="text-xl font-bold text-red-900">تحذير: هذا الإجراء لا يمكن التراجع عنه!</h2>
            <p className="text-red-700 leading-relaxed">
              عند حذف حسابك، ستفقدين الوصول إلى:
            </p>
            <ul className="text-red-700 text-sm space-y-2 text-right w-full max-w-xs mx-auto list-disc list-inside">
              <li>تاريخ جميع طلباتك السابقة.</li>
              <li>قائمة الأمنيات والمنتجات المحفوظة.</li>
              <li>النقاط والمكافآت في برنامج الولاء.</li>
              <li>روتين العناية المخصص لكِ.</li>
            </ul>
          </div>
        </motion.div>

        {/* Confirmation Form */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-neutral-primary rounded-2xl border border-border shadow-sm p-8 space-y-6"
        >
          <div className="space-y-4">
            <h3 className="font-bold text-text-primary">لتأكيد الحذف، يرجى إدخال كلمة المرور:</h3>
            <Input 
              type="password" 
              placeholder="كلمة المرور الحالية" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-neutral-secondary/20"
            />
          </div>

          <label className="flex items-start gap-3 cursor-pointer p-4 rounded-xl bg-neutral-secondary/10 border border-border hover:bg-neutral-secondary/20 transition-colors">
            <Checkbox 
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
              className="mt-1"
            />
            <span className="text-sm text-text-secondary leading-relaxed">
              أفهم أن حذف حسابي سيؤدي إلى مسح جميع بياناتي بشكل نهائي ولن أتمكن من استعادتها مرة أخرى.
            </span>
          </label>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/account/preferences" className="flex-1">
              <Button variant="outline" className="w-full gap-2">
                <X className="w-4 h-4" />
                تراجعي عن الحذف
              </Button>
            </Link>
            <Button 
              className="flex-1 bg-red-600 hover:bg-red-700 text-white gap-2"
              disabled={!confirmed || !password}
              isLoading={isDeleting}
              onClick={handleDelete}
            >
              <Trash2 className="w-4 h-4" />
              تأكيد حذف الحساب
            </Button>
          </div>
        </motion.div>

        <div className="flex items-center justify-center gap-2 text-text-secondary text-xs">
          <Info className="w-4 h-4" />
          <span>هل تواجهين مشكلة؟ <Link href="/contact" className="text-accent hover:underline">تحدثي معنا</Link> قبل الرحيل.</span>
        </div>
      </div>
    </div>
  );
}

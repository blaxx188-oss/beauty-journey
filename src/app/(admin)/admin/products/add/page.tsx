"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  Save, 
  X, 
  ChevronRight, 
  Image as ImageIcon,
  Info,
  DollarSign,
  Package,
  Settings,
  Search,
  Plus
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import { AdminPageHeader } from "@/components/admin/shared/AdminPageHeader";
import { Button } from "@/components/design-system/core/Button";
import { Input } from "@/components/design-system/core/Input";
import { Textarea } from "@/components/design-system/core/Textarea";
import { Select } from "@/components/design-system/core/Select";
import { Switch } from "@/components/design-system/core/Switch";
import { Tabs } from "@/components/design-system/core/Tabs";
import { MediaUpload } from "@/components/admin/shared/MediaUpload";
import { Divider } from "@/components/design-system/core/Divider";

const productSchema = z.object({
  name: z.string().min(3, "اسم المنتج مطلوب"),
  slug: z.string().min(3, "الرابط الدائم مطلوب"),
  description: z.string().min(10, "وصف المنتج مطلوب"),
  price: z.string().min(1, "السعر مطلوب"),
  compareAtPrice: z.string().optional(),
  sku: z.string().min(1, "رمز SKU مطلوب"),
  barcode: z.string().optional(),
  inventory: z.string().min(1, "الكمية مطلوبة"),
  category: z.string().min(1, "القسم مطلوب"),
  brand: z.string().min(1, "العلامة التجارية مطلوبة"),
  status: z.boolean(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
});

type ProductFormValues = z.infer<typeof productSchema>;

export default function AddProductPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("general");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      status: true,
    },
  });

  const onSubmit = async (data: ProductFormValues) => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Product Data:", data);
    setIsSubmitting(false);
    router.push("/admin/products");
  };

  const tabs = [
    { id: "general", label: "معلومات عامة", icon: <Info className="w-4 h-4" /> },
    { id: "pricing", label: "التسعير والمخزون", icon: <DollarSign className="w-4 h-4" /> },
    { id: "media", label: "الصور والوسائط", icon: <ImageIcon className="w-4 h-4" /> },
    { id: "variants", label: "الخيارات (Variants)", icon: <Settings className="w-4 h-4" /> },
    { id: "seo", label: "محركات البحث (SEO)", icon: <Search className="w-4 h-4" /> },
  ];

  return (
    <div className="space-y-8">
      <AdminPageHeader 
        title="إضافة منتج جديد"
        breadcrumbs={[
          { label: "المنتجات", href: "/admin/products" },
          { label: "إضافة منتج" }
        ]}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 pb-20">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1 space-y-8">
            <div className="bg-white dark:bg-neutral-primary rounded-3xl border border-border shadow-sm overflow-hidden">
              <div className="p-1 border-b border-border bg-neutral-secondary/10">
                <div className="flex overflow-x-auto no-scrollbar">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-6 py-4 text-sm font-bold transition-all whitespace-nowrap border-b-2 ${
                        activeTab === tab.id 
                          ? "border-accent text-accent bg-white" 
                          : "border-transparent text-text-secondary hover:text-text-primary"
                      }`}
                    >
                      {tab.icon}
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-8">
                {activeTab === "general" && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-text-primary">اسم المنتج</label>
                      <Input {...register("name")} placeholder="مثال: سيروم فيتامين سي" className={errors.name ? "border-red-500" : ""} />
                      {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-text-primary">الرابط الدائم (Slug)</label>
                      <Input {...register("slug")} placeholder="vitamin-c-serum" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-text-primary">الوصف</label>
                      <Textarea {...register("description")} placeholder="اكتبي وصفاً مفصلاً للمنتج..." rows={6} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-text-primary">القسم</label>
                        <Select options={[{ label: "العناية بالبشرة", value: "skincare" }, { label: "العناية بالشعر", value: "haircare" }]} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-text-primary">العلامة التجارية</label>
                        <Select options={[{ label: "The Ordinary", value: "ordinary" }, { label: "CeraVe", value: "cerave" }]} />
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "pricing" && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-text-primary">السعر الأساسي (ج.م)</label>
                        <Input type="number" {...register("price")} placeholder="0.00" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-text-primary">السعر قبل الخصم (اختياري)</label>
                        <Input type="number" {...register("compareAtPrice")} placeholder="0.00" />
                      </div>
                    </div>
                    <Divider />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-text-primary">رمز SKU</label>
                        <Input {...register("sku")} placeholder="SKU-001" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-text-primary">الباركود (EAN/UPC)</label>
                        <Input {...register("barcode")} placeholder="123456789" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-text-primary">الكمية المتوفرة</label>
                        <Input type="number" {...register("inventory")} placeholder="0" />
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "media" && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                    <MediaUpload label="صور المنتج" multiple maxFiles={8} />
                  </motion.div>
                )}

                {activeTab === "variants" && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                    <div className="p-8 border-2 border-dashed border-border rounded-3xl text-center space-y-4">
                      <div className="w-16 h-16 bg-neutral-secondary rounded-full flex items-center justify-center mx-auto text-text-secondary">
                        <Settings className="w-8 h-8" />
                      </div>
                      <div>
                        <h4 className="font-bold text-text-primary">إضافة خيارات للمنتج</h4>
                        <p className="text-xs text-text-secondary mt-1">أضيفي خيارات مثل الحجم، اللون، أو نوع البشرة.</p>
                      </div>
                      <Button variant="outline" size="sm" type="button" className="gap-2">
                        <Plus className="w-4 h-4" />
                        إضافة خيار جديد
                      </Button>
                    </div>
                  </motion.div>
                )}

                {activeTab === "seo" && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-text-primary">عنوان الصفحة (Meta Title)</label>
                      <Input {...register("seoTitle")} placeholder="العنوان الذي سيظهر في نتائج البحث" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-text-primary">وصف الصفحة (Meta Description)</label>
                      <Textarea {...register("seoDescription")} placeholder="وصف مختصر لجذب الزوار من محركات البحث..." rows={3} />
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar Settings */}
          <div className="w-full lg:w-80 space-y-6">
            <div className="bg-white dark:bg-neutral-primary rounded-3xl border border-border shadow-sm p-6 space-y-6">
              <h3 className="font-bold text-text-primary">تنظيم المنتج</h3>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-bold text-text-primary">حالة المنتج</span>
                  <p className="text-[10px] text-text-secondary">تحديد ما إذا كان المنتج مرئياً</p>
                </div>
                <Switch checked={true} />
              </div>
              <Divider />
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-text-primary">المجموعات (Collections)</label>
                  <Select options={[{ label: "وصل حديثاً", value: "new" }, { label: "الأكثر مبيعاً", value: "bestseller" }]} />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-text-primary">الوسوم (Tags)</label>
                  <Input placeholder="أضيفي وسوماً..." />
                </div>
              </div>
            </div>

            <div className="bg-accent/5 border border-accent/20 rounded-3xl p-6 space-y-4">
              <h4 className="text-sm font-bold text-accent">مساعدة</h4>
              <p className="text-xs text-text-secondary leading-relaxed">
                تأكدي من إضافة صور عالية الجودة ووصف دقيق للمنتج لزيادة فرصة البيع.
              </p>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="fixed bottom-0 left-0 right-0 lg:right-72 bg-white/80 backdrop-blur-md border-t border-border p-4 z-40">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <Link href="/admin/products">
              <Button type="button" variant="ghost" className="gap-2">
                <X className="w-4 h-4" />
                إلغاء
              </Button>
            </Link>
            <Button 
              type="submit" 
              className="bg-accent text-white px-8 gap-2 shadow-lg shadow-accent/20"
              isLoading={isSubmitting}
            >
              <Save className="w-4 h-4" />
              حفظ المنتج
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

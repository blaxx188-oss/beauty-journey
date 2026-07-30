"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  ShoppingBag, 
  Heart, 
  Star, 
  FileText,
  AlertCircle,
  MoreVertical,
  Edit2
} from "lucide-react";
import { AdminPageHeader } from "@/components/admin/shared/AdminPageHeader";
import { Button } from "@/components/design-system/core/Button";
import { Badge } from "@/components/design-system/core/Badge";
import { ADMIN_MOCK_CUSTOMERS, ADMIN_MOCK_ORDERS } from "@/data/admin-mock-data";
import { formatDate } from "@/utils/format";
import { Divider } from "@/components/design-system/core/Divider";
import { OrderStatusBadge } from "@/components/admin/orders/OrderStatusBadge";

export default function CustomerDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const customer = ADMIN_MOCK_CUSTOMERS.find(c => c.id === id);
  const customerOrders = ADMIN_MOCK_ORDERS.filter(o => o.userId === id);

  if (!customer) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <AlertCircle className="w-12 h-12 text-text-secondary" />
        <h2 className="text-xl font-bold">العميل غير موجود</h2>
        <Button onClick={() => router.push("/admin/customers")}>العودة للعملاء</Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <AdminPageHeader 
        title={customer.fullName}
        breadcrumbs={[
          { label: "العملاء", href: "/admin/customers" },
          { label: customer.fullName }
        ]}
        action={
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <Edit2 className="w-4 h-4" />
              تعديل البيانات
            </Button>
            <Button className="bg-red-500 hover:bg-red-600 text-white">حظر العميل</Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Profile & Stats */}
        <div className="space-y-8">
          {/* Profile Card */}
          <div className="bg-white dark:bg-neutral-primary rounded-3xl border border-border shadow-sm overflow-hidden">
            <div className="p-8 text-center space-y-4">
              <div className="w-24 h-24 rounded-full bg-accent/10 flex items-center justify-center text-accent text-3xl font-bold mx-auto">
                {customer.fullName.charAt(0)}
              </div>
              <div>
                <h3 className="text-xl font-bold text-text-primary">{customer.fullName}</h3>
                <p className="text-sm text-text-secondary">{customer.email}</p>
              </div>
              <div className="flex justify-center gap-2">
                <Badge variant={customer.loyaltyTier === "gold" ? "success" : "default"}>
                  مستوى {customer.loyaltyTier === "gold" ? "ذهبي" : "فضي"}
                </Badge>
                <Badge variant="info">{customer.loyaltyPoints} نقطة</Badge>
              </div>
            </div>
            <Divider />
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-text-secondary" />
                <span className="text-text-primary">{customer.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-text-secondary" />
                <span className="text-text-primary">{customer.phoneNumber}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="w-4 h-4 text-text-secondary" />
                <span className="text-text-primary">عضو منذ {formatDate(customer.createdAt)}</span>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white dark:bg-neutral-primary p-6 rounded-3xl border border-border shadow-sm text-center space-y-1">
              <p className="text-xs text-text-secondary">إجمالي الطلبات</p>
              <p className="text-2xl font-black text-accent">{customer.ordersCount}</p>
            </div>
            <div className="bg-white dark:bg-neutral-primary p-6 rounded-3xl border border-border shadow-sm text-center space-y-1">
              <p className="text-xs text-text-secondary">إجمالي الإنفاق</p>
              <p className="text-2xl font-black text-accent">{customer.totalSpent} ج.م</p>
            </div>
          </div>

          {/* Notes */}
          <div className="bg-white dark:bg-neutral-primary rounded-3xl border border-border shadow-sm overflow-hidden">
            <div className="p-6 border-b border-border bg-neutral-secondary/10 flex justify-between items-center">
              <h3 className="font-bold text-text-primary flex items-center gap-2">
                <FileText className="w-5 h-5 text-accent" />
                ملاحظات المسؤول
              </h3>
              <Button variant="ghost" size="sm" className="text-accent text-xs font-bold">إضافة</Button>
            </div>
            <div className="p-6">
              <p className="text-sm text-text-secondary italic">لا توجد ملاحظات لهذا العميل بعد.</p>
            </div>
          </div>
        </div>

        {/* Right Column: Activity & Addresses */}
        <div className="lg:col-span-2 space-y-8">
          {/* Orders History */}
          <div className="bg-white dark:bg-neutral-primary rounded-3xl border border-border shadow-sm overflow-hidden">
            <div className="p-6 border-b border-border bg-neutral-secondary/10">
              <h3 className="font-bold text-text-primary flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-accent" />
                تاريخ الطلبات
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-right">
                <thead>
                  <tr className="text-sm text-text-secondary border-b border-border">
                    <th className="p-6 font-bold">رقم الطلب</th>
                    <th className="p-6 font-bold">التاريخ</th>
                    <th className="p-6 font-bold">الحالة</th>
                    <th className="p-6 font-bold text-left">الإجمالي</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {customerOrders.map((order) => (
                    <tr key={order.id} className="text-sm hover:bg-neutral-secondary/10 transition-colors">
                      <td className="p-6">
                        <span className="font-bold text-accent">#{order.id}</span>
                      </td>
                      <td className="p-6">{formatDate(order.createdAt)}</td>
                      <td className="p-6">
                        <OrderStatusBadge status={order.status as any} />
                      </td>
                      <td className="p-6 text-left font-black">{order.total} ج.م</td>
                    </tr>
                  ))}
                  {customerOrders.length === 0 && (
                    <tr>
                      <td colSpan={4} className="p-12 text-center text-text-secondary">
                        لا توجد طلبات سابقة لهذا العميل
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Addresses */}
            <div className="bg-white dark:bg-neutral-primary rounded-3xl border border-border shadow-sm overflow-hidden">
              <div className="p-6 border-b border-border bg-neutral-secondary/10">
                <h3 className="font-bold text-text-primary flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-accent" />
                  العناوين المسجلة
                </h3>
              </div>
              <div className="p-6 space-y-4">
                {customer.addresses.map((addr) => (
                  <div key={addr.id} className="p-4 border border-border rounded-2xl space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-accent">{addr.isDefault ? "العنوان الافتراضي" : "عنوان إضافي"}</span>
                    </div>
                    <p className="text-sm font-bold">{addr.fullName}</p>
                    <p className="text-xs text-text-secondary leading-relaxed">
                      {addr.governorate}, {addr.city}, {addr.area}
                      <br />
                      {addr.street}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Wishlist & Reviews Preview */}
            <div className="space-y-8">
              <div className="bg-white dark:bg-neutral-primary rounded-3xl border border-border shadow-sm overflow-hidden">
                <div className="p-6 border-b border-border bg-neutral-secondary/10 flex justify-between items-center">
                  <h3 className="font-bold text-text-primary flex items-center gap-2">
                    <Heart className="w-5 h-5 text-accent" />
                    قائمة الأمنيات
                  </h3>
                  <Badge variant="default">5 منتجات</Badge>
                </div>
                <div className="p-6 text-center">
                  <Button variant="ghost" size="sm" className="text-accent font-bold">عرض الكل</Button>
                </div>
              </div>

              <div className="bg-white dark:bg-neutral-primary rounded-3xl border border-border shadow-sm overflow-hidden">
                <div className="p-6 border-b border-border bg-neutral-secondary/10 flex justify-between items-center">
                  <h3 className="font-bold text-text-primary flex items-center gap-2">
                    <Star className="w-5 h-5 text-accent" />
                    التقييمات
                  </h3>
                  <Badge variant="default">3 تقييمات</Badge>
                </div>
                <div className="p-6 text-center">
                  <Button variant="ghost" size="sm" className="text-accent font-bold">عرض الكل</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

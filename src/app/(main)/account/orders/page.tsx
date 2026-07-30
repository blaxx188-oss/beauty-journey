"use client";

import React from "react";
import { Package, Search, ChevronLeft, Eye, Truck } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

import { DashboardHeader } from "@/components/account/DashboardHeader";
import { MOCK_ORDERS } from "@/data/account-mock-data";
import { Input } from "@/components/design-system/core/Input";
import { Badge } from "@/components/design-system/core/Badge";
import { Button } from "@/components/design-system/core/Button";
import { Tabs } from "@/components/design-system/core/Tabs";

export default function OrdersPage() {
  const [activeTab, setActiveTab] = React.useState("all");

  const tabs = [
    { id: "all", label: "الكل" },
    { id: "processing", label: "جاري التنفيذ" },
    { id: "shipped", label: "تم الشحن" },
    { id: "delivered", label: "تم التوصيل" },
    { id: "cancelled", label: "ملغي" },
  ];

  const filteredOrders = activeTab === "all" 
    ? MOCK_ORDERS 
    : MOCK_ORDERS.filter(order => order.status === activeTab);

  return (
    <div className="space-y-8">
      <DashboardHeader 
        title="طلباتي" 
        description="تابعي حالة طلباتك الحالية واستعرضي تاريخ مشترياتك."
      />

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="w-full md:w-80 relative">
          <Input placeholder="بحث برقم الطلب..." className="pl-10" />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
        </div>
        
        <div className="w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
          <div className="flex gap-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                  activeTab === tab.id 
                    ? "bg-accent text-white shadow-md shadow-accent/20" 
                    : "bg-white text-text-secondary border border-border hover:border-accent/50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white dark:bg-neutral-primary rounded-2xl border border-border shadow-sm overflow-hidden hover:border-accent/30 transition-colors"
            >
              <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-neutral-secondary/50 rounded-xl flex items-center justify-center text-text-secondary">
                    <Package className="w-8 h-8" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-text-primary">{order.id}</h3>
                      <Badge variant={order.status === 'delivered' ? 'success' : 'default'}>
                        {order.statusText}
                      </Badge>
                    </div>
                    <div className="text-xs text-text-secondary flex items-center gap-3">
                      <span>{order.date}</span>
                      <span className="w-1 h-1 rounded-full bg-border" />
                      <span>{order.items} منتجات</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-row md:flex-col items-center md:items-end justify-between gap-2">
                  <div className="text-lg font-bold text-accent">{order.total} ج.م</div>
                  <div className="flex gap-2">
                    <Link href={`/account/orders/${order.id}/track`}>
                      <Button variant="outline" size="sm" className="text-xs gap-1 border-blue-200 text-blue-600 hover:bg-blue-50">
                        <Truck className="w-3.5 h-3.5" />
                        تتبع
                      </Button>
                    </Link>
                    <Link href={`/account/orders/${order.id}`}>
                      <Button variant="outline" size="sm" className="text-xs gap-1">
                        <Eye className="w-3.5 h-3.5" />
                        التفاصيل
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* Order Progress Mini-bar */}
              <div className="h-1 bg-neutral-secondary w-full">
                <div 
                  className={`h-full bg-accent transition-all duration-1000 ${
                    order.status === 'processing' ? 'w-1/3' : 
                    order.status === 'shipped' ? 'w-2/3' : 
                    order.status === 'delivered' ? 'w-full' : 'w-0'
                  }`}
                />
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-border">
            <div className="w-20 h-20 bg-neutral-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-10 h-10 text-text-secondary" />
            </div>
            <h3 className="font-bold text-text-primary">لا توجد طلبات</h3>
            <p className="text-sm text-text-secondary mt-1">لم تقومي بإجراء أي طلبات في هذا القسم بعد.</p>
            <Link href="/shop" className="inline-block mt-6">
              <Button className="bg-accent text-white">ابدئي التسوق الآن</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

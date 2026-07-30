"use client";

import React from "react";
import { MapPin, Plus, Edit2, Trash2, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

import { DashboardHeader } from "@/components/account/DashboardHeader";
import { MOCK_ADDRESSES } from "@/data/account-mock-data";
import { Button } from "@/components/design-system/core/Button";
import { Badge } from "@/components/design-system/core/Badge";

export default function AddressesPage() {
  const [addresses, setAddresses] = React.useState(MOCK_ADDRESSES);

  const handleDelete = (id: string) => {
    if (confirm("هل أنتِ متأكدة من حذف هذا العنوان؟")) {
      setAddresses(prev => prev.filter(addr => addr.id !== id));
    }
  };

  const handleSetDefault = (id: string) => {
    setAddresses(prev => prev.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })));
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <DashboardHeader 
          title="عناوين التوصيل" 
          description="إدارة عناوين الشحن الخاصة بكِ لتسهيل عملية الشراء."
        />
        <Link href="/account/addresses/add">
          <Button className="bg-accent hover:bg-accent/90 text-white gap-2">
            <Plus className="w-4 h-4" />
            إضافة عنوان جديد
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addresses.map((address, index) => (
          <motion.div
            key={address.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-white dark:bg-neutral-primary rounded-2xl border-2 p-6 transition-all ${
              address.isDefault ? 'border-accent shadow-md' : 'border-border shadow-sm'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  address.isDefault ? 'bg-accent text-white' : 'bg-neutral-secondary text-text-secondary'
                }`}>
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-text-primary">{address.title}</h3>
                  {address.isDefault && (
                    <span className="text-[10px] text-accent font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      العنوان الافتراضي
                    </span>
                  )}
                </div>
              </div>
              <div className="flex gap-1">
                <Button variant="icon" size="sm" className="text-text-secondary hover:text-accent">
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button 
                  variant="icon" 
                  size="sm" 
                  className="text-text-secondary hover:text-red-500"
                  onClick={() => handleDelete(address.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <p className="font-bold text-text-primary">{address.name}</p>
              <p className="text-text-secondary">{address.phone}</p>
              <p className="text-text-secondary">
                {address.details}، {address.area}، {address.city}
              </p>
            </div>

            {!address.isDefault && (
              <button 
                onClick={() => handleSetDefault(address.id)}
                className="mt-6 text-xs font-bold text-accent hover:underline"
              >
                تعيين كافتراضي
              </button>
            )}
          </motion.div>
        ))}

        {/* Add New Address Placeholder */}
        <Link href="/account/addresses/add" className="bg-neutral-secondary/20 border-2 border-dashed border-border rounded-2xl p-6 flex flex-col items-center justify-center gap-3 hover:border-accent/50 hover:bg-accent/5 transition-all group min-h-[200px]">
          <div className="w-12 h-12 rounded-full bg-white border border-border flex items-center justify-center text-text-secondary group-hover:text-accent group-hover:border-accent transition-colors">
            <Plus className="w-6 h-6" />
          </div>
          <span className="font-bold text-text-secondary group-hover:text-accent transition-colors">إضافة عنوان جديد</span>
        </Link>
      </div>
    </div>
  );
}

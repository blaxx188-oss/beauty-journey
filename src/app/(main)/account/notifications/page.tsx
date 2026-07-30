"use client";

import React from "react";
import { Bell, Package, Tag, Info, CheckCircle2, Trash2, Clock } from "lucide-react";
import { motion } from "framer-motion";

import { DashboardHeader } from "@/components/account/DashboardHeader";
import { Button } from "@/components/design-system/core/Button";

export default function NotificationsPage() {
  const [notifications, setNotifications] = React.useState([
    {
      id: 1,
      title: "تم شحن طلبك!",
      message: "طلبك رقم ORD-12347 في الطريق إليك الآن. يمكنك تتبع الشحنة من خلال قسم الطلبات.",
      time: "منذ ساعتين",
      isRead: false,
      type: "order"
    },
    {
      id: 2,
      title: "عرض خاص لكِ",
      message: "خصم 20% على منتجات العناية بالبشرة لفترة محدودة باستخدام كود BEAUTY20.",
      time: "منذ 5 ساعات",
      isRead: true,
      type: "promo"
    },
    {
      id: 3,
      title: "تذكير: روتين المساء",
      message: "حان وقت تطبيق روتين العناية بالبشرة المسائي الخاص بكِ. لا تنسي استخدام السيروم المرطب.",
      time: "أمس، 09:00 م",
      isRead: true,
      type: "info"
    },
    {
      id: 4,
      title: "تم تحديث كلمة المرور",
      message: "تم تغيير كلمة مرور حسابك بنجاح. إذا لم تقومي بهذا الإجراء، يرجى التواصل مع الدعم فوراً.",
      time: "منذ يومين",
      isRead: true,
      type: "security"
    }
  ]);

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'order': return <Package className="w-5 h-5 text-blue-600" />;
      case 'promo': return <Tag className="w-5 h-5 text-orange-600" />;
      case 'security': return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      default: return <Info className="w-5 h-5 text-purple-600" />;
    }
  };

  const getBgColor = (type: string) => {
    switch (type) {
      case 'order': return 'bg-blue-50';
      case 'promo': return 'bg-orange-50';
      case 'security': return 'bg-green-50';
      default: return 'bg-purple-50';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <DashboardHeader 
          title="التنبيهات" 
          description="تابعي آخر التحديثات والعروض المخصصة لكِ."
        />
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs"
            onClick={markAllAsRead}
          >
            تحديد الكل كمقروء
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs text-red-500 hover:bg-red-50"
            onClick={() => setNotifications([])}
          >
            حذف الكل
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {notifications.length > 0 ? (
          notifications.map((notif, index) => (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`p-6 rounded-2xl border transition-all relative group ${
                notif.isRead 
                  ? 'bg-white border-border' 
                  : 'bg-accent/5 border-accent/20 shadow-sm'
              }`}
            >
              {!notif.isRead && (
                <div className="absolute top-6 right-6 w-2 h-2 bg-accent rounded-full" />
              )}
              
              <div className="flex gap-4">
                <div className={`w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center ${getBgColor(notif.type)}`}>
                  {getIcon(notif.type)}
                </div>
                
                <div className="flex-1 min-w-0 pr-4">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className={`font-bold text-sm ${notif.isRead ? 'text-text-primary' : 'text-accent'}`}>
                      {notif.title}
                    </h3>
                    <span className="text-[10px] text-text-secondary whitespace-nowrap flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {notif.time}
                    </span>
                  </div>
                  <p className="text-sm text-text-secondary mt-1 leading-relaxed">{notif.message}</p>
                </div>
                
                <button 
                  onClick={() => deleteNotification(notif.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-2 text-text-secondary hover:text-red-500"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-border">
            <div className="w-20 h-20 bg-neutral-secondary/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="w-10 h-10 text-text-secondary" />
            </div>
            <h3 className="font-bold text-text-primary">لا توجد تنبيهات</h3>
            <p className="text-sm text-text-secondary mt-1">سنقوم بإخطارك هنا عند وجود أي تحديثات جديدة.</p>
          </div>
        )}
      </div>
    </div>
  );
}

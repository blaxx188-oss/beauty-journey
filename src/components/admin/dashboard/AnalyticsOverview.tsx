"use client";

import React from "react";
import { motion } from "framer-motion";
import { BarChart3, Calendar, ChevronDown } from "lucide-react";
import { Button } from "@/components/design-system/core/Button";

export function AnalyticsOverview() {
  return (
    <div className="bg-white dark:bg-neutral-primary rounded-3xl border border-border shadow-sm p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h3 className="font-bold text-text-primary">نظرة عامة على المبيعات</h3>
          <p className="text-xs text-text-secondary mt-1">إحصائيات المبيعات خلال الـ 30 يوماً الماضية</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="text-xs gap-2">
            <Calendar className="w-4 h-4" />
            آخر 30 يوم
            <ChevronDown className="w-3 h-3" />
          </Button>
        </div>
      </div>

      {/* Chart Placeholder */}
      <div className="h-[300px] w-full flex items-end justify-between gap-2 px-2">
        {[40, 70, 45, 90, 65, 80, 55, 100, 75, 60, 85, 50].map((height, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            animate={{ height: `${height}%` }}
            transition={{ delay: i * 0.05, duration: 0.5 }}
            className="flex-1 bg-accent/20 rounded-t-lg relative group"
          >
            <div className="absolute inset-0 bg-accent rounded-t-lg opacity-0 group-hover:opacity-100 transition-opacity" />
            {/* Tooltip placeholder */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-text-primary text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {height * 100} ج.م
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* X-Axis labels */}
      <div className="flex justify-between mt-4 px-2 text-[10px] text-text-secondary font-bold">
        <span>يناير</span>
        <span>فبراير</span>
        <span>مارس</span>
        <span>أبريل</span>
        <span>مايو</span>
        <span>يونيو</span>
        <span>يوليو</span>
        <span>أغسطس</span>
        <span>سبتمبر</span>
        <span>أكتوبر</span>
        <span>نوفمبر</span>
        <span>ديسمبر</span>
      </div>
    </div>
  );
}

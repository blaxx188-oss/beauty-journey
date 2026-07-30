"use client";

/**
 * DeliveryNotesInput — Text area for delivery notes/instructions.
 */

import React from "react";
import { Textarea } from "@/components/design-system/core";
import { MessageSquare } from "lucide-react";

interface DeliveryNotesInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function DeliveryNotesInput({
  value,
  onChange,
}: DeliveryNotesInputProps) {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-text-primary flex items-center gap-2">
        <MessageSquare className="w-4 h-4 text-accent" />
        ملاحظات التوصيل (اختياري)
      </h3>
      <p className="text-xs text-text-secondary">
        أضف أي تعليمات خاصة بالتوصيل
      </p>

      <Textarea
        placeholder="مثال: يرجى ترك الطلب عند حارس العمارة..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={200}
        rows={3}
        aria-label="ملاحظات التوصيل"
      />

      <p className="text-xs text-text-secondary text-left">
        {value.length}/200
      </p>
    </div>
  );
}

import React from "react";
import { CheckCircle2, Clock, Truck, Package, CreditCard, AlertCircle } from "lucide-react";
import { OrderTimelineEvent } from "@/types/admin";
import { formatDate } from "@/utils/format";
import { cn } from "@/utils/cn";

interface OrderTimelineProps {
  events: OrderTimelineEvent[];
}

export function OrderTimeline({ events }: OrderTimelineProps) {
  const getIcon = (status: string) => {
    switch (status) {
      case "pending": return <Clock className="w-4 h-4" />;
      case "payment_received": return <CreditCard className="w-4 h-4" />;
      case "processing": return <Package className="w-4 h-4" />;
      case "shipped": return <Truck className="w-4 h-4" />;
      case "delivered": return <CheckCircle2 className="w-4 h-4" />;
      case "cancelled": return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered": return "bg-green-500 text-white";
      case "cancelled": return "bg-red-500 text-white";
      case "shipped":
      case "processing": return "bg-blue-500 text-white";
      case "payment_received": return "bg-purple-500 text-white";
      default: return "bg-neutral-400 text-white";
    }
  };

  return (
    <div className="space-y-8 relative before:absolute before:inset-y-0 before:right-4 before:w-0.5 before:bg-border">
      {events.map((event, index) => (
        <div key={event.id} className="relative pr-12">
          <div className={cn(
            "absolute right-0 top-0 w-8 h-8 rounded-full flex items-center justify-center z-10",
            getStatusColor(event.status)
          )}>
            {getIcon(event.status)}
          </div>
          <div className="bg-white dark:bg-neutral-primary border border-border rounded-2xl p-4 shadow-sm">
            <div className="flex justify-between items-start mb-1">
              <h4 className="font-bold text-sm text-text-primary">{event.title}</h4>
              <span className="text-[10px] text-text-secondary">{formatDate(event.timestamp)}</span>
            </div>
            {event.description && (
              <p className="text-xs text-text-secondary leading-relaxed">{event.description}</p>
            )}
            {event.actor && (
              <div className="mt-2 text-[10px] font-bold text-accent">بواسطة: {event.actor}</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

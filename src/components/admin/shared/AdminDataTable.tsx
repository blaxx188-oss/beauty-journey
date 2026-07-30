"use client";

import React from "react";
import { 
  Search, 
  Filter, 
  MoreVertical, 
  ChevronRight, 
  ChevronLeft,
  ArrowUpDown
} from "lucide-react";
import { Button } from "@/components/design-system/core/Button";
import { Input } from "@/components/design-system/core/Input";
import { Checkbox } from "@/components/design-system/core/Checkbox";
import { cn } from "@/utils/cn";

interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
  className?: string;
}

interface AdminDataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onSearch?: (query: string) => void;
  onFilter?: () => void;
  actions?: (item: T) => React.ReactNode;
  selectable?: boolean;
}

export function AdminDataTable<T extends { id: string | number }>({ 
  data, 
  columns, 
  onSearch, 
  onFilter,
  actions,
  selectable = true
}: AdminDataTableProps<T>) {
  return (
    <div className="bg-white dark:bg-neutral-primary rounded-3xl border border-border shadow-sm overflow-hidden">
      {/* Toolbar */}
      <div className="p-6 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Input 
            placeholder="بحث..." 
            className="pl-10 bg-neutral-secondary/30 border-none"
            onChange={(e) => onSearch?.(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2" onClick={onFilter}>
            <Filter className="w-4 h-4" />
            تصفية
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <ArrowUpDown className="w-4 h-4" />
            ترتيب
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-right border-collapse">
          <thead>
            <tr className="bg-neutral-secondary/20 border-b border-border">
              {selectable && (
                <th className="p-4 w-10">
                  <Checkbox />
                </th>
              )}
              {columns.map((col, idx) => (
                <th key={idx} className={cn("p-4 text-sm font-bold text-text-secondary", col.className)}>
                  {col.header}
                </th>
              ))}
              {actions && <th className="p-4 text-sm font-bold text-text-secondary w-20">إجراءات</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-neutral-secondary/10 transition-colors group">
                {selectable && (
                  <td className="p-4">
                    <Checkbox />
                  </td>
                )}
                {columns.map((col, idx) => (
                  <td key={idx} className={cn("p-4 text-sm text-text-primary", col.className)}>
                    {typeof col.accessor === "function" 
                      ? col.accessor(item) 
                      : (item[col.accessor] as React.ReactNode)}
                  </td>
                ))}
                {actions && (
                  <td className="p-4">
                    {actions(item)}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-6 border-t border-border flex items-center justify-between">
        <p className="text-xs text-text-secondary">عرض 1-10 من أصل {data.length} نتيجة</p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="p-2">
            <ChevronRight className="w-4 h-4" />
          </Button>
          <div className="flex items-center gap-1">
            <Button size="sm" className="w-8 h-8 p-0 bg-accent text-white">1</Button>
            <Button size="sm" variant="ghost" className="w-8 h-8 p-0">2</Button>
            <Button size="sm" variant="ghost" className="w-8 h-8 p-0">3</Button>
          </div>
          <Button variant="outline" size="sm" className="p-2">
            <ChevronLeft className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

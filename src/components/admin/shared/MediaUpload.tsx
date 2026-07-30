"use client";

import React, { useState } from "react";
import { Upload, X, Image as ImageIcon, Plus } from "lucide-react";
import { cn } from "@/utils/cn";

interface MediaUploadProps {
  label?: string;
  value?: string[];
  onChange?: (urls: string[]) => void;
  multiple?: boolean;
  maxFiles?: number;
}

export function MediaUpload({ 
  label, 
  value = [], 
  onChange, 
  multiple = false,
  maxFiles = 5 
}: MediaUploadProps) {
  const [previews, setPreviews] = useState<string[]>(value);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files).map(file => URL.createObjectURL(file));
    const updatedPreviews = multiple ? [...previews, ...newFiles].slice(0, maxFiles) : [newFiles[0]];
    
    setPreviews(updatedPreviews);
    onChange?.(updatedPreviews);
  };

  const removeImage = (index: number) => {
    const updated = previews.filter((_, i) => i !== index);
    setPreviews(updated);
    onChange?.(updated);
  };

  return (
    <div className="space-y-4">
      {label && <label className="text-sm font-bold text-text-primary">{label}</label>}
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {previews.map((src, index) => (
          <div key={index} className="relative aspect-square rounded-2xl border border-border overflow-hidden group">
            <img src={src} alt="Preview" className="w-full h-full object-cover" />
            <button 
              onClick={() => removeImage(index)}
              className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}

        {(multiple ? previews.length < maxFiles : previews.length === 0) && (
          <label className="aspect-square rounded-2xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-neutral-secondary/20 hover:border-accent transition-all group">
            <div className="w-10 h-10 rounded-full bg-neutral-secondary flex items-center justify-center text-text-secondary group-hover:bg-accent/10 group-hover:text-accent transition-colors">
              <Plus className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-text-secondary group-hover:text-accent">رفع صورة</span>
            <input 
              type="file" 
              className="hidden" 
              onChange={handleFileChange} 
              multiple={multiple}
              accept="image/*"
            />
          </label>
        )}
      </div>
      <p className="text-[10px] text-text-secondary">صيغ الصور المدعومة: JPG, PNG, WebP. الحجم الأقصى: 5 ميجابايت.</p>
    </div>
  );
}

"use client";

/**
 * FiltersSidebar — Desktop filters sidebar with various filter types.
 * Includes: Brand, Price Range, Skin Concern, Skin Type, Product Type, Rating, Availability.
 */

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Accordion } from "@/components/design-system/core/Accordion";
import { Checkbox } from "@/components/design-system/core/Checkbox";
import { Button } from "@/components/design-system/core/Button";
import { usePLPStore } from "@/stores/plp-store";
import {
  MOCK_BRANDS,
  MOCK_SKIN_CONCERNS,
  MOCK_SKIN_TYPES,
  MOCK_PRODUCT_TYPES,
} from "@/data/plp-mock-data";

export default function FiltersSidebar() {
  const { filters, setFilters, resetFilters } = usePLPStore();
  const [priceRange, setPriceRange] = useState({
    min: filters.minPrice || 0,
    max: filters.maxPrice || 500,
  });

  const handleBrandChange = (brand: string, checked: boolean) => {
    const currentBrands = filters.brandName || [];
    const newBrands = checked
      ? [...currentBrands, brand]
      : currentBrands.filter((b) => b !== brand);
    setFilters({ brandName: newBrands.length > 0 ? newBrands : undefined });
  };

  const handleSkinConcernChange = (concern: string, checked: boolean) => {
    const currentConcerns = filters.skinConcern || [];
    const newConcerns = checked
      ? [...currentConcerns, concern]
      : currentConcerns.filter((c) => c !== concern);
    setFilters({
      skinConcern: newConcerns.length > 0 ? newConcerns : undefined,
    });
  };

  const handleSkinTypeChange = (type: string, checked: boolean) => {
    const currentTypes = filters.skinType || [];
    const newTypes = checked
      ? [...currentTypes, type]
      : currentTypes.filter((t) => t !== type);
    setFilters({
      skinType: newTypes.length > 0 ? newTypes : undefined,
    });
  };

  const handleProductTypeChange = (type: string, checked: boolean) => {
    const currentTypes = filters.productType || [];
    const newTypes = checked
      ? [...currentTypes, type]
      : currentTypes.filter((t) => t !== type);
    setFilters({
      productType: newTypes.length > 0 ? newTypes : undefined,
    });
  };

  const handleRatingChange = (rating: number) => {
    setFilters({ rating: filters.rating === rating ? undefined : rating });
  };

  const handleAvailabilityChange = (checked: boolean) => {
    setFilters({ availability: checked ? true : undefined });
  };

  const handlePriceApply = () => {
    setFilters({
      minPrice: priceRange.min,
      maxPrice: priceRange.max,
    });
  };

  const accordionItems = [
    {
      id: "brands",
      title: "العلامات التجارية",
      content: (
        <div className="space-y-3">
          {MOCK_BRANDS.map((brand) => (
            <label key={brand} className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={filters.brandName?.includes(brand) || false}
                onChange={(e) =>
                  handleBrandChange(brand, e.target.checked)
                }
              />
              <span className="text-sm text-text-primary">{brand}</span>
            </label>
          ))}
        </div>
      ),
    },
    {
      id: "price",
      title: "نطاق السعر",
      content: (
        <div className="space-y-4">
          <div>
            <label className="text-xs font-medium text-text-secondary mb-2 block">
              الحد الأدنى: {priceRange.min} ج.م
            </label>
            <input
              type="range"
              min="0"
              max="500"
              value={priceRange.min}
              onChange={(e) =>
                setPriceRange({
                  ...priceRange,
                  min: Math.min(parseInt(e.target.value), priceRange.max),
                })
              }
              className="w-full"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-text-secondary mb-2 block">
              الحد الأقصى: {priceRange.max} ج.م
            </label>
            <input
              type="range"
              min="0"
              max="500"
              value={priceRange.max}
              onChange={(e) =>
                setPriceRange({
                  ...priceRange,
                  max: Math.max(parseInt(e.target.value), priceRange.min),
                })
              }
              className="w-full"
            />
          </div>
          <Button
            size="sm"
            onClick={handlePriceApply}
            className="w-full bg-accent hover:bg-accent/90 text-white"
          >
            تطبيق
          </Button>
        </div>
      ),
    },
    {
      id: "skinConcern",
      title: "مشاكل البشرة",
      content: (
        <div className="space-y-3">
          {MOCK_SKIN_CONCERNS.map((concern) => (
            <label key={concern} className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={filters.skinConcern?.includes(concern) || false}
                onChange={(e) =>
                  handleSkinConcernChange(concern, e.target.checked)
                }
              />
              <span className="text-sm text-text-primary">{concern}</span>
            </label>
          ))}
        </div>
      ),
    },
    {
      id: "skinType",
      title: "نوع البشرة",
      content: (
        <div className="space-y-3">
          {MOCK_SKIN_TYPES.map((type) => (
            <label key={type} className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={filters.skinType?.includes(type) || false}
                onChange={(e) =>
                  handleSkinTypeChange(type, e.target.checked)
                }
              />
              <span className="text-sm text-text-primary">{type}</span>
            </label>
          ))}
        </div>
      ),
    },
    {
      id: "productType",
      title: "نوع المنتج",
      content: (
        <div className="space-y-3">
          {MOCK_PRODUCT_TYPES.map((type) => (
            <label key={type} className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={filters.productType?.includes(type) || false}
                onChange={(e) =>
                  handleProductTypeChange(type, e.target.checked)
                }
              />
              <span className="text-sm text-text-primary">{type}</span>
            </label>
          ))}
        </div>
      ),
    },
    {
      id: "rating",
      title: "التقييم",
      content: (
        <div className="space-y-3">
          {[5, 4, 3, 2, 1].map((rating) => (
            <button
              key={rating}
              onClick={() => handleRatingChange(rating)}
              className={`w-full text-right px-3 py-2 rounded-sm transition-colors ${
                filters.rating === rating
                  ? "bg-accent text-white"
                  : "hover:bg-neutral-secondary text-text-primary"
              }`}
            >
              <span className="text-sm font-medium">
                {rating}+ نجوم ({5 - rating} وأكثر)
              </span>
            </button>
          ))}
        </div>
      ),
    },
    {
      id: "availability",
      title: "التوفر",
      content: (
        <label className="flex items-center gap-2 cursor-pointer">
          <Checkbox
            checked={filters.availability || false}
            onChange={(e) =>
              handleAvailabilityChange(e.target.checked)
            }
          />
          <span className="text-sm text-text-primary">المنتجات المتاحة فقط</span>
        </label>
      ),
    },
    {
      id: "discount",
      title: "الخصومات",
      content: (
        <div className="space-y-3">
          {[10, 20, 30, 50].map((discount) => (
            <label key={discount} className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={filters.discount === discount}
                onChange={(e) =>
                  setFilters({ discount: e.target.checked ? discount : undefined })
                }
              />
              <span className="text-sm text-text-primary">خصم {discount}% وأكثر</span>
            </label>
          ))}
        </div>
      ),
    },
  ];

  return (
    <motion.div
      className="sticky top-20 space-y-4"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">الفلاتر</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={resetFilters}
          className="text-accent text-xs"
        >
          مسح الكل
        </Button>
      </div>

      <Accordion items={accordionItems} allowMultiple={true} />
    </motion.div>
  );
}

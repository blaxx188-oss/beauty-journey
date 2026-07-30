/**
 * Order Success Page — Confirmation after successful order placement.
 * Arabic RTL, responsive, accessible.
 */

import React, { Suspense } from "react";
import SuccessPageContent from "./SuccessPageContent";

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex items-center justify-center">
          <p className="text-text-secondary">جاري تحميل الصفحة...</p>
        </div>
      }
    >
      <SuccessPageContent />
    </Suspense>
  );
}

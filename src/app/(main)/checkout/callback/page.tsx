/**
 * Paymob Callback Page — Handles payment gateway return.
 * Processes the payment result from Paymob and redirects accordingly.
 */

import React, { Suspense } from "react";
import CallbackPageContent from "./CallbackPageContent";

export default function CallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex items-center justify-center">
          <p className="text-text-secondary">جاري تحميل الصفحة...</p>
        </div>
      }
    >
      <CallbackPageContent />
    </Suspense>
  );
}

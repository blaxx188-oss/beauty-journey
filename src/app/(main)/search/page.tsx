"use client";

import React, { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { usePLPStore } from "@/stores/plp-store";
import ProductsPageContent from "../products/ProductsPageContent";

function SearchResultsHandler() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const { setFilters } = usePLPStore();

  useEffect(() => {
    if (query) {
      setFilters({ searchQuery: query });
    }
  }, [query, setFilters]);

  return <ProductsPageContent />;
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>جاري التحميل...</div>}>
      <SearchResultsHandler />
    </Suspense>
  );
}

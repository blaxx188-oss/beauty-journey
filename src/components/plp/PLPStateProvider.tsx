"use client";

import React from "react";
import { usePLPStore } from "@/stores/plp-store";

interface PLPStateProviderProps {
  children: React.ReactNode;
}

export default function PLPStateProvider({ children }: PLPStateProviderProps) {
  // Initialize or use the store. The actual store logic is in plp-store.ts
  // This component just ensures the store is available client-side.
  usePLPStore(); 
  return <>{children}</>;
}

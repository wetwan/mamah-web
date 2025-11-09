// components/ShopNavWrapper.tsx
"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";

const ShopNav = dynamic(() => import("./shopNav"), { ssr: false });

export default function ShopNavWrapper() {
  return (
    <Suspense fallback={<div className="lg:w-[250px] w-full p-4 animate-pulse">Loading filters...</div>}>
      <ShopNav />
    </Suspense>
  );
}
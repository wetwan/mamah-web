// components/ShopNavWrapper.tsx
"use client";

import dynamic from "next/dynamic";
const ShopNav = dynamic(() => import("./shopNav"), { ssr: false });

export default function ShopNavWrapper() {
  return <ShopNav />;
}

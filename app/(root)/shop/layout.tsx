// app/(root)/shop/layout.tsx
import Link from "next/link";
import React from "react";

import ShopNavWrapper from "@/components/ShopNavWrapper";
export const metadata = {
  title: "UAM SHOP",
  description: "YOUR ONE STOP YOUR HEART",
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div lang="en">
      <div className="w-full py-6 bg-[#f8f9fa] md:px-8 lg:px-16 xl:32 2xl:px-64 capitalize flex items-center gap-2 px-4 font-medium">
        <Link href="/" className="text-[#7971ea]">home</Link> / <p>Shop</p>
      </div>
      <div className="flex">
        <ShopNavWrapper />
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}

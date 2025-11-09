"use client";
export const dynamic = "force-dynamic";

import React from "react";
import Link from "next/link";
import Checkout from "@/components/checkout";

export default function CheckOutPage() {
  return (
    <div>
      {/* Breadcrumb */}
      <div className="w-full py-6 bg-[#f8f9fa] px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 flex items-center gap-2 capitalize font-medium">
        <Link href="/" className="text-[#7971ea]">
          Home
        </Link>
        <span>/</span>
        <Link href="/cart" className="text-[#7971ea]">
          Cart
        </Link>
        <span>/</span>
        <p>Checkout</p>
      </div>

      <Checkout />
    </div>
  );
}

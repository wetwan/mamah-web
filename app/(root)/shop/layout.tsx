"use client";

import dynamic from "next/dynamic";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "UAM SHOP",
  description: "YOUR ONE STOP YOUR HEART",
};

// Dynamically import ShopNav to skip SSR
const ShopNav = dynamic(() => import("@/components/shopNav"), { ssr: false });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div lang="en">
      <div className="w-full py-6 bg-[#f8f9fa] md:px-8 lg:px-16 xl:32 2xl:px-64 capitalize flex items-center gap-2 px-4 font-medium">
        <Link href={"/"} className="text-[#7971ea]">
          home
        </Link>
        / <p>Shop</p>
      </div>
      <div className="flex">
        <ShopNav />
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}

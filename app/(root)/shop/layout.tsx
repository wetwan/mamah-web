import ShopNav from "@/components/shopNav";
import { ShopSkeleton } from "@/components/skeleton";

import { Metadata } from "next";
import Link from "next/link";
import React, { Suspense } from "react";

export const metadata: Metadata = {
  title: "UAM SHOP",
  description: "YOUR ONE STOP YOUR HEART ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div lang="en">
      <div className="w-full  py-6 bg-[#f8f9fa] md:px-8 lg:px-16 xl:32 2xl:px-64   capitalize flex items-center gap-2 px-4 font-medium">
        <Link href={"/"} className="text-[#7971ea]">
          home
        </Link>
        / <p>Shop</p>
      </div>
      <div className="md:px-8 lg:px-16 xl:32 2xl:px-64 px-4 flex items-start flex-col lg:flex-row gap-20 mt-20">
        <Suspense fallback={<ShopSkeleton />}>
          <div className="">
            <ShopNav />
            {children}
          </div>
        </Suspense>
      </div>
    </div>
  );
}

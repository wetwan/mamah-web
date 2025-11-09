/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { X } from "lucide-react";

const ShopNav = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  // const setProducts = useProduct((s) => s.setProducts);
  const searchActive = Boolean(searchParams.get("search"));

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}product?limit=0`
      );
      return res.data.products; // Make sure this matches your API response key
    },
  });

  // useEffect(() => {
  //   if (products.length > 0) {
  //     setProducts(products);
  //   }
  // }, [products, setProducts]);

  const [min, setMin] = useState(searchParams.get("min") || "");
  const [max, setMax] = useState(searchParams.get("max") || "");

  // ✅ Fetch products from backend

  const updateQuery = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());

    // ✅ If user is searching and selects category → clear search first
    if (searchActive && key === "cat") {
      params.delete("search");
    }

    if (value) params.set(key, value);
    else params.delete(key);

    router.push(`/shop?${params.toString()}`);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (min) params.set("min", min);
      else params.delete("min");
      if (max) params.set("max", max);
      else params.delete("max");
      router.push(`/shop?${params.toString()}`);
    }, 500);
    return () => clearTimeout(timeout);
  }, [min, max, router, searchParams]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    products.forEach((p: any) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, [products]);

  const categories = Object.keys(categoryCounts);

  if (isLoading)
    return (
      <div className="lg:w-[250px] w-full p-4 animate-pulse space-y-8">
        {/* Category skeleton */}
        <div className="p-5 border shadow rounded w-full space-y-4">
          <div className="h-4 w-32 bg-gray-200 rounded" />
          <div className="space-y-3">
            <div className="h-3 w-full bg-gray-200 rounded" />
            <div className="h-3 w-full bg-gray-200 rounded" />
            <div className="h-3 w-full bg-gray-200 rounded" />
            <div className="h-3 w-full bg-gray-200 rounded" />
          </div>
        </div>

        {/* Price skeleton */}
        <div className="p-5 border shadow rounded w-full space-y-4">
          <div className="h-4 w-20 bg-gray-200 rounded" />
          <div className="space-y-3">
            <div className="h-10 w-32 bg-gray-200 rounded-full" />
            <div className="h-10 w-32 bg-gray-200 rounded-full" />
          </div>
        </div>
      </div>
    );

  return (
    <div className="lg:w-[250px] w-full p-4">
      {/* CATEGORY FILTER */}
      <div className="p-5 border shadow rounded w-full">
        <h4 className="uppercase font-bold mt-4">Categories</h4>
        <div className="mt-6">
          <div
            onClick={() => updateQuery("cat", null)}
            className={`flex mt-2 justify-between py-2 cursor-pointer ${
              !searchParams.get("cat") ? "text-[#7971ea] font-medium" : ""
            }`}
          >
            <p className="capitalize font-light">All</p>
            <p>({products.length})</p>
          </div>

          {categories.map((cat: string) => (
            <div
              key={cat}
              onClick={() =>
                updateQuery("cat", searchParams.get("cat") === cat ? null : cat)
              }
              className="flex mt-2 justify-between py-2 cursor-pointer"
            >
              <p
                className={`capitalize font-light ${
                  searchParams.get("cat") === cat
                    ? "text-[#7971ea] font-medium"
                    : ""
                }`}
              >
                {cat}
              </p>
              <p>({categoryCounts[cat]})</p>
            </div>
          ))}
        </div>
      </div>

      {/* PRICE FILTER */}
      <div className="p-5 border shadow rounded w-full mt-10">
        <h4 className="uppercase font-bold mt-4">Price</h4>
        <div className="mt-6">
          <div className="flex flex-row md:flex-col gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="min price"
                value={min}
                onChange={(e) => setMin(e.target.value)}
                className="border w-32 py-2 px-3 rounded-full placeholder:capitalize"
              />
              <X
                className=" absolute right-3 top-4 hover:text-red-600 cursor-pointer z-40"
                onClick={() => setMin("")}
                size={15}
              />
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="max price"
                value={max}
                onChange={(e) => setMax(e.target.value)}
                className="border w-32 py-2 px-3 rounded-full placeholder:capitalize"
              />
              <X
                className=" absolute right-3 top-4 hover:text-red-600 cursor-pointer z-40"
                onClick={() => setMax("")}
                size={15}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopNav;

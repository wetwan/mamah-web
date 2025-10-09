"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Checkbox } from "./ui/checkbox";
import { useRouter, useSearchParams } from "next/navigation";
import { products } from "@/constant"; // ✅ import your dummy products

const ShopNav = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // states for min/max
  const [min, setMin] = useState(searchParams.get("min") || "");
  const [max, setMax] = useState(searchParams.get("max") || "");

  // helper: update query param in URL
  const updateQuery = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    router.push(`/shop?${params.toString()}`);
  };

  // debounce price filter
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (min || max) {
        const params = new URLSearchParams(searchParams.toString());
        if (min) params.set("min", min);
        else params.delete("min");
        if (max) params.set("max", max);
        else params.delete("max");
        router.push(`/shop?${params.toString()}`);
      }
    }, 500);
    return () => clearTimeout(timeout);
  }, [min, max, router, searchParams]);

  // ✅ Dynamically compute counts from products
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    products.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, []);

  // const colorCounts = useMemo(() => {
  //   const counts: Record<string, number> = {};
  //   products.forEach((p) => {
  //     p.colors?.forEach((c) => {
  //       counts[String(c)] = (counts[String(c)] || 0) + 1;
  //     });
  //   });
  //   return counts;
  // }, []);

  // const sizeCounts = useMemo(() => {
  //   const counts: Record<string, number> = {};
  //   products.forEach((p) => {
  //     p.sizes?.forEach((s: string) => {
  //       counts[s] = (counts[s] || 0) + 1;
  //     });
  //   });
  //   return counts;
  // }, []);

  // Extract unique categories/colors/sizes for display
  const categories = Object.keys(categoryCounts);
  // const colors = Object.keys(colorCounts);
  // const sizes = Object.keys(sizeCounts);

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
          {categories.map((cat) => (
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
            <input
              type="text"
              placeholder="min price"
              value={min}
              onChange={(e) => setMin(e.target.value)}
              className="border w-32 py-2 px-3 rounded-full placeholder:capitalize"
            />
            <input
              type="text"
              placeholder="max price"
              value={max}
              onChange={(e) => setMax(e.target.value)}
              className="border w-32 py-2 px-3 rounded-full placeholder:capitalize"
            />
          </div>
        </div>

        {/* SIZE FILTER */}
        {/* <h4 className="uppercase font-bold mt-4">Size</h4>
        <div className="mt-6">
          {sizes.map((size) => (
            <div
              key={size}
              className="flex mt-2 gap-3 py-2 items-center cursor-pointer"
              onClick={() => updateQuery("size", size)}
            >
              <Checkbox checked={searchParams.get("size") === size} />
              <p
                className={`capitalize font-light ${
                  searchParams.get("size") === size
                    ? "text-[#7971ea] font-medium"
                    : ""
                }`}
              >
                {size}
              </p>
              <p>({sizeCounts[size]})</p>
            </div>
          ))}
        </div> */}

        {/* COLOR FILTER */}
        {/* <div className="mt-10">
          <h4 className="uppercase font-bold">Color</h4>
          <div className="mt-4">
            {colors.map((color) => (
              <div
                key={color}
                className="flex mt-2 gap-3 py-2 items-center cursor-pointer"
                onClick={() => updateQuery("color", color)}
              >
                <div
                  className="w-[12px] h-[12px] rounded-full border"
                  style={{ backgroundColor: color }}
                />
                <p
                  className={`capitalize font-light ${
                    searchParams.get("color") === color
                      ? "text-[#7971ea] font-medium"
                      : ""
                  }`}
                >
                  {color}
                </p>
                <p>({colorCounts[color]})</p>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ShopNav;

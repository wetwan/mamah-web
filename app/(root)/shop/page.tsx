/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Suspense } from "react";
import ProductItem from "@/components/productItem";
import { products } from "@/constant";
import { Category, SortSelect } from "@/components/filter";

type SearchParams = {
  cat?: string;
  color?: string;
  size?: string;
  min?: string;
  max?: string;
  sort?: string;
};

export default async function Shop({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const { cat, color, size, min, max, sort } = searchParams || {};

  // --- filter logic ---
  let filteredProducts = products.filter((item) => {
    const matchCategory = cat ? item.category === cat : true;
    const matchColor = color ? item.colors?.includes(color as any) : true;
    const matchSize = size ? item.sizes?.includes(size as any) : true;
    const matchMin = min ? item.price >= Number(min) : true;
    const matchMax = max ? item.price <= Number(max) : true;

    return matchCategory && matchColor && matchSize && matchMin && matchMax;
  });

  // --- sort logic ---
  if (sort) {
    switch (sort) {
      case "a-z":
        filteredProducts = [...filteredProducts].sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        break;
      case "z-a":
        filteredProducts = [...filteredProducts].sort((a, b) =>
          b.name.localeCompare(a.name)
        );
        break;
      case "low-high":
        filteredProducts = [...filteredProducts].sort(
          (a, b) => a.price - b.price
        );
        break;
      case "high-low":
        filteredProducts = [...filteredProducts].sort(
          (a, b) => b.price - a.price
        );
        break;
    }
  }

  // --- header text ---
  const activeFilters = [cat, color, size].filter(Boolean).join(" • ");
  const priceRange = min || max ? `₦${min || "0"} - ₦${max || "∞"}` : "";

  return (
    <section className="w-full p-4">
      <div className="flex justify-between lg:items-center lg:flex-row flex-col gap-4">
        <h3 className="font-bold capitalize text-xl">
          {activeFilters || priceRange
            ? `${activeFilters} ${priceRange}`
            : "Shop All"}
        </h3>

        <div className="flex p-4 gap-4">
          <Suspense fallback={<div> lodding ..</div>}>
            <Category />
            <SortSelect />
          </Suspense>
        </div>
      </div>

      <div>
        {filteredProducts.length > 0 ? (
          <ProductItem products={filteredProducts} />
        ) : (
          <p className="text-gray-500 mt-10 text-center">No products found.</p>
        )}
      </div>
    </section>
  );
}

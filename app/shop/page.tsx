/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProductItem from "@/components/productItem";
import { products } from "@/constant";

type SearchParams = {
  cat?: string;
  color?: string;
  size?: string;
  min?: string;
  max?: string;
};

export default function Shop({ searchParams }: { searchParams: SearchParams }) {
  const { cat, color, size, min, max } = searchParams;

  // --- filter logic ---
  const filteredProducts = products.filter((item) => {
    const matchCategory = cat ? item.category === cat : true;
    const matchColor = color ? item.colors?.includes(color as any) : true;
    const matchSize = size ? item.sizes?.includes(size as any) : true;

    const matchMin = min ? item.price >= Number(min) : true;
    const matchMax = max ? item.price <= Number(max) : true;

    return matchCategory && matchColor && matchSize && matchMin && matchMax;
  });

  // --- helpers for sorting dropdowns (you can add real logic later) ---
  function Category() {
    return (
      <Select>
        <SelectTrigger className="w-[200px] bg-gray border border-gray-300 shadow-sm hover:border-blue-400 focus:ring-2 focus:ring-blue-300 transition-all duration-200">
          <SelectValue placeholder="Least" />
        </SelectTrigger>
        <SelectContent className="bg-white border border-gray-200 shadow-lg">
          <SelectGroup>
            <SelectLabel className="text-gray-500 text-sm font-medium px-2 py-1">
              Least ▼
            </SelectLabel>
            <SelectItem value="women">Women</SelectItem>
            <SelectItem value="men">Men</SelectItem>
            <SelectItem value="children">Children</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  }

  function Size() {
    return (
      <Select>
        <SelectTrigger className="w-[200px] bg-white border border-gray-300 shadow-sm hover:border-blue-400 focus:ring-2 focus:ring-blue-300 transition-all duration-200">
          <SelectValue placeholder="Relevance" />
        </SelectTrigger>
        <SelectContent className="bg-white border border-gray-200 shadow-lg">
          <SelectGroup>
            <SelectLabel className="text-gray-500 text-sm font-medium px-2 py-1">
              Relevance
            </SelectLabel>
            <SelectItem value="a-z">Name, A to Z</SelectItem>
            <SelectItem value="-z-a">Name, Z to A</SelectItem>
            <SelectItem value="low-high">Price, low to high</SelectItem>
            <SelectItem value="high">Price, high to low</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    );
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
          <Category />
          <Size />
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

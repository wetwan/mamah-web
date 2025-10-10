"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { products } from "@/constant";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";

export function Category() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateQuery = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    router.push(`/shop?${params.toString()}`);
  };

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    products.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return ["all", ...Object.keys(counts)]; // Add "all" option
  }, []);

  return (
    
    <Select
      onValueChange={(value) =>
        updateQuery("cat", value === "all" ? "" : value)
      }
      defaultValue={searchParams.get("cat") || "all"}
    >
      <SelectTrigger className="w-[200px] bg-gray border border-gray-300 shadow-sm hover:border-blue-400 focus:ring-2 focus:ring-blue-300 transition-all duration-200">
        <SelectValue placeholder="Select Category" />
      </SelectTrigger>
      <SelectContent className="bg-white border border-gray-200 shadow-lg capitalize">
        <SelectGroup>
          <SelectLabel className="text-gray-500 text-sm font-medium px-2 py-1">
            Category
          </SelectLabel>
          {categoryCounts.map((cat) => (
            <SelectItem key={cat} value={cat}>
              {cat === "all" ? "All" : cat}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export function SortSelect() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateQuery = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    router.push(`/shop?${params.toString()}`);
  };

  return (
    <Select
      onValueChange={(value) => updateQuery("sort", value)}
      defaultValue={searchParams.get("sort") || ""}
    >
      <SelectTrigger className="w-[200px] bg-white border border-gray-300 shadow-sm hover:border-blue-400 focus:ring-2 focus:ring-blue-300 transition-all duration-200">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent className="bg-white border border-gray-200 shadow-lg">
        <SelectGroup>
          <SelectLabel className="text-gray-500 text-sm font-medium px-2 py-1">
            Sort
          </SelectLabel>
          <SelectItem value="a-z">Name, A to Z</SelectItem>
          <SelectItem value="z-a">Name, Z to A</SelectItem>
          <SelectItem value="low-high">Price, low to high</SelectItem>
          <SelectItem value="high-low">Price, high to low</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

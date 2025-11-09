"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getProducts } from "@/src/api/product/route";
import { ShopdataProp } from "@/constant";

export default function Category() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const updateQuery = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    router.push(`/shop?${params.toString()}`);
  };

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    products.forEach((p: ShopdataProp) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, [products]);

  const categories = ["all", ...Object.keys(categoryCounts)];

  return (
    <Select
      onValueChange={(value) => updateQuery("cat", value === "all" ? "" : value)}
      defaultValue={searchParams.get("cat") || "all"}
    >
      <SelectTrigger className="w-[200px] border border-gray-300 rounded">
        <SelectValue placeholder="Select Category" />
      </SelectTrigger>
      <SelectContent className="bg-white border border-gray-200 shadow-lg capitalize">
        <SelectGroup>
          <SelectLabel className="text-gray-500 text-sm px-2 py-1">Category</SelectLabel>
          {categories.map((cat) => (
            <SelectItem key={cat} value={cat}>
              {cat === "all" ? "All" : cat}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

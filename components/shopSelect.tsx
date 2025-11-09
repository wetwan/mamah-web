"use client";

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

export default function SortSelect() {
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
      <SelectTrigger className="w-[200px] border border-gray-300 rounded">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent className="bg-white border border-gray-200 shadow-lg">
        <SelectGroup>
          <SelectLabel className="text-gray-500 text-sm px-2 py-1">Sort</SelectLabel>
          <SelectItem value="a-z">Name, A to Z</SelectItem>
          <SelectItem value="z-a">Name, Z to A</SelectItem>
          <SelectItem value="low-high">Price, low to high</SelectItem>
          <SelectItem value="high-low">Price, high to low</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

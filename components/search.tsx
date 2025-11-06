"use client";

import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import React, { useState } from "react";

const SearchBox = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialValue = searchParams.get("search") || "";

  const [value, setValue] = useState(initialValue);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams.toString());

    if (value.trim()) {
      params.set("search", value.trim());
      params.set("page", "1"); // ✅ reset to first page
    } else {
      params.delete("search");
      params.set("page", "1"); // reset here too
    }

    router.push(`/shop?${params.toString()}`);
  };
  return (
    <form
      className=" max-sm:flex-1 flex gap-2 py-4 p-2 items-center md:w-1/3 "
      onSubmit={handleSearch}
    >
      <Search color="gray" className="md:text-lg lg:text-5xl " />
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        name="search"
        placeholder="Search products..."
      />
      {value && <X onClick={() => setValue("")} />}
    </form>
  );
};

export default SearchBox;

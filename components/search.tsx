/* eslint-disable @typescript-eslint/no-empty-object-type */
"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

import React from "react";

type Props = {};

const SearchBox = ({}: Props) => {
  const router = useRouter();

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    if (name) {
      router.push(`/shop?name=${name}`);
    }
  };
  return (
    <form
      className=" max-sm:flex-1 flex gap-2 py-4 p-2 items-center md:w-1/3 "
      onSubmit={handleSearch}
    >
      <Search color="gray" className="md:text-lg lg:text-5xl " />
      <Input
        name="name"
        className="ring-0 hover:ring-0 focus-visible:ring-0 focus-visible::ring-0 border-0 focus:-translate-x-1 focus-visible:border-0 placeholder:text-lg  pl-2 md:text-lg shadow-none"
        placeholder="Search"
      />
    </form>
  );
};

export default SearchBox;

/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React from "react";

type Props = {};

const SearchBox = ({}: Props) => {
  return (
    <div className=" max-sm:flex-1 flex gap-2 py-4 p-2 items-center md:w-1/3 ">
      <Search color="gray" className="md:text-lg lg:text-5xl " />
      <Input
        className="ring-0 hover:ring-0 focus-visible:ring-0 focus-visible::ring-0 border-0 focus:-translate-x-1 focus-visible:border-0 placeholder:text-lg  pl-2 md:text-lg shadow-none"
        placeholder="Search"
      />
    </div>
  );
};

export default SearchBox;

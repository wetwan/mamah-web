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

const Shop = async ({ searchParams }: { searchParams: any }) => {
  const params = await searchParams;
  console.log("category:", params.cat);

  function Category() {
    return (
      <Select>
        <SelectTrigger className="w-[200px]  bg-gray border border-gray-300 shadow-sm hover:border-blue-400 focus:ring-2 focus:ring-blue-300 transition-all duration-200">
          <SelectValue placeholder="Least" />
        </SelectTrigger>
        <SelectContent className="bg-white border border-gray-200 shadow-lg">
          <SelectGroup>
            <SelectLabel className="text-gray-500 text-sm font-medium px-2 py-1">
              Least ▼
            </SelectLabel>
            <SelectItem
              className="cursor-pointer text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg px-2 py-2"
              value="apple"
            >
              Women
            </SelectItem>
            <SelectItem
              className="cursor-pointer text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg px-2 py-2"
              value="banana"
            >
              Men
            </SelectItem>
            <SelectItem
              className="cursor-pointer text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg px-2 py-2"
              value="blueberry"
            >
              Children
            </SelectItem>
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
            <SelectItem
              className="cursor-pointer text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg px-2 py-2"
              value="a-z"
            >
              Name, A to Z
            </SelectItem>
            <SelectItem
              className="cursor-pointer text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg px-2 py-2"
              value="-z-a"
            >
              Name, Z to A
            </SelectItem>
            <SelectItem
              className="cursor-pointer text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg px-2 py-2"
              value="low-high"
            >
              Price, low to high
            </SelectItem>
            <SelectItem
              className="cursor-pointer text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg px-2 py-2"
              value="high"
            >
              Price, high to low
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  }

  return (
    <section className="w-full p-4 ">
      <div className="flex justify-between lg:items-center lg:flex-row flex-col gap-4">
        <h3 className="font-bold capitalize text-xl">shop all</h3>
        <div className="flex p-4 gap-4">
          <Category />
          <Size />
        </div>
      </div>
      <div className="">
        <ProductItem />
      </div>
    </section>
  );
};

export default Shop;

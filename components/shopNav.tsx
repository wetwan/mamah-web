"use client";

import React, { useState, useEffect } from "react";
import { Checkbox } from "./ui/checkbox";
import { useRouter, useSearchParams } from "next/navigation";

const ShopNav = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // state for min and max price
  const [min, setMin] = useState(searchParams.get("min") || "");
  const [max, setMax] = useState(searchParams.get("max") || "");

  const category = [
    { name: "women", number: 4345 },
    { name: "men", number: 5376 },
    { name: "children", number: 5376 },
  ];
  const size = [
    { name: "small", number: 4345 },
    { name: "medium", number: 5376 },
    { name: "large", number: 5376 },
  ];
  const color = [
    { name: "red", number: 4345 },
    { name: "blue", number: 5376 },
    { name: "green", number: 5376 },
    { name: "pink", number: 5976 },
    { name: "purple", number: 2376 },
  ];

  // helper to update a specific query param
  const updateQuery = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/shop?${params.toString()}`);
  };

  // auto-update query when price inputs change
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
  }, [min, max]);

  return (
    <div className="lg:w-[250px] w-full p-4">
      {/* CATEGORY */}
      <div className="p-5 border shadow rounded w-full">
        <h4 className="uppercase font-bold mt-4">Categories</h4>
        <div className="mt-6">
          {category.map((item, index) => (
            <div
              key={index}
              onClick={() => updateQuery("cat", item.name)}
              className="flex mt-2 justify-between py-2 cursor-pointer"
            >
              <p
                className={`capitalize font-light ${
                  searchParams.get("cat") === item.name
                    ? "text-[#7971ea] font-medium"
                    : ""
                }`}
              >
                {item.name}
              </p>
              <p>({item.number})</p>
            </div>
          ))}
        </div>
      </div>

      {/* PRICE */}
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

        {/* SIZE */}
        <h4 className="uppercase font-bold mt-4">Size</h4>
        <div className="mt-6">
          {size.map((item, index) => (
            <div
              key={index}
              className="flex mt-2 gap-3 py-2 items-center cursor-pointer"
              onClick={() => updateQuery("size", item.name)}
            >
              <Checkbox checked={searchParams.get("size") === item.name} />
              <p
                className={`capitalize font-light ${
                  searchParams.get("size") === item.name
                    ? "text-[#7971ea] font-medium"
                    : ""
                }`}
              >
                {item.name}
              </p>
              <p>({item.number})</p>
            </div>
          ))}
        </div>

        {/* COLOR */}
        <div className="mt-10">
          <h4 className="uppercase font-bold">Color</h4>
          <div className="mt-4">
            {color.map((item, index) => (
              <div
                key={index}
                className="flex mt-2 gap-3 py-2 items-center cursor-pointer"
                onClick={() => updateQuery("color", item.name)}
              >
                <div
                  className="w-[12px] h-[12px] rounded-full border"
                  style={{ backgroundColor: item.name }}
                />
                <p
                  className={`capitalize font-light ${
                    searchParams.get("color") === item.name
                      ? "text-[#7971ea] font-medium"
                      : ""
                  }`}
                >
                  {item.name}
                </p>
                <p>({item.number})</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopNav;

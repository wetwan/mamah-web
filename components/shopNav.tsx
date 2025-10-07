"use client";

import React from "react";
import { Checkbox } from "./ui/checkbox";
import Link from "next/link";


const ShopNav = () => {
  const categoty = [
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
  return (
    <div className="lg:w-[250px] w-full p-4  ">
      <div className="p-5 border shadow rounded w-full">
        <h4 className="uppercase font-bold mt-4 ">Categories</h4>
        <div className="mt-6">
          {categoty.map((item, index) => (
            <div key={index} className="flex mt-2 justify-between py-2  ">
              <Link
                className="text-[#7971ea] capitalize font-light"
                href={"/shop?cat=" + item.name}
              >
                {item.name}
              </Link>
              <p className="">({item.number})</p>
            </div>
          ))}
        </div>
      </div>
      <div className="p-5 border shadow rounded w-full mt-10">
        <div className="">
          <h4 className="uppercase font-bold mt-4 ">price</h4>
          <div className="mt-6">
            <div className="flex flex-row md:flex-col gap-4">
              <input type="text" name="" id="" placeholder="min price" className="border w-32 py-2 px-3 rounded-full placeholder:capitalize " />
              <input type="text" name="" id="" placeholder="max price" className="border w-32 py-2 px-3 rounded-full placeholder:capitalize " />
            </div>
          </div>
        </div>
        <div className="">
          <h4 className="uppercase font-bold mt-4 ">size</h4>
          <div className="mt-6">
            {size.map((item, index) => (
              <div key={index} className="flex mt-2 gap-3 py-2  items-center">
                <Checkbox className="" />
                <Link
                  href={"/shop?cat=" + item.name}
                  className=" capitalize font-light"
                >
                  {item.name}
                </Link>
                <p className="">({item.number})</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10">
          <h4 className="uppercase font-bold  ">color</h4>
          <div className="mt-4">
            {color.map((item, index) => (
              <Link
                href={"/shop?cat=" + item.name}
                key={index}
                className="flex mt-2 gap-3 py-2  items-center"
              >
                <div
                  className=" w-[10px] h-[10px] rounded-full "
                  style={{ backgroundColor: item.name }}
                />

                <p className=" capitalize font-light">{item.name}</p>
                <p className="">({item.number})</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopNav;

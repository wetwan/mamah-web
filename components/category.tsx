/* eslint-disable @next/next/no-img-element */

import { CategoryProp } from "@/constant";
import axios from "axios";

import Link from "next/link";
import React from "react";

const Category = async () => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}category/`
  );
  const { categories: cat } = data;
  console.log(cat);
  return (
    <div className="flex w-full overflow-scroll  scrollbar-hide  ">
      {cat.map((category: CategoryProp) => (
        <div key={category._id} className=" p-4 flex flex-col items-center">
          <Link
            as={`/shop?cat=${category.slug}`}
            href={`/shop?cat=${category.slug}`}
            className="h-[200px] w-[200px]        "
          >
            <img
              src={category.image}
              className="w-full h-full object-cover"
              alt={category.name}
            />
          </Link>

          <h3 className="text-[#7971ea] my-3 font-medium capitalize">
            {category.name}
          </h3>
        </div>
      ))}
    </div>
  );
};

export default Category;

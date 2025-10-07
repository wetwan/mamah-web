
/* eslint-disable @next/next/no-img-element */
import { cat } from "@/constant";
import Link from "next/link";
import React from "react";

const Category = () => {
  return (
    <div className="flex w-full overflow-scroll  scrollbar-hide  ">
      {cat.map((category) => (
        <div key={category._id} className=" p-4 flex flex-col items-center">
          <Link
            href={`/shop?cat=${category.slug}`}
            className="h-[200px] w-[200px]        "
          >
            <img
              src={category.image}
              className="w-full h-full"
              alt={category.image}
            />
          </Link>

          <h3 className="text-blue-700 my-3 font-medium capitalize">
            {category.name}
          </h3>
        </div>
      ))}
    </div>
  );
};

export default Category;

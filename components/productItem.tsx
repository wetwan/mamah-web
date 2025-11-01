/* eslint-disable @next/next/no-img-element */
import React from "react";
import { ShopdataProp } from "@/constant";
import Link from "next/link";

const ProductItem = ({ products }: { products: ShopdataProp[] }) => {
  // checking if prodct is avalible
  if (!products || products.length === 0) {
    return (
      <p className="text-gray-500 mt-10 text-center">No products found.</p>
    );
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8">
      {products.map((product) => (
        <div key={product._id} className=" shadow-2xl flex flex-col  pb-10">
          <div className="relative w-full h-[350px] group overflow-hidden">
            <Link
              href={`/${product._id}`}
              className=" h-full w-full overflow-hidden group-hover:opacity-0 transition duration-300 ease-in-out"
            >
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </Link>
            <div className=" h-full w-full overflow-hidden group-hover:opacity-100 transition duration-300 ease-in-out absolute top-0 left-0 bottom-0 right-0 opacity-0 ">
              <img
                src={product.images[1]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="flex-1 p-4 flex flex-col justify-between items-center text-center">
            <Link
              className="text-[#7971ea] my-3 font-medium capitalize"
              href={`/${product._id}`}
            >
              {product.name}
            </Link>
            <h3 className="text-gray-400 mb-4 ">
              {product.description.slice(0, 20)}
            </h3>
            <h3 className="text-[#7971ea] font-medium capitalize">
              ₦{product.price}
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductItem;

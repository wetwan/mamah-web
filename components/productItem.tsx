/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
/* eslint-disable @next/next/no-img-element */

import React from "react";

import Link from "next/link";
import { ShopdataProp } from "@/src/types/tpes";
import { useRouter } from "next/navigation";
import { useLocalPrice } from "@/src/hooks/useLocalPrice";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useExchangeRate = () => {
  return useQuery({
    queryKey: ["exchange-rate"],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}get-price/1`
      );
      return {
        currency: res.data.currency,
        symbol: res.data.symbol,
        rate: res.data.raw,
        country: res.data.country,
      };
    },
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 2,
  });
};

// Format price with symbol
const formatPrice = (
  price: number,
  rate: number,
  symbol: string,
  currency: string
) => {
  const converted = price * rate;

  // Format based on currency
  const formatted = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(converted);

  return `${symbol}${formatted}`;
};

const ProductPrice = ({ price }: { price: number }) => {
  const { data: exchangeData, isLoading, error } = useExchangeRate();
  // const { data: exchangeData, isLoading, error } = useLocalPrice(1);

  // Loading state
  if (isLoading) {
    return (
      <h3 className="text-[#7971ea] font-medium capitalize animate-pulse">
        ₦{price.toFixed(2)}
      </h3>
    );
  }

  if (error || !exchangeData || exchangeData.currency === "NGN") {
    return (
      <h3 className="text-[#7971ea] font-medium capitalize">
        ₦{price.toFixed(2)}
      </h3>
    );
  }
  const convertedPrice = formatPrice(
    price,
    exchangeData.rate,
    exchangeData.symbol,
    exchangeData.currency
  );

  return (
    <div className="flex flex-col items-center gap-1">
      <h3 className="text-[#7971ea] font-medium capitalize">
        {convertedPrice}
      </h3>
    </div>
  );
};

const ProductItem = ({ products }: { products: ShopdataProp[] }) => {
  const router = useRouter();
  if (!products || products.length === 0) {
    return (
      <p className="text-gray-500 mt-10 text-center">No products found.</p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8">
      {products
        .filter((p) => p.stock !== 0)
        .map((product) => (
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

            <div
              className="flex-1 p-4 flex flex-col justify-between items-center text-center cursor-pointer"
              onClick={() => router.push(`/${product._id}`)}
            >
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
                {product.displayPrice.formatted}
              </h3>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ProductItem;

import React, { Suspense } from "react";
import ProductItem from "@/components/productItem";
import { Category, SortSelect } from "@/components/filter";
import axios from "axios";
import { PaginationDemo } from "@/components/pagenation";
import { ShopSkeleton } from "@/components/skeleton";

type SearchParams = {
  cat?: string;
  color?: string;
  size?: string;
  min?: string;
  max?: string;
  sort?: string;
  page?: string;
  search?: string;
};

export default async function Shop({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const { cat, color, size, min, max, sort, page = "1", search } = params || {};

  const query = new URLSearchParams({
    ...(cat && { cat }),
    ...(color && { color }),
    ...(size && { size }),
    ...(min && { min }),
    ...(max && { max }),
    ...(sort && { sort }),
    ...(search && { search }),
    page,
  });

  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}product/all?${query.toString()}`
  );

  const { products, page: currentPage, pages: totalPages } = data;

  //

  return (
    <section className="w-full p-4">
      <div className="flex justify-between lg:items-center lg:flex-row flex-col gap-4">
        <h3 className="font-bold capitalize text-xl">Shop</h3>

        <div className="flex p-4 gap-4">
          <Suspense fallback={<ShopSkeleton />}>
            <Category />
            <SortSelect />
          </Suspense>
        </div>
      </div>

      <div>
        {products ? (
          <ProductItem products={products} />
        ) : (
          <p className="text-gray-500 mt-10 text-center">No products found.</p>
        )}
      </div>

      <PaginationDemo currentPage={currentPage} totalPages={totalPages} />
    </section>
  );
}

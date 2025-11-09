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
  const { cat, color, size, min, max, sort, page = "1", search } = searchParams;

  const query = new URLSearchParams();

  if (cat) query.set("cat", cat);
  if (color) query.set("color", color);
  if (size) query.set("size", size);
  if (min) query.set("min", min);
  if (max) query.set("max", max);
  if (sort) query.set("sort", sort);
  if (search) query.set("search", search);

  // Always include page
  query.set("page", page);

  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}product/all?${query.toString()}`
  );

  const { products, page: currentPage, pages: totalPages } = data;

  return (
    <section className="w-full p-4">
      <div className="flex justify-between lg:items-center lg:flex-row flex-col gap-4">
        <div className="">
          <h3 className="font-bold text-xl capitalize">
            {search || cat ? search || cat : "Shop"}
          </h3>

          {(search || cat || min || max) && (
            <p className="text-sm text-gray-500 mb-4">
              Showing results for{" "}
              <span className="font-medium">
                {search || cat || "all products"}
              </span>
              {(min || max) &&
                ` (Price range: ₦${min || "0"} - ₦${max || "∞"})`}
            </p>
          )}
        </div>

        <div className="flex p-4 gap-4">
          <Category />
          <SortSelect />
        </div>
      </div>

      <div>
        {products?.length > 0 ? (
          <ProductItem products={products} />
        ) : (
          <p className="text-gray-500 mt-10 text-center">No products found.</p>
        )}
      </div>

      {products?.length >= 20 && totalPages > 1 && (
        <PaginationDemo currentPage={currentPage} totalPages={totalPages} />
      )}
    </section>
  );
}

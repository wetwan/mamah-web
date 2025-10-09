import H2 from "@/components/h2";
import ProductDetails from "@/components/productDetails";
import ProductItem from "@/components/productItem";
import ProductPageImage from "@/components/productPageImage";
import { products } from "@/constant";
import Link from "next/link";
import React from "react";

const ProductPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const product = products.find((p) => p._id === slug);

  if (!product) {
    return (
      <div className="p-10 text-center text-gray-500">Product not found.</div>
    );
  }

  return (
    <div>
      <div className="w-full  py-6 bg-[#f8f9fa] md:px-8 lg:px-16 xl:32 2xl:px-64   capitalize flex items-center gap-2 px-4 font-medium">
        <Link href={"/"} className="text-blue-600">
          home
        </Link>
        /
        <Link href={"/shop"} className="text-blue-600">
          shop
        </Link>
        /<p>{product.name}</p>
      </div>
      <div className=" md:px-8 lg:px-16 xl:32 2xl:px-64 px-4 flex flex-col lg:flex-row gap-10 my-20">
        <div className="lg:w-1/2 w-full h-max lg:sticky top-20">
          <ProductPageImage images={product.images} />
        </div>

        <div className="lg:w-1/2 w-fit max-sm:mt-10">
          <ProductDetails item={product} />
        </div>
      </div>{" "}
      <div className="my-20 lg:w-full w-full md:px-8 lg:px-16 xl:32 2xl:px-64 px-4 flex flex-col items-center gap-10">
        <H2 text="related product" className="" />
        <ProductItem products={products} />
      </div>
    </div>
  );
};

export default ProductPage;

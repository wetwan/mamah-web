import H2 from "@/components/h2";
import ProductDetails from "@/components/productDetails";
import ProductItem from "@/components/productItem";
import ProductPageImage from "@/components/productPageImage";
import { ShopdataProp } from "@/constant";
import axios from "axios";
import Link from "next/link";
import React from "react";

const ProductPage = async ({ params }: { params: { slug: string } }) => {
  // getting slug
  const { slug } = params;

  // getting product
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}product/${slug}`
  );

  // gettting products
  const { data: Datas } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}product/all`
  );

  const { product } = data;
  const { products } = Datas;

  if (!product) {
    return (
      <div className="p-10 text-center text-gray-500">Product not found.</div>
    );
  }

  // getting prodcuts related by categories

  const relatedProduct = products.filter(
    (d: ShopdataProp) => d.category === product.category
  );

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
        <H2
          text="shop popular"
          className="mx-auto mb-5 flex flex-col items-center "
        />
        <ProductItem products={relatedProduct} />
      </div>
    </div>
  );
};

export default ProductPage;

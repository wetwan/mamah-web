/* eslint-disable @next/next/no-img-element */
import React from "react";
import image1 from "@/public/image1.png";
import image2 from "@/public/image3.png";
import { shopdataProp } from "@/constant";
import Link from "next/link";

const ProductItem = () => {
  const products: shopdataProp[] = [
    {
      _id: "prod1",
      name: "Elegant Dress",
      images: [
        "https://res.cloudinary.com/dlu80k3sn/image/upload/v1759738848/products/fzulaxupozmxx67tc0sd.png",
        image1.src,
      ],
      colors: [
        { name: "red", available: true },
        { name: "blue", available: true },
      ],
      sizes: ["S", "M", "L"],
      price: 45,
      discount: 10,
      category: "clothing",
      stock: 20,
      description: "Stylish and comfortable dress",
      postedby: "user1",
      averageRating: 4,
      numOfReviews: 2,
      reviews: [
        {
          user: "reviewer1",
          rating: 5,
          comment: "Love it!",
          createdAt: 1759747029114,
          updatedAt: 1759747029114,
        },
      ],
      createdAt: 1759738848302,
      updatedAt: 1759754409935,
    },
    {
      _id: "prod2",
      name: "Sporty Sneakers",
      images: [
        "https://res.cloudinary.com/dlu80k3sn/image/upload/v1759738848/products/fzulaxupozmxx67tc0sd.png",
        image2.src,
      ],
      colors: [
        { name: "black", available: true },
        { name: "white", available: true },
      ],
      sizes: ["M", "L"],
      price: 60,
      discount: 5,
      category: "shoes",
      stock: 15,
      description: "Comfortable sneakers for daily wear",
      postedby: "user2",
      averageRating: 5,
      numOfReviews: 3,
      reviews: [
        {
          user: "reviewer2",
          rating: 5,
          comment: "Perfect fit!",
          createdAt: 1759747029214,
          updatedAt: 1759747029214,
        },
      ],
      createdAt: 1759738848402,
      updatedAt: 1759754409945,
    },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8">
      {products.map((product) => (
        <Link
          href={`/${product._id}`}
          key={product._id}
          className=" shadow-2xl flex flex-col  pb-10"
        >
          <div className="relative w-full h-[350px] group overflow-hidden">
            <div className=" h-full w-full overflow-hidden group-hover:opacity-0 transition duration-300 ease-in-out">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className=" h-full w-full overflow-hidden group-hover:opacity-100 transition duration-300 ease-in-out absolute top-0 left-0 bottom-0 right-0 opacity-0 ">
              <img
                src={product.images[1]}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          <div className="flex-1 p-4 flex flex-col justify-between items-center text-center">
            <h3 className="text-blue-700 my-3 font-medium capitalize">
              {product.name}
            </h3>
            <h3 className="text-gray-400 mb-4 ">{product.description}</h3>
            <h3 className="text-blue-700 font-medium capitalize">
              ${product.price}
            </h3>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductItem;

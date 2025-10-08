"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";

const ProductDetails = () => {
  const item = {
    name: "testetstetste testststs",
    images: [
      "https://res.cloudinary.com/dlu80k3sn/image/upload/v1759872767/products/lwedxvsdptgdroroltpz.jpg",
      "https://res.cloudinary.com/dlu80k3sn/image/upload/v1759872768/products/igsvdsdkfoniewca8jkc.png",
      "https://res.cloudinary.com/dlu80k3sn/image/upload/v1759872769/products/elljrct6murffzjuquws.jpg",
    ],
    colors: [
      {
        name: "white",
        available: true,
        _id: "68e58702e92cfa1ef8121244",
      },
      {
        name: "yellow",
        available: true,
        _id: "68e58702e92cfa1ef8121245",
      },
      {
        name: "blue",
        available: false,
        _id: "68e58702e92cfa1ef8121246",
      },
    ],
    sizes: ["s", "m", "l", "xl"],
    price: 300,
    discount: 20,
    category: "testing",
    stock: 20,
    description:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9. eyJpZCI6 IjY4ZTM3 NzY2MWRjYTA2MjlmODV jMDhhNSIsImlhdCI6 MTc1OTg3MjA3NC wiZX hwIjoxNzYyNDY0MDc 0fQ.dP47TZCu0EIOTWaJR4MTqmh_ 5e4GvfZ_W3Uk_4rL0Cc",
    postedby: "68e377661dca0629f85c08a5",
    averageRating: 0,
    numOfReviews: 0,
    _id: "68e58702e92cfa1ef8121243",
    reviews: [],
    createdAt: "2025-10-07T21:32:50.230Z",
    updatedAt: "2025-10-07T21:32:50.230Z",
    __v: 0,
    finalPrice: 240,
    inStock: true,
    id: "68e58702e92cfa1ef8121243",
  };

  const [selectedcolor, setSelectedcolor] = useState(item.colors[0]);
  const [selectedSize, setSelectedSize] = useState(0);
  const [addQuanitity, setAddQuanitity] = useState(0);

  return (
    item && (
      <div className="flex flex-col gap-5 mt-5">
        <h1 className="font-bold capitalize text-2xl mt-5 py-3 ">
          {item.name}
        </h1>
        <hr />
        <p className="text-gray-500 w-4/6 whitespace-pre-wrap break-all  h-auto p-1">
          {item.description}
        </p>
        <hr />

        {/* price  */}

        <div className="flex items-center gap-3">
          {item.price !== item.finalPrice && (
            <p className="text-gray-500 line-through text-md">
              ₦{item.price.toFixed(2)}
            </p>
          )}
          <p className="text-2xl font-semibold text-blue-600 p-1 cursor-pointer">
            ₦{item.finalPrice.toFixed(2)}
          </p>
        </div>

        {/* colors  */}

        <div>
          <h5 className="">Choose a color</h5>

          <div className="flex items-center mt-5 gap-5">
            {item.colors.map((color, i) => (
              <div
                key={color._id}
                onClick={() => setSelectedcolor(item.colors[i])}
                className={`relative flex items-center justify-center ${
                  selectedcolor._id === color._id
                    ? "border h-7 w-7 rounded-full ring-1 ring-blue-600"
                    : ""
                }`}
              >
                <button
                  disabled={!color.available}
                  style={{ backgroundColor: color.name }}
                  className={`relative w-4 h-4 border rounded-full flex items-center justify-center 
            ${
              !color.available
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer"
            }
          `}
                >
                  {!color.available && (
                    <span className="absolute w-[2px] h-7 bg-red-500 rotate-45"></span>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* size  */}
        <div className="">
          <h5 className="">choose a size</h5>

          <div className="flex items-center mt-5 gap-5 capitalize">
            {item.sizes.map((size, i) => (
              <Button
                className={`uppercase hover:bg-transparent cursor-pointer ${
                  selectedSize === i
                    ? "bg-blue-600 text-white hover:bg-blue-600 border-blue-600"
                    : "bg-transparent text-black  border"
                }  `}
                key={i}
                onClick={() => setSelectedSize(i)}
              >
                {size}
              </Button>
            ))}
          </div>
        </div>

        {/* count  */}
        <div className="">
          <h5 className="">choose a Quantity</h5>

          <div className="flex items-center mt-5 gap-5 capitalize w-full justify-between">
            <div className="flex items-center gap-5">
              <div className="flex items-center border w-max px-4 rounded-full  gap-10 justify-between py-1 bg-gray-200 text-lg ">
                <button
                  className="text-2xl font-semibold text-blue-600 p-1 cursor-pointer"
                  disabled={addQuanitity === 0}
                  onClick={() => setAddQuanitity(addQuanitity - 1)}
                >
                  -
                </button>
                <span>{addQuanitity}</span>
                <button
                  className="text-2xl font-semibold text-blue-600 p-1 cursor-pointer"
                  disabled={addQuanitity === item.stock}
                  onClick={() => setAddQuanitity(addQuanitity + 1)}
                >
                  +
                </button>
              </div>
              <div className="">
                {item.stock < 40 && (
                  <p className="text-gray-400 font-light ">
                    only{" "}
                    <span className="text-blue-600 ">{item.stock} items </span>
                    left in stock <br /> dont miss out
                  </p>
                )}
              </div>
            </div>

            <Button
              variant="outline"
              className="uppercase hover:bg-transparent hover:text-none bg-transparent shadow-none border-blue-500 text-blue-500 rounded-full px-7 py-5"
            >
              add to cart
            </Button>
          </div>
        </div>
      </div>
    )
  );
};

export default ProductDetails;

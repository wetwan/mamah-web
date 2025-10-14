"use client";

import React, { useState } from "react";

import Image from "next/image";

const ProductPageImage = ({ images }: { images: string[] }) => {

  const [index, setIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="h-[500px] w-full bg-gray-100 flex items-center justify-center">
        <p>No image available</p>
      </div>
    );
  }

  return (
    <div>
      <div className="h-[500px] w-full relative">
        <Image
          src={images[index]}
          alt="product-image1"
          fill
          sizes="50vw"
          className="object-cover rounded-md"
          priority
        />
      </div>
      {images.length > 1 && (
        <div className="flex mt-4 gap-2">
          {images.map((img, index) => (
            <div
              key={index}
              onClick={() => setIndex(index)}
              className="h-32 w-1/4 relative gap-4 mt-8 p-2 cursor-pointer border rounded-md"
            >
              <Image
                src={img}
                alt="product-image1"
                fill
                sizes="30vw"
                className="object-cover rounded-md w-full h-full"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductPageImage;

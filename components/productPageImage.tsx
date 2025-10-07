"use client";

import React, { useState } from "react";
import image1 from "@/public/image1.png";
import image2 from "@/public/image2.png";
import image3 from "@/public/image3.png";
import image4 from "@/public/mamah.png";
import Image from "next/image";

const ProductPageImage = () => {
  const images = [image1, image2, image3, image4];
  const [index, setIndex] = useState(0);
  return (
    <div>
      <div className="h-[500px] w-full relative">
        <Image
          src={images[index]}
          alt="product-image1"
          fill
          sizes="50vw"
          className="object-contain rounded-md"
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
                className="object-contain rounded-md w-full h-full"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductPageImage;

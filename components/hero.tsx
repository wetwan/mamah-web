"use client";
import React, { useState } from "react";
import image1 from "@/public/image1.png";
import image2 from "@/public/image2.png";
import image3 from "@/public/image3.png";
import Image from "next/image";
import { Button } from "./ui/button";

const Hero = () => {
  const banner = [
    {
      image: image1,
      text: "Finding Your Perfect Shoes",
      des: "we help you find the best for your legs ",
      link: "/shop",
    },
    {
      image: image2,
      text: "loving your dresss",
      des: "it our task to find that dress that makes you a princesss",
      link: "/shop",
    },
    {
      image: image3,
      text: "luxary bag is find you now",
      des: "in our shop your handbags is big for you, find it now",
      link: "/shop",
    },
  ];

  const [index, setIndex] = useState(0);

  return (
    <div className=" h-[calc(100vh-160px)] md:h-[calc(100vh-176px)] overflow-hidden">
      <div
        className="w-max h-full flex transition-all ease-in-out duration-1000 "
        style={{ transform: `translateX(-${index * 100}vw)` }}
      >
        {banner.map((b, i) => (
          <div
            key={i}
            className="w-screen h-full relative bg-neutral-600/10 flex flex-col md:flex-row "
          >
            <div className=" w-full h-1/2 md:h-full md:w-1/2 p-3 flex-col flex  items-center justify-center md:items-start px-10 lg:px-16">
              <h1 className="font-bold text-2xl my-5 text-center text-blue-800 capitalize md:text-4xl md:text-left lg:text-6xl">
                {b.text}
              </h1>
              <p className="font-light my-2 md:text-2xl lg:text-4xl">{b.des}</p>
              <Button
                variant="outline"
                className="my-4 py-6 px-10 hover:bg-blue-600 hover:text-white transition-all duration-300 ease-in shadow-none hover:shadow-2xs md:py-8 md:text-2xl capitalize md:px-16 lg:text-3xl lg:py-12 lg:px-20"
              >
                Shop now
              </Button>
            </div>

            <div className="w-full h-1/2 md:h-full md:w-1/2  flex items-center justify-center">
            <div className="">
                <Image
                src={b.image}
                alt="banner"
                width={500}
                height={500}
                priority
                className="object-cover w-full h-full"
              />
            </div>
            
            </div>
          </div>
        ))}
      </div>
      <div className="absolute m-auto left-1/2 -translate-x-1/2 bottom-8 gap-4 flex items-center">
        {banner.map((f, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full ring-1 ring-neutral-600 cursor-pointer  ${
              index === i ? "scale-150 flex flex-col items-center  justify-center" : ""
            }`}
            onClick={() => setIndex(i)}
          >
            {index === i && (
              <div className="w-[8px] h-[8px] rounded-full bg-neutral-800" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;

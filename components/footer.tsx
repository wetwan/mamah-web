"use client";

import React from "react";
import Logo from "./logo";
import { FacebookIcon, InstagramIcon, TwitterIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { useProduct } from "@/context/prodcutStore";

const Footer = () => {
  const products = useProduct((s) => s.items);

  const randomProduct =
    products.length > 0
      ? [...products].sort(() => Math.random() - 0.5)[0]
      : null;

  return (
    <footer className="max-sm:pb-20">
      <div className="px-10 md:px-8 lg:px-16 xl:32 2xl:px-64 mt-20 flex justify-between items-start flex-col lg:flex-row gap-10 ">
        <div className="">
          <h4 className="font-bold uppercase text-lg mb-5">about us</h4>
          <Logo />
        </div>
        <div className="">
          <h4 className="font-bold uppercase text-lg mb-5">Quick Links</h4>
          <ul className="max-sm:pl-3 ">
            <li className="py-2 font-medium ">
              <Link className="" href="/">
                Home
              </Link>
            </li>
            <li className="py-2 font-medium ">
              <Link className="" href="/shop">
                Shop
              </Link>
            </li>
            <li className="py-2 font-medium ">
              <Link className="" href="/about">
                About
              </Link>
            </li>
            <li className="py-2 font-medium ">
              <Link className="" href="/contact">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div className="">
          <h4 className="font-bold uppercase text-lg mb-5">Follow Us</h4>
          <ul className="max-sm:pl-3 flex flex-row items-center gap-5">
            <li className="py-2 font-medium ">
              <Link className="" href="/">
                <FacebookIcon />
              </Link>
            </li>
            <li className="py-2 font-medium ">
              <Link className="" href="/">
                <InstagramIcon />
              </Link>
            </li>
            <li className="py-2 font-medium ">
              <Link className="" href="/">
                <TwitterIcon />
              </Link>
            </li>
          </ul>
        </div>
        <div className="">
          <h4 className="font-bold uppercase text-lg mb-5">shop feacture</h4>

          {randomProduct && (
            <div className="flex lg:flex-col max-sm:items-center  justify-center gap-1.5 max-lg:pr-4">
              <div className="w-[100px] bg-slate-300 p-2 h-[100px]">
                <Image
                  src={randomProduct?.images[0]}
                  width={500}
                  height={500}
                  className="w-full h-full"
                  alt={randomProduct?.name}
                />
              </div>
              <p className="font-medium ">{randomProduct?.name}</p>
              <p className="font-bold text-black">
                ${randomProduct?.price.toFixed(2)}
              </p>
              <Button className="bg-black px-7 py-3 rounded-none shadow-none uppercase">
                add to cart
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="w-full bg-black h-[1px] my-10" />
      <p className="text-center text-black mt-6 ">
        &copy; {new Date().getFullYear()} UAM CLOSETS. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;

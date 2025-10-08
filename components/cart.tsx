/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import image1 from "@/public/image1.png";
import image2 from "@/public/image3.png";
import { ShoppingCart, X } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Cart = ({
  setOpenCart,
}: {
  setOpenCart: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  //   const cartProducts: any[] = [];
  const cartProducts = [
    {
      _id: "prod1",
      name: "Elegant Dress",
      images: [image1.src],
      price: 45,
      quantity: 5,
    },
    {
      _id: "prod2",
      name: "Sporty Sneakers",
      images: [image2.src],
      sizes: ["M", "L"],
      price: 60,
      quantity: 5,
    },
  ];

  const total = cartProducts.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);
  const router = useRouter();
  return (
    <div className="z-50 absolute md:right-6 md:top-28 shadow-2xl shadow-black/40  w-[350px] h-auto p-4 bg-gray-100 top-52 right-0 ">
      <h2 className="text-lg font-semibold mb-2">Shopping Cart</h2>

      {cartProducts.length === 0 && (
        <div className="py-20 flex flex-col items-center justify-center gap-4">
          <p className="font-bold text-red-300 text-xl uppercase">
            {" "}
            no item in you chat yet!{" "}
          </p>
          <Link
            href={"/shop"}
            className="bg-[#7971ea] text-white py-3 px-12 font-light capitalize "
          >
            vist shop
          </Link>
        </div>
      )}

      {cartProducts.length !== 0 && (
        <>
          <h3 className="uppercase font-semibold text-gray-400">
            you have {cartProducts.length} in your cart
          </h3>
          <div className="">
            {cartProducts.map((item) => (
              <div key={item._id} className="">
                <div className="flex items-start gap-4 my-4 relative">
                  <div className="h-[60px] w-[60px] bg-amber-200 p-2 rounded">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      height={500}
                      width={500}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="">
                    <p className="capitalize font-medium text-lg tracking-wide">
                      {item.name}
                    </p>
                    <p className="text-gray-600 font-medium">
                      {item.quantity} × ₦{item.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="justify-end mr-auto absolute top-0 right-3">
                    <X size={16} />
                  </div>
                </div>
                <hr />
              </div>
            ))}
          </div>
          <div className="flex w-full mt-4 items-center justify-between">
            <p className="font-medium text-lg">Subtotal:</p>
            <p className="font-bold text-lg">₦{total.toFixed(2)}</p>
          </div>
          <Button
            onClick={() => {
              router.push("/cart");
              setOpenCart(false);
            }}
            variant="outline"
            className="uppercase bg-transparent cursor-pointer font-bold border-black w-full mt-4 rounded-none py-7  hover:bg-neutral-600 hover:text-white transition-all duration-300"
          >
            view Cart
          </Button>
          <Button
            variant="default"
            className="uppercase cursor-pointer font-bold border-black w-full mt-4 rounded-none py-7 text-sm hover:bg-blue-600 hover:text-white transition-all duration-300"
          >
            <ShoppingCart className="font-black" size={20} /> checkout
          </Button>
        </>
      )}
    </div>
  );
};

export default Cart;

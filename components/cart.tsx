/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { ShoppingCart, X } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/cartStore";
import { useLocalPrice2 } from "@/src/hooks/useLocalPrice";

const Cart = ({
  setOpenCart,
  cartRef,
}: {
  setOpenCart: React.Dispatch<React.SetStateAction<boolean>>;
  cartRef: React.RefObject<null>;
}) => {
  const cartProducts = useCart((state) => state.item);
  const removeItem = useCart((state) => state.removeProduct);

  const total = cartProducts.reduce((sum, item) => {
    return sum + item.product.finalPrice * item.quantity;
  }, 0);

  const { data, isLoading } = useLocalPrice2(total);

  const router = useRouter();
  return (
    <div
      className="z-50 absolute md:right-6 md:top-28 shadow-2xl shadow-black/40  w-[350px] h-auto p-4 bg-gray-100 top-52 right-0 "
      ref={cartRef}
    >
      <div className="flex items-center mb-2  justify-between">
        <h2 className="text-lg font-semibold">Shopping Cart</h2>
        <X onClick={() => setOpenCart(false)} />
      </div>

      {cartProducts.length === 0 && (
        <div className="py-20 flex flex-col items-center justify-center gap-4">
          <p className="font-bold text-red-300 text-xl uppercase">
            {" "}
            no item in you cart yet!{" "}
          </p>
          <Link
            href={"/shop"}
            onClick={() => setOpenCart(false)}
            className="bg-[#7971ea] text-white py-3 px-12 font-light capitalize "
          >
            visit shop
          </Link>
        </div>
      )}

      {cartProducts.length !== 0 && (
        <>
          <h3 className="uppercase font-semibold text-gray-400">
            you have {cartProducts.length} in your cart
          </h3>
          <div className="">
            {cartProducts.map((item) => {
              // Safely extract color name
              const colorName =
                item?.selectedColor?.name ||
                (typeof item?.selectedColor === "string"
                  ? item.selectedColor
                  : "");

              return (
                <div key={item.id} className="">
                  <div className="flex items-start gap-4 my-4 relative">
                    <div className="h-[60px] w-[60px] bg-amber-200 p-2 rounded">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        height={500}
                        width={500}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex justify-between  w-full gap-4">
                      <div className="">
                        <p className="capitalize font-medium text-[15px] tracking-wide">
                          {item.product.name} {item.selectedSize?.name}{" "}
                          {colorName}
                        </p>
                        <p className="text-gray-600 font-medium flex items-center gap-1">
                          {item.quantity} <X size={12} />
                          {item.product.displayPrice?.formatted || "N/A"}
                        </p>
                      </div>
                      <div
                        className="hover:text-red-700 cursor-pointer"
                        onClick={() => removeItem(item.id)}
                      >
                        <X size={16} />
                      </div>
                    </div>
                  </div>
                  <hr />
                </div>
              );
            })}
          </div>
          <div className="flex w-full mt-4 items-center justify-between">
            <p className="font-medium text-lg">Subtotal:</p>
            {data && !isLoading && (
              <p className="font-medium text-lg">{data.formatted}</p>
            )}
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
            onClick={() => {
              router.push("/checkout");
              setOpenCart(false);
            }}
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

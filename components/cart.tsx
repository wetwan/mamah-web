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

  // 🛡️ Fix: Safely calculate total. If finalPrice is missing, treat as 0.
  const total = cartProducts.reduce((sum, item) => {
    const price = item.product?.finalPrice || 0;
    return sum + price * item.quantity;
  }, 0);

  // 🛡️ Fix: Add isLoading state destructuring to prevent UI flicker
  const { data, isLoading } = useLocalPrice2(total);

  const router = useRouter();

  return (
    <div
      className="z-50 absolute md:right-6 md:top-28 shadow-2xl shadow-black/40 w-[350px] h-auto p-4 bg-gray-100 top-52 right-0"
      ref={cartRef}
    >
      <div className="flex items-center mb-2 justify-between">
        <h2 className="text-lg font-semibold">Shopping Cart</h2>
        <X
          onClick={() => setOpenCart(false)}
          className="cursor-pointer hover:text-red-500 transition-colors"
        />
      </div>

      {cartProducts.length === 0 && (
        <div className="py-20 flex flex-col items-center justify-center gap-4">
          <p className="font-bold text-red-300 text-xl uppercase">
            no items in your cart yet!
          </p>
          <Link
            href={"/shop"}
            onClick={() => setOpenCart(false)}
            className="bg-[#7971ea] text-white py-3 px-12 font-light capitalize hover:bg-[#635ac8] transition-colors"
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
          <div className="max-h-[60vh] overflow-y-auto pr-2">
            {cartProducts.map((item) => {
              // Safely extract color name
              const colorName =
                item?.selectedColor?.name ||
                (typeof item?.selectedColor === "string"
                  ? item.selectedColor
                  : "");

              // 🛡️ Fix: Safe image access
              const imageSrc = item.product?.images?.[0];

              return (
                <div key={item.id}>
                  <div className="flex items-start gap-4 my-4 relative">
                    <div className="h-[60px] w-[60px] bg-amber-200 p-2 rounded flex-shrink-0">
                      {/* 🛡️ Fix: Only render img if src exists */}
                      {imageSrc ? (
                        <img
                          src={imageSrc}
                          alt={item.product?.name || "Product"}
                          height={500}
                          width={500}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-xs text-gray-500">
                          No Img
                        </div>
                      )}
                    </div>
                    <div className="flex justify-between w-full gap-4">
                      <div className="">
                        <p className="capitalize font-medium text-[15px] tracking-wide line-clamp-2">
                          {item.product?.name || "Unknown Product"}{" "}
                          <span className="text-gray-500 text-sm">
                            {item.selectedSize?.name} {colorName}
                          </span>
                        </p>
                        <p className="text-gray-600 font-medium flex items-center gap-1 mt-1">
                          {item.quantity} <X size={12} />
                          {/* 🛡️ Fix: Safe displayPrice access with fallback */}
                          {item.product?.displayPrice?.formatted || "N/A"}
                        </p>
                      </div>
                      <button
                        className="hover:text-red-700 cursor-pointer transition-colors p-1"
                        onClick={() => removeItem(item.id)}
                        aria-label="Remove item"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  </div>
                  <hr />
                </div>
              );
            })}
          </div>
          
          <div className="flex w-full mt-4 items-center justify-between border-t pt-4">
            <p className="font-medium text-lg">Subtotal:</p>
            {/* 🛡️ Fix: Show loading state properly */}
            {isLoading ? (
              <p className="font-medium text-lg text-gray-400 animate-pulse">
                Calculating...
              </p>
            ) : (
              <p className="font-medium text-lg">
                {data?.formatted || "N/A"}
              </p>
            )}
          </div>

          <Button
            onClick={() => {
              router.push("/cart");
              setOpenCart(false);
            }}
            variant="outline"
            className="uppercase bg-transparent cursor-pointer font-bold border-black w-full mt-4 rounded-none py-7 hover:bg-neutral-800 hover:text-white transition-all duration-300"
          >
            View Cart
          </Button>
          <Button
            onClick={() => {
              router.push("/checkout");
              setOpenCart(false);
            }}
            variant="default"
            className="uppercase cursor-pointer font-bold border-black w-full mt-4 rounded-none py-7 text-sm hover:bg-blue-700 hover:text-white transition-all duration-300"
          >
            <ShoppingCart className="font-black mr-2" size={20} /> Checkout
          </Button>
        </>
      )}
    </div>
  );
};

export default Cart;
"use client";

import Link from "next/link";
import React, { useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/cartStore";

const CartPage = () => {
  const cartProducts = useCart((state) => state.item);

  const subtotal = useMemo(() => {
    return cartProducts.reduce(
      (acc, item) => acc + item.product.finalPrice * item.quantity,
      0
    );
  }, [cartProducts]);

  const delivery = 10;
  const total = subtotal + delivery;

  const router = useRouter();

  return (
    <div className="min-h-screen">
      <div className="w-full py-6 bg-[#f8f9fa] px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 flex items-center gap-2 capitalize font-medium">
        <Link href="/" className="text-[#7971ea]  ">
          Home
        </Link>
        <span>/</span>
        <p>Cart</p>
      </div>

      <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <section className="mt-20">
          <div className="grid max-sm:grid-cols-5 grid-cols-6 font-semibold capitalize text-gray-700 border-b pb-2">
            <p>Item</p>
            <p className="max-sm:hidden"> Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
          </div>

          {cartProducts.map((item) => (
            <div
              key={item.product._id}
              className="grid max-sm:grid-cols-5 grid-cols-6  md:gap-0 gap-4 items-center border-b py-4 text-gray-700 relative"
            >
              <Image
                src={item.product.images[0]}
                alt={item.product.name}
                width={64}
                height={64}
                className="w-16 h-16 object-cover rounded-md"
              />
              <p className="capitalize max-sm:hidden">{item.product.name}</p>
              <p>₦{item.product.finalPrice.toFixed(2)}</p>
              <p>{item.quantity}</p>
              <p>₦{(item.product.finalPrice * item.quantity).toFixed(2)}</p>
              <button
                onClick={() => {}}
                className="text-red-500 hover:text-red-700 text-lg font-semibold"
              >
                ×
              </button>
            </div>
          ))}

          {/* Bottom Section */}
          <div className="mt-10 flex flex-col md:flex-row justify-between gap-10 w-full">
            {/* Promo Code */}
            <div className="flex-1">
              <p className="text-[#555] mb-2">
                If you have a promo code, enter it here
              </p>
              <div className="flex bg-[#ebebeb] rounded overflow-hidden">
                <input
                  type="text"
                  placeholder="Promo code"
                  className="flex-1 bg-transparent outline-none pl-3 py-2 placeholder:text-gray-500"
                />
                <button className="bg-[#7971ea] text-white px-5 py-2 hover:bg-[#7971ea]">
                  Apply
                </button>
              </div>
            </div>

            {/* Totals */}
            <div className="flex-1 bg-white border rounded-lg shadow-md p-5">
              <h2 className="capitalize text-xl font-semibold mb-4">
                Cart Totals
              </h2>
              <div className="flex justify-between py-2 border-b">
                <p>Subtotal</p>
                <p>₦{subtotal.toFixed(2)}</p>
              </div>
              <div className="flex justify-between py-2 border-b">
                <p>Delivery</p>
                <p>₦{delivery.toFixed(2)}</p>
              </div>
              <div className="flex justify-between py-2 font-semibold text-lg">
                <p>Total</p>
                <p>₦{total.toFixed(2)}</p>
              </div>
              <button
                className="w-full bg-[#7971ea] text-white py-3 mt-4 rounded hover:bg-[#7971ea] uppercase tracking-wide"
                onClick={() => {
                  alert("Proceeding to checkout...");
                  router.push("/checkout");
                }}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CartPage;

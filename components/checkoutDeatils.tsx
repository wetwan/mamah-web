"use client";
import React, { useMemo, useState } from "react";
import image1 from "@/public/image1.png";
import image2 from "@/public/image3.png";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const CheckoutDeatils = () => {
  const router = useRouter();
  const cartProducts = useMemo(
    () => [
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
        price: 60,
        quantity: 2,
      },
    ],
    []
  );

  const subtotal = useMemo(() => {
    return cartProducts.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  }, [cartProducts]);

  const delivery = 10;
  const total = subtotal + delivery;

  const [option, setOption] = useState("cash");
  return (
    <div className="w-full">
      {/* coupon code  */}
      <h2 className="my-3 capitalize font-medium text-2xl"> coupon code </h2>

      {/* product info  */}

      <div className="border px-3 py-5 md:px-6">
        <p className="font-light text-black">
          Enter your coupon code if you have one
        </p>

        <div className="flex justify-center items-center w-[80%] border mt-6 h-[55px] rounded focus-within:border-[#7971ea] transition-all duration-300 ease-in focus-within:rounded">
          <input
            type="text"
            placeholder="coupon code"
            className="placeholder:capitalize border w-[70%] h-full px-3 py-4 outline-none focus-within:border-[#7971ea] transition-all duration-300 ease-in focus-within:rounded focus-within:rounded-r-none"
            required
          />
          <button className="capitalize border w-[35%] h-full   outline-none border-[#7971ea] bg-[#7971ea] text-white transition-all duration-300 ease-in">
            check coupon
          </button>
        </div>
      </div>
      <h2 className="my-3 mt-7 capitalize font-medium text-2xl">Your Order</h2>
      <div className="border px-3 py-5 md:px-12">
        <div className="capitalize ">
          <div className="flex items-start justify-between mb-4 text-center">
            <p className="font-bold">Products</p>
            <p className="font-bold">total</p>
          </div>
          <div className="flex flex-col  justify-between  mt-3 pb-3">
            {cartProducts.map((item) => (
              <div
                className="border-b mb-3 pb-2 flex justify-between"
                key={item._id}
              >
                <div className="">
                  <p>
                    {item.name} {"  "} x {"  "}
                    {item.quantity}
                  </p>
                </div>
                <div className="">
                  ₦{(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between border-b mb-3 pb-2 ">
            <p className="font-semibold">Cart Subtotal</p>
            <p className="">₦{subtotal.toFixed(2)}</p>
          </div>
          <div className="flex items-center justify-between mt-3 pb-3">
            <p className="font-semibold">order total </p>
            <p className="font-semibold">₦{total.toFixed(2)}</p>
          </div>
        </div>
        {/* payment method */}
        <div className="mt-7">
          <div
            className={` border mb-4 text-[#7971ea] w-full capitalize py-3 px-2 ${
              option === "cash" ? "bg-[#7971ea] text-white" : ""
            }`}
            onClick={() => setOption("cash")}
          >
            {" "}
            payemnt on delivery
          </div>
          <div
            className={` border mb-4 text-[#7971ea] w-full capitalize py-3 px-2 ${
              option === "card" ? "bg-[#7971ea] text-white" : ""
            }`}
            onClick={() => setOption("card")}
          >
            {" "}
            card
          </div>
        </div>
        <Button
          variant={option === "" ? "outline" : "default"}
          disabled={option === ""}
          className=" border mb-4 bg-[#7971ea] w-full font-light py-7 text-xl mt-5 px-2 text-white hover:bg-[#7971ea] uppercase"
          onClick={() => router.push("/success")}
        >
          {" "}
          place order
        </Button>
      </div>
    </div>
  );
};

export default CheckoutDeatils;

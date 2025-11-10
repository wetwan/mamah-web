"use client";

import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import { useRouter } from "next/navigation";
import { CartItem, useCart } from "@/context/cartStore";
import { CheckoutForm } from "./stripe";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

console.log(
  "Stripe Public Key loaded:",
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

type Prop = {
  option: "cash_on_delivery" | "card";
  cartProducts: CartItem[];
  setOption: React.Dispatch<React.SetStateAction<"cash_on_delivery" | "card">>;
  subtotal: number;
  delivery?: 10;
  total: number;
  showCardPayment: boolean;
  orderId: string | null;
  clientSecret: string | null;
  setClientSecret: React.Dispatch<React.SetStateAction<string | null>>;
};

const CheckoutDetails = ({
  option,
  cartProducts,
  setOption,
  subtotal,
  showCardPayment,
  total,
  clientSecret,
  orderId,
  delivery = 10,
}: Prop) => {
  const { resetCart } = useCart();
  // const { token } = useAuth();

  const router = useRouter();

  const appearance = {
    theme: "stripe" as const,
    variables: {
      colorPrimary: "#7971ea",
      colorBackground: "#ffffff",
      colorText: "#30313d",
    },
  };

  return (
    <div className="w-full">
      {/* Coupon Section */}
      <h2 className="my-3 capitalize font-medium text-2xl">coupon code</h2>
      <div className="border px-3 py-5 md:px-6">
        <p className="font-light text-black">
          Enter your coupon code if you have one
        </p>
        <div className="flex justify-center items-center w-[80%] border mt-6 h-[55px] rounded">
          <input
            type="text"
            placeholder="coupon code"
            className="placeholder:capitalize border w-[70%] h-full px-3 py-4 outline-none"
          />
          <button className="capitalize border w-[35%] h-full border-[#7971ea] bg-[#7971ea] text-white">
            check coupon
          </button>
        </div>
      </div>

      {/* Order Summary */}
      <h2 className="my-3 mt-7 capitalize font-medium text-2xl">Your Order</h2>
      <div className="border px-3 py-5 md:px-12">
        <div className="capitalize">
          <div className="flex items-start justify-between mb-4">
            <p className="font-bold">Products</p>
            <p className="font-bold">Total</p>
          </div>

          {cartProducts.map((item) => (
            <div
              className="border-b mb-3 pb-2 flex justify-between"
              key={item.id}
            >
              <p>
                {item.product.name} * {item.quantity}
              </p>
              <p>₦{(item.product.finalPrice * item.quantity).toFixed(2)}</p>
            </div>
          ))}

          <div className="flex justify-between border-b mb-3 pb-2">
            <p className="font-semibold">Cart Subtotal</p>
            <p>₦{subtotal.toFixed(2)}</p>
          </div>
          <div className="flex justify-between border-b mb-3 pb-2">
            <p className="font-semibold">Cart Subtotal</p>
            <p>₦{delivery.toFixed(2)}</p>
          </div>

          <div className="flex justify-between mt-3 pb-3">
            <p className="font-semibold">Order Total</p>
            <p className="font-semibold">₦{total.toFixed(2)}</p>
          </div>
        </div>

        {/* Payment Options */}
        <div className="mt-7">
          <div
            className={`border mb-4 text-[#7971ea] w-full capitalize py-3 px-2 cursor-pointer ${
              option === "cash_on_delivery" ? "bg-[#7971ea] text-white" : ""
            }`}
            onClick={() => setOption("cash_on_delivery")}
          >
            Payment on Delivery
          </div>

          <div
            className={`border mb-4 text-[#7971ea] w-full capitalize py-3 px-2 cursor-pointer ${
              option === "card" ? "bg-[#7971ea] text-white" : ""
            }`}
            onClick={() => setOption("card")}
          >
            Pay with Card
          </div>

          {option === "card" && showCardPayment && clientSecret && (
            <div className="border p-3 rounded">
              {!clientSecret.startsWith("pi_") &&
              !clientSecret.startsWith("seti_") ? (
                <div className="text-center py-4 text-red-500">
                  Invalid payment configuration. Please refresh and try again.
                </div>
              ) : (
                <Elements
                  stripe={stripePromise}
                  options={{ clientSecret, appearance, loader: "auto" }}
                >
                  <CheckoutForm
                    onPaymentSuccess={() => {
                      resetCart();
                      router.push("/success");
                    }}
                    orderId={orderId}
                    clientSecret={clientSecret}
                  />
                </Elements>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutDetails;

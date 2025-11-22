"use client";

import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";
import { useCart, CartItem } from "@/context/cartStore";
import { CheckoutForm } from "./stripe";
import { useLocalPrice2 } from "@/src/hooks/useLocalPrice";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

type Props = {
  option: "cash_on_delivery" | "card";
  setOption: React.Dispatch<React.SetStateAction<"cash_on_delivery" | "card">>;
  cartProducts: CartItem[];
  subtotal: number;
  delivery: number;
  total: number;
  showCardPayment: boolean;
  clientSecret: string | null;
  orderId: string | null;
};

const CheckoutDetails = ({
  option,
  setOption,
  cartProducts,
  subtotal,
  delivery,
  total,
  showCardPayment,
  clientSecret,
  orderId,
}: Props) => {
  const { resetCart } = useCart();
  const router = useRouter();

  // 🛡️ Fix: Destructure isLoading to handle UI states gracefully
  const { data, isLoading } = useLocalPrice2(total);
  const { data: data2, isLoading: isLoading2 } = useLocalPrice2(subtotal);
  const { data: data3, isLoading: isLoading3 } = useLocalPrice2(delivery);

  return (
    <div className="w-full">
      {/* Coupon Section */}
      <h2 className="my-3 capitalize font-medium text-2xl">coupon code</h2>
      <div className="border px-3 py-5 md:px-6">
        <p className="font-light text-black">
          Enter your coupon code if you have one
        </p>
        <div className="flex justify-center items-center  border mt-6 h-[55px] rounded">
          <input
            type="text"
            placeholder="coupon code"
            className="placeholder:capitalize border w-[80%] h-full px-2  outline-none"
          />
          <button className="capitalize border sm:w-[40%] w-[50%] h-full border-[#7971ea] bg-[#7971ea] text-white">
            check coupon
          </button>
        </div>
      </div>

      {/* Order Summary */}
      <h2 className="my-3 mt-7 font-medium text-2xl">Your Order</h2>
      <div className="border px-3 py-5 md:px-12">
        <div>
          <div className="flex justify-between mb-3 font-bold">
            <p>Products</p>
            <p>Total</p>
          </div>

          {cartProducts.map((item) => {
             // 🛡️ Fix: Safely extract price data for this item
             const priceData = item.product.displayPrice;
             const unitPrice = priceData?.originalFinalPrice || 0;
             const symbol = priceData?.symbol || ""; 
             // Calculate line total safely
             const lineTotal = (item.quantity * unitPrice).toFixed(2);

             return (
              <div
                className="border-b mb-3 pb-2 flex justify-between"
                key={item.id}
              >
                <p>
                  {item.product.name} × {item.quantity}
                </p>
                <p>
                  
                  {symbol}
                  {lineTotal}
                </p>
              </div>
            );
          })}

          <div className="flex justify-between border-b mb-3 pb-2">
            <p className="font-semibold">Subtotal</p>
             
            <p>
              {isLoading2 
                ? "Calculating..." 
                : data2?.formatted || subtotal.toFixed(2)}
            </p>
          </div>

          <div className="flex justify-between border-b mb-3 pb-2">
            <p className="font-semibold">Delivery</p>
            <p>
              {isLoading3 
                ? "Calculating..." 
                : data3?.formatted || delivery.toFixed(2)}
            </p>
          </div>

          <div className="flex justify-between mt-3 pb-3 font-semibold">
            <p>Total</p>
            <p>
              {isLoading 
                ? "Calculating..." 
                : data?.formatted || total.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Payment Options */}
        <div className="mt-7">
          <button
            type="button"
            className={`border mb-4 w-full py-3 px-2 capitalize transition ${
              option === "cash_on_delivery"
                ? "bg-[#7971ea] text-white"
                : "text-[#7971ea]"
            }`}
            onClick={() => setOption("cash_on_delivery")}
            disabled={showCardPayment}
          >
            Pay on Delivery
          </button>

          <button
            type="button"
            className={`border mb-4 w-full py-3 px-2 capitalize transition ${
              option === "card" ? "bg-[#7971ea] text-white" : "text-[#7971ea]"
            }`}
            onClick={() => setOption("card")}
            disabled={showCardPayment}
          >
            Pay with Card
          </button>

          {/* Only show Stripe form when card is selected, payment initialized, and we have clientSecret */}
          {option === "card" && clientSecret && (
            <div className="border p-4 rounded bg-gray-50">
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <CheckoutForm
                  orderId={orderId}
                  onPaymentSuccess={() => {
                    resetCart();
                    router.push("/success");
                  }}
                />
              </Elements>
            </div>
          )}
          <div />
        </div>
      </div>
    </div>
  );
};

export default CheckoutDetails;
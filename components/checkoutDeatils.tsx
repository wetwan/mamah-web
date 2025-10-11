"use client";

import React, { useMemo, useState } from "react";
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
import { Button } from "./ui/button";
import { redirect, useRouter } from "next/navigation";
import { useCart } from "@/context/cartStore";

// import { CheckoutForm } from "./stripe"; // must handle stripe.confirmPayment inside

// const stripePromise = loadStripe(
//   process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
// );

const CheckoutDetails = () => {
  const router = useRouter();
  const cartProducts = useCart((state) => state.item);
  const resetCart = useCart((state) => state.resetCart);
  const [option, setOption] = useState<"cash" | "card" | "">("");
  // const [clientSecret, setClientSecret] = useState<string>("");

  // 🧮 Calculate totals
  const subtotal = useMemo(
    () =>
      cartProducts.reduce(
        (acc, item) => acc + item.product.finalPrice * item.quantity,
        0
      ),
    [cartProducts]
  );
  const delivery = 10;
  const total = subtotal + delivery;

  if (cartProducts.length === 0) {
    // router.back();
    redirect("/shop");
  }

  // ⚙️ Create Stripe payment intent when user selects "card"
  // useEffect(() => {
  //   const createPaymentIntent = async () => {
  //     if (option === "card") {
  //       try {
  //         const token = localStorage.getItem("token");
  //         const res = await axios.post(
  //           `${process.env.NEXT_PUBLIC_API_URL}stripe/create-payment`,
  //           { amount: total * 100 }, // in kobo (cents)
  //           {
  //             headers: {
  //               "Content-Type": "application/json",
  //               token,
  //             },
  //           }
  //         );
  //         if (res.data.clientSecret) setClientSecret(res.data.clientSecret);
  //       } catch (err) {
  //         console.error("❌ Error creating payment intent:", err);
  //       }
  //     }
  //   };

  //   createPaymentIntent();
  // }, [option, total]);

  // Stripe UI styles
  // const appearance = {
  //   theme: "stripe" as const,
  //   variables: {
  //     colorPrimary: "#7971ea",
  //     colorBackground: "#ffffff",
  //     colorText: "#30313d",
  //   },
  // };

  // const options = { clientSecret, appearance };

  const handlePlaceOrder = async () => {
    // if (option === "cash") {
    //   // ✅ Cash on Delivery flow
    // } else if (option === "card") {
    //   // ✅ Card Payment flow handled inside CheckoutForm
    //   alert("Please complete card payment first.");
    // }
    try {
      resetCart();
      router.push("/success");
    } catch (error) {
      console.log(error);
    }
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
              key={item.product._id}
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

          <div className="flex justify-between mt-3 pb-3">
            <p className="font-semibold">Order Total</p>
            <p className="font-semibold">₦{total.toFixed(2)}</p>
          </div>
        </div>

        {/* Payment Options */}
        <div className="mt-7">
          <div
            className={`border mb-4 text-[#7971ea] w-full capitalize py-3 px-2 cursor-pointer ${
              option === "cash" ? "bg-[#7971ea] text-white" : ""
            }`}
            onClick={() => setOption("cash")}
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
          {/* 
          {option === "card" && clientSecret && (
            <div className="border p-3 rounded">
              <Elements options={options} stripe={stripePromise}>
                <CheckoutForm
                  onPaymentSuccess={() => {
                    resetCart();
                    router.push("/success");
                  }}
                />
              </Elements>
            </div>
          )} */}
        </div>

        <Button
          disabled={!option}
          className="border mb-4 bg-[#7971ea] w-full font-light py-7 text-xl mt-5 text-white uppercase"
          onClick={handlePlaceOrder}
        >
          {option === "cash" ? "Place Order" : "Pay Now"}
        </Button>
      </div>
    </div>
  );
};

export default CheckoutDetails;

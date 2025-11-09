/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Returing from "./returing";
import { Checkbox } from "./ui/checkbox";
import CheckoutDeatils from "@/components/checkoutDeatils";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  OrderShippingData,
  PaymentMethodType,
  shippingData,
} from "@/src/api/auth/schema";

import { useCart } from "@/context/cartStore";
import { createOrder } from "@/src/api/product/route";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "@/context/userStore";
import { Order } from "@/src/api/product/schema";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { toast } from "react-toastify";

const Checkout = () => {
  const {
    register,
    handleSubmit,

    formState: {},
  } = useForm<OrderShippingData>();

  const isLoggedIn = useAuth((s) => !!s.token);
  const [newUser, setNewUser] = useState(false);
  const { resetCart, item: cartProducts } = useCart();
  const token = useAuth((s) => s.token);
  const router = useRouter();
  const [showCardPayment, setShowCardPayment] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [option, setOption] = useState<PaymentMethodType>("cash_on_delivery");
  const [serverError, setServerError] = useState("");
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const subtotal = useMemo(
    () =>
      Array.isArray(cartProducts)
        ? cartProducts.reduce(
            (acc, item) => acc + item.product.finalPrice * item.quantity,
            0
          )
        : 0,
    [cartProducts]
  );

  const delivery = 10;
  const total = subtotal + delivery;

  const { mutate: handleCheckoutOrder, isPending } = useMutation({
    mutationFn: async ({ order, token }: { order: Order; token: string }) => {
      console.log("📦 Calling createOrder...");
      return await createOrder(order, token);
    },

    onError: (error: any) => {
      if (axios.isAxiosError(error)) {
        setServerError(
          error.response?.data?.message || "Order creation failed"
        );
      } else {
        setServerError("An unexpected error occurred");
      }
    },
    onSuccess: (data) => {
      const newOrderId = data?.order?._id;
      setOrderId(newOrderId);
      if (option === "cash_on_delivery") {
        console.log("Order success:", data);
        resetCart();
        toast.success("Order placed successfully!");
        router.push("/success");
        return;
      }
      if (option === "card" && newOrderId) {
        // 🚩 CRITICAL FIX: Trigger secret fetching immediately after order is created
        console.log(
          "⏳ 4. Attempting to create Payment Intent with Order ID:",
          newOrderId
        );
        createPaymentIntent(newOrderId);
        // NOTE: You must remove the line setShowCardPayment(true); from here
      }
    },
  });

  // useEffect(() => {
  //   const createPaymentIntent = async () => {
  //     if (option !== "card" || !orderId) return;
  //     try {
  //       const res = await axios.post(
  //         `${process.env.NEXT_PUBLIC_API_URL}stripe/create-payment`,
  //         { orderId },
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       );

  //       if (res.data.clientSecret) {
  //         setClientSecret(res.data.clientSecret); // ✅ This must be running!

  //         // Add a log here to confirm the value is received
  //         console.log("Stripe Client Secret received:", res.data.clientSecret);
  //       }
  //     } catch (err) {
  //       console.error("❌ Error creating payment intent:", err);
  //       toast.error(
  //         "There was an error initializing the payment. Please try again."
  //       );
  //     }
  //   };

  //   createPaymentIntent();
  // }, [option, orderId, token]);

  // In checkout.tsx

  const createPaymentIntent = useCallback(
    async (newOrderId: string) => {
      if (!newOrderId) return;

      // 💡 FIX 1: Check for the token from the useAuth hook
      if (!token) {
        toast.error("Authentication token is missing. Please log in again.");
        return;
      }

      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}stripe/create-payment`,
          { orderId: newOrderId },
          {
            headers: {
              // 💡 FIX 2: Use the token from the useAuth hook
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (res.data.clientSecret) {
          setClientSecret(res.data.clientSecret);
          setShowCardPayment(true);
          console.log(
            "✅ 5. Stripe Client Secret received:",
            res.data.clientSecret
          );
        } else {
          console.error(
            "❌ 5. Stripe API response did not contain clientSecret. Full response data:",
            res.data
          );
          toast.error(
            "Invalid response from payment server. Please try again."
          );
          setShowCardPayment(false);
        }
      } catch (err: any) {
        // Added 'any' type to access err.response
        console.error("❌ Error creating payment intent:", err);

        // Log the specific 401 error message from the backend
        if (err.response?.status === 401) {
          toast.error("Authorization failed. Please log in again.");
        } else {
          toast.error(
            "There was an error initializing the payment. Please check your card option."
          );
        }
        setShowCardPayment(false);
      }
    },
    [token] // 💡 FIX 3: Add token to the dependency array
  );

  useEffect(() => {
    // If the user switches away from 'card', reset the secret and hide the form
    if (option !== "card") {
      setClientSecret(null);
      setShowCardPayment(false);
      setOrderId(null); // Also clear the temporary orderId
    }
  }, [option]);

  const onSubmit: SubmitHandler<shippingData> = useCallback(
    (data) => {
      console.log("✅ 1. onSubmit started.");
      setServerError("");
      // Clear previous errors
      if (cartProducts.length === 0) {
        setServerError(
          "Your cart is empty. Please add items before placing an order."
        );
        return;
      }
      const fullName = `${data.firstName} ${data.lastName}`;

      const orderData: Order = {
        items: cartProducts.map((item) => ({
          product: item.product._id,
          quantity: item.quantity,
          color: item.selectedColor?.name || undefined,
          size: item.selectedSize || undefined,
        })),
        shippingAddress: {
          ...data,
          fullName,
        },
        paymentMethod: option as PaymentMethodType,
        shippingPrice: delivery,
        taxPrice: 0,
      };
      if (!token) {
        alert("You must be logged in.");
        return;
      }
      console.log("⏳ 2. Calling handleCheckoutOrder...");

      handleCheckoutOrder({ order: orderData, token });
      if (!token) {
        alert("You must be logged in.");
        return;
      }
    },
    [cartProducts, option, token, delivery, handleCheckoutOrder] // Add dependencies here
  );

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <Returing />
      {serverError && (
        <p className="text-red-500 text-center mt-2">{serverError}</p>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex mt-10 flex-col lg:flex-row gap-12 lg:gap-20">
          <div className="lg:w-1/2 w-full ">
            {/* <Billing form={form} /> */}
            <div className="w-full">
              <h2 className="my-3 capitalize font-medium text-2xl">
                {" "}
                Billing details
              </h2>
              <div className="border px-3 py-5 md:px-6">
                <div className="capitalize flex flex-col gap-4 font-light text-black">
                  <div className="w-full mb-4">
                    <label htmlFor="">country</label>
                    <input
                      type="text"
                      id="country"
                      className="placeholder:capitalize border w-full px-3 py-4 mt-3 outline-none focus-within:border-[#7971ea] focus-within:rounded  transition-all duration-300 ease-in rounded"
                      required
                      aria-label="country"
                      placeholder="enter your country"
                      {...register("country")}
                    />
                  </div>
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full mb-4">
                      <label htmlFor="firstname">first name</label>
                      <input
                        type="text"
                        {...register("firstName")}
                        id="firstname"
                        className="placeholder:capitalize border w-full px-3 py-4 mt-3 outline-none focus-within:border-[#7971ea] focus-within:rounded  transition-all duration-300 ease-in rounded"
                        required
                        aria-label="firstname"
                        placeholder="enter your firstname"
                      />
                    </div>
                    <div className="w-full mb-4">
                      <label htmlFor="lastname">last name</label>
                      <input
                        type="text"
                        {...register("lastName")}
                        id="lastname"
                        className="placeholder:capitalize border w-full px-3 py-4 mt-3 outline-none focus-within:border-[#7971ea] focus-within:rounded  transition-all duration-300 ease-in rounded"
                        required
                        aria-label="lastname"
                        placeholder="enter your lastname"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="w-full mb-4">
                      <label htmlFor="address">address</label>
                      <input
                        type="text"
                        {...register("address1")}
                        id="address"
                        className="placeholder:capitalize border w-full px-3 py-4 mt-3 outline-none focus-within:border-[#7971ea] focus-within:rounded  transition-all duration-300 ease-in rounded"
                        required
                        aria-label="address"
                        placeholder="street address"
                      />

                      <input
                        type="text"
                        {...register("address2")}
                        id="address2"
                        className="placeholder:capitalize border w-full px-3 py-4 mt-3 outline-none focus-within:border-[#7971ea] focus-within:rounded  transition-all duration-300 ease-in rounded"
                        aria-label="address2"
                        placeholder="enter your apartment, suite, unit etc. (optional)"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full mb-4">
                      <label htmlFor="state">state</label>
                      <input
                        type="text"
                        {...register("state")}
                        id="state"
                        className="placeholder:capitalize border w-full px-3 py-4 mt-3 outline-none focus-within:border-[#7971ea] focus-within:rounded  transition-all duration-300 ease-in rounded"
                        required
                        aria-label="state"
                        placeholder="enter your state"
                      />
                    </div>
                    <div className="w-full mb-4">
                      <label htmlFor="poster/zip">poster / zip</label>
                      <input
                        type="text"
                        {...register("poster")}
                        id="poster/zip"
                        className="placeholder:capitalize border w-full px-3 py-4 mt-3 outline-none focus-within:border-[#7971ea] focus-within:rounded  transition-all duration-300 ease-in rounded"
                        aria-label="poster/zip"
                        placeholder="enter your poster / zip"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full mb-4">
                      <label htmlFor="email">email address</label>
                      <input
                        type="email"
                        {...register("email")}
                        id="email"
                        className="placeholder:capitalize border w-full px-3 py-4 mt-3 outline-none focus-within:border-[#7971ea] focus-within:rounded  transition-all duration-300 ease-in rounded"
                        required
                        aria-label="email"
                        placeholder="enter your email"
                      />
                    </div>
                    <div className="w-full mb-4">
                      <label htmlFor="phone">phone</label>
                      <input
                        type="text"
                        {...register("phone")}
                        id="phone"
                        className="placeholder:capitalize border w-full px-3 py-4 mt-3 outline-none focus-within:border-[#7971ea] focus-within:rounded  transition-all duration-300 ease-in rounded"
                        required
                        aria-label="phone"
                        placeholder="enter your phone"
                      />
                    </div>
                  </div>
                </div>
                {!isLoggedIn && (
                  <div className="mt-5">
                    <div className="flex items-center gap-3">
                      <Checkbox onClick={() => setNewUser(!newUser)} />{" "}
                      <p className="font-light">Create an account?</p>
                    </div>
                    {newUser && (
                      <div className="">
                        <p className="leading-relaxed text-sm my-3 text-gray-500">
                          Create an account by entering the information below.
                          If you are a returning customer please login at the
                          top of the page.
                        </p>
                        <div
                          className={`${
                            newUser ? "block" : "hidden"
                          } w-full mb-4 capitalize`}
                        >
                          <label htmlFor="password">password</label>
                          <input
                            type="password"
                            name="password"
                            id="password"
                            className="placeholder:capitalize border w-full px-3 py-4 mt-3 outline-none focus-within:border-[#7971ea] focus-within:rounded  transition-all duration-300 ease-in rounded"
                            aria-label="password"
                            placeholder="enter your password"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 w-full ">
            <CheckoutDeatils
              option={option}
              cartProducts={cartProducts}
              setOption={setOption}
              subtotal={subtotal}
              delivery={delivery}
              total={total}
              showCardPayment={showCardPayment}
              orderId={orderId}
              clientSecret={clientSecret}
              setClientSecret={setClientSecret}
            />
            <Button
              type="submit"
              disabled={isPending || cartProducts.length === 0}
              className="border mb-4 bg-[#7971ea] w-full font-light py-7 text-xl mt-5 text-white uppercase"
            >
              {isPending ? "Processing..." : "Place Order"}
            </Button>
          </div>{" "}
        </div>
      </form>
    </div>
  );
};

export default Checkout;

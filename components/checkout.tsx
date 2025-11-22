/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Returing from "./returing";
import CheckoutDetails from "./checkoutDeatils";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

import { useCart } from "@/context/cartStore";
import { useAuth } from "@/context/userStore";
import { createOrder } from "@/src/api/product/route";
import { Order } from "@/src/api/product/schema";
import {
  shippingData,
  PaymentMethodType,
  shippingSchema,
} from "@/src/api/auth/schema";
import { Button } from "./ui/button";
import { zodResolver } from "@hookform/resolvers/zod";

const Checkout: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,

    formState: { errors },
  } = useForm<shippingData>({
    resolver: zodResolver(shippingSchema),
  });
  const { token, user } = useAuth();
  const router = useRouter();

  const { resetCart, item: cartProducts } = useCart();

  const [option, setOption] = useState<PaymentMethodType>("cash_on_delivery");
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [showCardPayment, setShowCardPayment] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [serverError, setServerError] = useState("");

  const delivery = 10;

  const subtotal = useMemo(
    () =>
      cartProducts.reduce((acc, item) => {

        const ngnPrice = item.product.displayPrice?.originalFinalPrice;
        return acc + ngnPrice * item.quantity;
      }, 0),
    [cartProducts]
  );
  const total = subtotal + delivery;

  const { mutate: handleCheckoutOrder, isPending } = useMutation({
    mutationFn: async ({ order, token }: { order: Order; token: string }) => {
      return await createOrder(order, token);
    },

    onError: (error: any) => {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message || "Order creation failed";
        toast.error(message);
        setServerError(message);
      } else {
        setServerError("An unexpected error occurred");
        toast.error("An unexpected error occurred");
      }
    },

    onSuccess: async (data) => {
      const newOrderId = data?.order?._id;
      setOrderId(newOrderId);

      // Cash on delivery - complete immediately
      if (option === "cash_on_delivery") {
        resetCart();
        toast.success("Order placed successfully!");
        router.push("/success");
        return;
      }

      // Card payment - initialize Stripe
      if (option === "card" && newOrderId) {
        try {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}stripe/create-payment`,
            {
              orderId: newOrderId,
              // 🚩 FIX: Pass the calculated total amount from the client
              amount: total, // Add this line
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (!res.data.clientSecret) {
            toast.error("Failed to initialize payment. Please try again.");
            return;
          }
          setClientSecret(res.data.clientSecret);
          setShowCardPayment(true);
        } catch (err) {
          console.error("Payment initialization error:", err);
          toast.error("Failed to initialize payment. Please try again.");
        }
      }
    },
  });

  const onSubmit: SubmitHandler<shippingData> = useCallback(
    (data) => {
      setServerError("");

      if (!token) {
        toast.error("You must be logged in.");
        return;
      }

      if (cartProducts.length === 0) {
        toast.error("Your cart is empty.");
        return;
      }

      const fullName = `${data.firstName} ${data.lastName}`;

      const orderData: Order = {
        items: cartProducts.map((item) => ({
          product: item.product._id,
          quantity: item.quantity,
          color: item.selectedColor?.name,
          size: item.selectedSize?.name,
        })),
        shippingAddress: { ...data, fullName } as unknown as shippingData,
        paymentMethod: option,
        shippingPrice: delivery,
        taxPrice: 0,
      };

      handleCheckoutOrder({ order: orderData, token });
    },
    [cartProducts, option, token, delivery, handleCheckoutOrder]
  );

  useEffect(() => {
    if (user) {
      reset({
        country: user.country || "",
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        address1: user.address || "",
        address2: user.address2 || "",
        state: user.state || "",
        poster: user.poster || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
  }, [user, reset]);

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative">
      <Returing />

      {serverError && (
        <p className="text-red-500 text-center mt-2">{serverError}</p>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex mt-10 flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Billing Details */}
          <div className="lg:w-1/2 w-full">
            <div className="w-full">
              <h2 className="my-3 capitalize font-medium text-2xl">
                Billing details
              </h2>
              <div className="border px-3 py-5 md:px-6">
                <div className="capitalize flex flex-col gap-4 font-light text-black">
                  <div className="w-full mb-4">
                    <label htmlFor="country">country</label>
                    <input
                      type="text"
                      id="country"
                      className="placeholder:capitalize border w-full px-3 py-4 mt-3 outline-none focus-within:border-[#7971ea] focus-within:rounded transition-all duration-300 ease-in rounded capitalize"
                      // required
                      placeholder="enter your country"
                      {...register("country")}
                    />
                    {errors.country && (
                      <p className="text-red-500 mt-1">
                        {errors.country.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full mb-4">
                      <label htmlFor="firstname">first name</label>
                      <input
                        type="text"
                        {...register("firstName")}
                        id="firstname"
                        className="placeholder:capitalize border w-full px-3 py-4 mt-3 outline-none focus-within:border-[#7971ea] focus-within:rounded transition-all duration-300 ease-in rounded capitalize"
                        // required
                        placeholder="enter your firstname"
                      />
                      {errors.firstName && (
                        <p className="text-red-500 mt-1">
                          {errors.firstName.message}
                        </p>
                      )}
                    </div>
                    <div className="w-full mb-4">
                      <label htmlFor="lastname">last name</label>
                      <input
                        type="text"
                        {...register("lastName")}
                        id="lastname"
                        className="placeholder:capitalize border w-full px-3 py-4 mt-3 outline-none focus-within:border-[#7971ea] focus-within:rounded transition-all duration-300 ease-in rounded capitalize"
                        // required
                        placeholder="enter your lastname"
                      />
                      {errors.lastName && (
                        <p className="text-red-500 mt-1">
                          {errors.lastName.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="w-full mb-4">
                      <div className="">
                        <label htmlFor="address">address</label>

                        <input
                          type="text"
                          {...register("address1")}
                          id="address"
                          className="placeholder:capitalize border w-full px-3 py-4 mt-3 outline-none focus-within:border-[#7971ea] focus-within:rounded transition-all duration-300 ease-in rounded capitalize"
                          // required
                          placeholder="street address"
                        />
                        {errors.address1 && (
                          <p className="text-red-500 mt-1">
                            {errors.address1.message}
                          </p>
                        )}
                      </div>

                      <input
                        type="text"
                        {...register("address2")}
                        id="address2"
                        className="placeholder:capitalize border w-full px-3 py-4 mt-3 outline-none focus-within:border-[#7971ea] focus-within:rounded transition-all duration-300 ease-in rounded capitalize"
                        placeholder="apartment, suite, unit etc. (optional)"
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
                        className="placeholder:capitalize border w-full px-3 py-4 mt-3 outline-none focus-within:border-[#7971ea] focus-within:rounded transition-all duration-300 ease-in rounded capitalize"
                        // required
                        placeholder="enter your state"
                      />
                      {errors.state && (
                        <p className="text-red-500 mt-1">
                          {errors.state.message}
                        </p>
                      )}
                    </div>
                    <div className="w-full mb-4">
                      <label htmlFor="poster">postal / zip</label>
                      <input
                        type="text"
                        {...register("poster")}
                        id="poster"
                        className="placeholder:capitalize border w-full px-3 py-4 mt-3 outline-none focus-within:border-[#7971ea] focus-within:rounded transition-all duration-300 ease-in rounded capitalize"
                        placeholder="enter your postal / zip"
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
                        className="placeholder:capitalize border w-full px-3 py-4 mt-3 outline-none focus-within:border-[#7971ea] focus-within:rounded transition-all duration-300 ease-in rounded capitalize"
                        // required
                        placeholder="enter your email"
                      />
                      {errors.email && (
                        <p className="text-red-500 mt-1">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                    <div className="w-full mb-4">
                      <label htmlFor="phone">phone</label>
                      <input
                        type="text"
                        {...register("phone")}
                        id="phone"
                        className="placeholder:capitalize border w-full px-3 py-4 mt-3 outline-none focus-within:border-[#7971ea] focus-within:rounded transition-all duration-300 ease-in rounded capitalize"
                        // required
                        placeholder="enter your phone"
                      />
                      {errors.phone && (
                        <p className="text-red-500 mt-1">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/2 w-full">
            <CheckoutDetails
              option={option}
              setOption={setOption}
              cartProducts={cartProducts}
              subtotal={subtotal}
              delivery={delivery}
              total={total}
              showCardPayment={showCardPayment}
              clientSecret={clientSecret}
              orderId={orderId}
            />

            {!showCardPayment && (
              <Button
                type="submit"
                disabled={isPending || cartProducts.length === 0}
                className="border mb-4 bg-[#7971ea] w-full py-7 text-xl mt-5 text-white uppercase"
              >
                {isPending ? "Processing..." : "Place Order"}
              </Button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;

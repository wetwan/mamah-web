/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useMemo, useState } from "react";
import Returing from "./returing";
import Billing from "./billing";

import CheckoutDeatils from "@/components/checkoutDeatils";
import { useForm } from "react-hook-form";
import { shippingData, shippingSchema } from "@/src/api/auth/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CartItem, useCart } from "@/context/cartStore";
import { createOrder } from "@/src/api/product/route";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "@/context/userStore";
import { Order } from "@/src/api/product/schema";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

const Checkout = () => {
  const form = useForm<shippingData>({
    resolver: zodResolver(shippingSchema),
  });

  const cartProducts = useCart((state) => state.item);
  const resetCart = useCart((s) => s.resetCart);
  const token = useAuth((s) => s.token);
  const router = useRouter();

  const [option, setOption] = useState<"cash" | "card" | "">("");
  const [serverError, setServerError] = useState("");

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

  //   const mockUseMutation = ({ mutationFn, onSuccess, onError }) => {
  //     const mutate = async (variables: any) => {
  //       setIsPending(true);
  //       setError(null);
  //       try {
  //         // Simulate network delay
  //         await new Promise((resolve) => setTimeout(resolve, 1000));
  //         const result = await mutationFn(variables);
  //         onSuccess(result);
  //       } catch (err) {
  //         setError(err);
  //         onError(err);
  //       } finally {
  //         setIsPending(false);
  //       }
  //     };

  //     return { mutate, isPending, error };
  //   };

  const mutation = useMutation({
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
      console.log("Order success:", data);
      resetCart();
      router.push("/success");
    },
  });

const handleCheckout = form.handleSubmit((values) => {
  if (!option) {
    setServerError("Please select a payment method");
    return;
  }

  if (!token) {
    alert("You must be logged in to place an order.");
    return;
  }

const orderData: Order = {
  items: cartProducts.map((item) => ({
    product: item.product._id,
    quantity: item.quantity,
    color: item.selectedColor || undefined,
    size: item.selectedSize || undefined,
  })),
  shippingAddress: values,
  paymentMethod: option,
  shippingPrice: delivery,
  taxPrice: 0,
};


  mutation.mutate({ order: orderData, token });
});


  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <Returing />
      {serverError && (
        <p className="text-red-500 text-center mt-2">{serverError}</p>
      )}
      <form onSubmit={handleCheckout}>
        <div className="flex mt-10 flex-col lg:flex-row gap-12 lg:gap-20">
          <div className="lg:w-1/2 w-full ">
            <Billing form={form} />
          </div>
          <div className="lg:w-1/2 w-full ">
            <CheckoutDeatils
              option={option}
              cartProducts={cartProducts}
              setOption={setOption}
              subtotal={subtotal}
              delivery={delivery}
              total={total}
            />
          </div>
        </div>
        <Button
          type="submit"
          disabled={mutation.isPending}
          className="border mb-4 bg-[#7971ea] w-full font-light py-7 text-xl mt-5 text-white uppercase"
        >
          {mutation.isPending ? "Processing..." : "Place Order"}
        </Button>
      </form>
    </div>
  );
};

export default Checkout;

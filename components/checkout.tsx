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



const Checkout = () => {

  const form = useForm<shippingData>({
    resolver: zodResolver(shippingSchema),
  });


  const cartProducts = useCart((state) => state.item);

  const [option, setOption] = useState<"cash" | "card" | "">("");

  const [serverError, setServerError] = useState("");

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
  const token = useAuth((s) => !!s.token);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

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
    mutationFn: createOrder,
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
      alert("Order placed successfully!");
    },
  });

  const handleCheckout = form.handleSubmit((values) => {
    if (!option) {
      setServerError("Please select a payment method");
      return;
    }

    const orderData: Order = {
      item: cartProducts,
      shippingAddress: values,
      paymentmethod: option ,
      shippingPrice: delivery,
      taxPrice: 0,
    };

    mutation.mutate(orderData);
  });

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <Returing />
      <form
        className="flex mt-10 flex-col lg:flex-row gap-12 lg:gap-20"
        onSubmit={handleCheckout}
      >
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
            mutation={mutation}
          />
        </div>
      </form>
    </div>
  );
};

export default Checkout;

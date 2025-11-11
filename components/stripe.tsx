/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Button } from "./ui/button";
import { toast } from "react-toastify";
import { useAuth } from "@/context/userStore";
import axios from "axios";

type Props = {
  onPaymentSuccess: () => void;
  orderId: string | null;
};

export const CheckoutForm = ({ onPaymentSuccess, orderId }: Props) => {
  const stripe = useStripe();
  const elements = useElements();
  const token = useAuth((s) => s.token);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!stripe || !elements || !orderId) {
      toast.error("Payment system not ready. Please try again.");
      return;
    }

    setIsProcessing(true);

    try {
      const { error: submitError } = await elements.submit();
      if (submitError) {
        toast.error(submitError.message || "Could not submit payment details.");
        setIsProcessing(false);
        return;
      }

      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        redirect: "if_required",
        confirmParams: {
          return_url: window.location.origin + "/success",
        },
      });

      if (error) {
        toast.error(error.message || "Payment failed");
        setIsProcessing(false);
        return;
      }

      if (paymentIntent?.status === "succeeded") {
        if (!token) {
          toast.error("Authentication session expired. Please log in again.");
          setIsProcessing(false);
          return;
        }

        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}order/${orderId}/pay`,
          { paymentIntentId: paymentIntent.id },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        toast.success("Payment successful! Order processed.");
        onPaymentSuccess();
      }
    } catch (err: any) {
      console.error("Payment error:", err);

      const errorMessage =
        err.response?.data?.message ||
        "An unexpected error occurred. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };
  return (
    <div className="space-y-4">
      <PaymentElement />
      <Button
        type="button"
        onClick={handleSubmit}
        disabled={!stripe || isProcessing}
        className="w-full bg-[#7971ea] hover:bg-[#6961d9] py-6 text-white uppercase font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isProcessing ? (
          <span className="flex items-center justify-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Processing Payment...
          </span>
        ) : (
          "Confirm Payment"
        )}
      </Button>
    </div>
  );
};

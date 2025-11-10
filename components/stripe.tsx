/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useCart } from "@/context/cartStore";
import { useAuth } from "@/context/userStore";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

interface CheckoutFormProps {
  onPaymentSuccess: () => void;
  orderId: string | null;
  clientSecret: string | null;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({
  onPaymentSuccess,
  orderId,
  clientSecret,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const { resetCart } = useCart();
  const token = useAuth((s) => s.token);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!stripe || !elements || !orderId || !clientSecret) {
      console.error(
        "Stripe.js, elements, orderId, or clientSecret is missing."
      );
      toast.error("Payment details not initialized. Please try again.");
      return;
    }

    setLoading(true);

    try {
      console.log("🔄 Confirming payment...");

      // ✅ Confirm the payment
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        redirect: "if_required",
        confirmParams: {
          return_url: `${window.location.origin}/success`,
        },
      });

      if (error) {
        console.error("❌ Payment error:", error);
        toast.error(error.message || "Payment failed");
        setLoading(false);
        return;
      }

      if (paymentIntent && paymentIntent.status === "succeeded") {
        console.log("✅ Payment succeeded, updating order...");

        // ✅ Inform backend to update order status
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}order/${orderId}/pay`,
            { paymentIntentId: paymentIntent.id },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

          console.log("✅ Order updated successfully:", response.data);

          resetCart();
          toast.success("Payment successful! Redirecting...");

          // Small delay before redirect for better UX
          setTimeout(() => {
            onPaymentSuccess();
          }, 1000);
        } catch (backendError: any) {
          console.error("❌ Error updating order status:", backendError);

          if (backendError.response?.status === 401) {
            toast.error("Session expired. Please log in again.");
          } else {
            const errorMessage =
              backendError.response?.data?.message ||
              "Payment succeeded, but there was an error updating your order. Please contact support.";
            toast.error(errorMessage);
          }
        }
      }
    } catch (err) {
      console.error("❌ Unexpected error:", err);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PaymentElement
        options={{
          layout: "tabs",
        }}
      />
      <button
        onSubmit={handleSubmit}
        type="submit"
        disabled={!stripe || loading || !orderId || !clientSecret}
        className="bg-[#7971ea] text-white w-full py-3 mt-4 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#6961d9] transition-colors"
      >
        {loading ? (
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
            Processing...
          </span>
        ) : (
          "Confirm Payment"
        )}
      </button>
    </div>
  );
};

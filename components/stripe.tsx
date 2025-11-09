/* eslint-disable @typescript-eslint/no-explicit-any */
// stripe.tsx
"use client";

import { useCart } from "@/context/cartStore";
import { useAuth } from "@/context/userStore";
import {
  useStripe,
  useElements,
  CardCvcElement, // ✅ Import individual elements
  CardExpiryElement, // ✅ Import individual elements
  CardNumberElement, // ✅ Import individual elements
  // ❌ Remove PaymentElement
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useState } from "react";

interface CheckoutFormProps {
  onPaymentSuccess: () => void;
  orderId: string | null;
  clientSecret: string | null; // ✅ Add clientSecret to props
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({
  onPaymentSuccess,
  orderId,
  clientSecret, // ✅ Destructure clientSecret
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const { resetCart } = useCart();
  const token = useAuth((s) => s.token);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // 1. Add clientSecret to the check
    if (!stripe || !elements || !orderId || !clientSecret) {
      console.error(
        "Stripe.js, elements, orderId, or clientSecret is missing."
      );
      alert("Payment details not initialized. Please try again.");
      return;
    }

    // 2. Get the Card Element reference
    const cardElement = elements.getElement(CardNumberElement);
    if (!cardElement) {
        console.error("CardNumberElement not found.");
        return;
    }

    setLoading(true);

    // 3. ✅ USE stripe.confirmCardPayment with clientSecret
    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret, 
      {
        payment_method: {
          card: cardElement,
        },
      }
    );

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      // ✅ INFORM BACKEND TO UPDATE ORDER STATUS
      try {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}order/${orderId}/pay`,
          { paymentIntentId: paymentIntent.id },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        resetCart();
        onPaymentSuccess();
      } catch (backendError) {
        console.error(
          "❌ Error updating order status after payment:",
          backendError
        );
        alert(
          "Payment succeeded, but there was an error updating your order status. Please contact support."
        );
      }
    }

    setLoading(false);
  };

  return (
    // 4. Change form submit to button click (as Card Elements are not mounted on a <form> like PaymentElement)
    <div> 
      <div className="flex flex-col gap-4 p-4 border rounded-md bg-gray-50">
        {/* Card Number Input */}
        <div className="p-3 border rounded-md bg-white shadow-sm">
          <label className="text-xs font-semibold text-gray-500 mb-1 block">
            Card Number
          </label>
          <CardNumberElement
            className="text-lg"
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": { color: "#aab7c4" },
                },
              },
            }}
          />
        </div>

        <div className="flex gap-4">
          {/* Expiration Date Input */}
          <div className="w-1/2 p-3 border rounded-md bg-white shadow-sm">
            <label className="text-xs font-semibold text-gray-500 mb-1 block">
              Expiration Date
            </label>
            <CardExpiryElement
              className="text-lg"
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#424770",
                    "::placeholder": { color: "#aab7c4" },
                  },
                },
              }}
            />
          </div>

          {/* CVC Input */}
          <div className="w-1/2 p-3 border rounded-md bg-white shadow-sm">
            <label className="text-xs font-semibold text-gray-500 mb-1 block">
              CVC
            </label>
            <CardCvcElement
              className="text-lg"
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#424770",
                    "::placeholder": { color: "#aab7c4" },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
      
      <button
        // Use type="button" and onClick for better control
        type="button" 
        onClick={handleSubmit} 
        disabled={!stripe || loading || !orderId || !clientSecret} 
        className="bg-[#7971ea] text-white w-full py-3 mt-4 rounded"
      >
        {loading ? "Processing..." : "Confirm Payment"}
      </button>
    </div>
  );
};
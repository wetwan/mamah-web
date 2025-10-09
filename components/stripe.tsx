"use client";

import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { useState, FormEvent } from "react";

interface CheckoutFormProps {
  onPaymentSuccess: () => void; // ✅ declare the prop type
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({ onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: "http://localhost:3000/success" },
      redirect: "if_required",
    });

    if (error) {
      alert(error.message);
      console.error(error);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      onPaymentSuccess(); // ✅ callback from parent
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button
        type="submit"
        disabled={!stripe || loading}
        className="bg-[#7971ea] text-white w-full py-3 mt-4 rounded"
      >
        {loading ? "Processing..." : "Confirm Payment"}
      </button>
    </form>
  );
};

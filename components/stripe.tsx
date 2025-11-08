/* eslint-disable @typescript-eslint/no-explicit-any */
// stripe.tsx

import { useCart } from "@/context/cartStore";
import { useAuth } from "@/context/userStore";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useState } from "react";

interface CheckoutFormProps {
  onPaymentSuccess: () => void;
  orderId: string | null;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({
  onPaymentSuccess,
  orderId, 
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const { resetCart } = useCart();
  const token = useAuth((s) => s.token);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!stripe || !elements || !orderId) return; 

    setLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      // ✅ INFORM BACKEND TO UPDATE ORDER STATUS
      try {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}order/${orderId}/pay`, // Use a dedicated 'pay' endpoint with orderId
          { paymentIntentId: paymentIntent.id }, // Send payment intent ID for verification/logging
          { headers: { Authorization: `Bearer ${token}` } }
        );

        resetCart();
        onPaymentSuccess();
      } catch (backendError) {
        console.error(
          "❌ Error updating order status after payment:",
          backendError
        );
        // Handle error, maybe alert user or log
        alert(
          "Payment succeeded, but there was an error updating your order status. Please contact support."
        );
      }
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button
        type="submit"
        disabled={!stripe || loading || !orderId} // ✅ Disable if no orderId
        className="bg-[#7971ea] text-white w-full py-3 mt-4 rounded"
      >
        {loading ? "Processing..." : "Confirm Payment"}
      </button>
    </form>
  );
};

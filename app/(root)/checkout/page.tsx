/* eslint-disable @next/next/no-html-link-for-pages */

import React, { Suspense } from "react";
import Checkout from "@/components/checkout";

const ClientCheckoutWrapper = () => {
  // This wrapper ensures that the client component (Checkout) is fully contained
  // and doesn't cause hydration errors on the server, especially if Checkout
  // implicitly or explicitly uses client hooks like useSearchParams.
  return <Checkout />;
};

export default function CheckOutPage() {
  return (
    <div>
      <div className="w-full py-6 bg-[#f8f9fa] px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 flex items-center gap-2 capitalize font-medium">
        <a href="/" className="text-[#7971ea]">
          Home
        </a>
        <span>/</span>
        <a href="/cart" className="text-[#7971ea]">
          Cart
        </a>
        <span>/</span>
        <p>Checkout</p>
      </div>

      <Suspense
        fallback={
          <div className="text-center p-20 text-lg text-gray-500">
            Loading checkout details...
          </div>
        }
      >
        <ClientCheckoutWrapper />
      </Suspense>
    </div>
  );
}

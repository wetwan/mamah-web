import Billing from "@/components/billing";
import CheckoutDeatils from "@/components/checkoutDeatils";
import Returing from "@/components/returing";

import Link from "next/link";
import React from "react";

const CheckOut = () => {
  return (
    <div>
      <div className="w-full py-6 bg-[#f8f9fa] px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 flex items-center gap-2 capitalize font-medium">
        <Link href="/" className="text-[#7971ea]  ">
          Home
        </Link>
        <span>/</span>
        <Link href="/cart" className="text-[#7971ea]  ">
          Cart
        </Link>
        <span>/</span>
        <p>Checkout</p>
      </div>
      <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <Returing />
        <div className="flex mt-10 flex-col lg:flex-row gap-12 lg:gap-20">
          <div className="lg:w-1/2 w-full ">
            <Billing />
          </div>
          <div className="lg:w-1/2 w-full ">
            <CheckoutDeatils />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;

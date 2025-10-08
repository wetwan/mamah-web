import Billing from "@/components/billing";
import Link from "next/link";
import React from "react";

const CheckOut = () => {
  return (
    <div>
      <div className="w-full py-6 bg-[#f8f9fa] px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 flex items-center gap-2 capitalize font-medium">
        <Link href="/" className="text-[#a071eb]  ">
          Home
        </Link>
        <span>/</span>
        <Link href="/cart" className="text-[#a071eb]  ">
          Cart
        </Link>
        <span>/</span>
        <p>Checkout</p>
      </div>
      <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <div className="mt-10 border py-7 px-3">
          <p className="font-light">
            Returning customer?{" "}
            <Link className="text-[#a071eb]" href={"/"}>
              Click here{" "}
            </Link>{" "}
            to login
          </p>
        </div>

        <div className="flex mt-10 flex-col lg:flex-row  gap-6">
          <div className="lg:w-1/2 w-full ">

            <Billing />
          </div>
          <div className="lg:w-1/2 w-full border"></div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;

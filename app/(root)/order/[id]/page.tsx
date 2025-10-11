import Link from "next/link";
import React from "react";

const Order = () => {
  return (
    <div>
      <div className="w-full  py-6 bg-[#f8f9fa] md:px-8 lg:px-16 xl:32 2xl:px-64   capitalize flex items-center gap-2 px-4 font-medium">
        <Link href={"/"} className="text-[#7971ea]">
          home
        </Link>
        <span>/</span>{" "}
        <Link href={"/order"} className="text-[#7971ea]">
          order
        </Link>{" "}
        <span>/</span>
        <p>order 1</p>
      </div>
    </div>
  );
};

export default Order;

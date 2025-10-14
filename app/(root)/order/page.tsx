import Link from "next/link";
import React from "react";


const Orders = () => {
  const orders = [
    {
      _id: "egi873709953ugth",
      items: [
        {
          product: "6701df29b12e8c4f2f02e123",
          quantity: 2,
          color: "blue",
          size: "M",
        },
      ],
      shippingAddress: {
        address: "123 Market Street",
        city: "Lagos",
        country: "Nigeria",
      },
      paymentMethod: "card",
      shippingPrice: 2000,
      taxPrice: 1000,
      createdAt: 9876556922,
    },
  ];
  return (
    <div>
      <div className="w-full  py-6 bg-[#f8f9fa] md:px-8 lg:px-16 xl:32 2xl:px-64   capitalize flex items-center gap-2 px-4 font-medium">
        <Link href={"/"} className="text-[#7971ea]">
          home
        </Link>
        / <p>Orders</p>
      </div>
      <div className="md:px-8 lg:px-16 xl:32 2xl:px-64 px-4">
        <div className="grid max-sm:grid-cols-5 [grid-template-columns:1fr_1fr_1fr_1fr_1fr]  font-semibold capitalize text-gray-700 border-b items-center my-5 pb-2">
          <p>Item</p>
          <p className="max-sm:hidden"> date</p>
          <p>total price</p>
          <p>Quantity</p>
          <p>status</p>
        </div>
        {orders.map((order) => (
          <Link
            href={`order/${order._id}`}
            key={order._id}
            className="grid max-sm:grid-cols-5 [grid-template-columns:1fr_1fr_250px_200px_1fr]  font-semibold capitalize text-gray-700 border-b pb-2 items-center"
          >
            <p>{order._id}</p>
            <p className="max-sm:hidden">
              {" "}
              {order.createdAt &&
                new Date(order.createdAt * 1000).toLocaleDateString()}
            </p>
            <p>6000</p>
            <p className="">{order.items.length}</p>
            <p>pending</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Orders;

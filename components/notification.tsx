"use client";
import React from "react";

import { BellElectric, Check, CheckCircle, X } from "lucide-react";
import { getNotify, getProducts } from "@/src/api/product/route";
import { useAuth } from "@/context/userStore";
import { useQuery } from "@tanstack/react-query";
import { ShopdataProp } from "@/src/types/tpes";

export interface Notification {
  _id: string;
  type:
    | "ORDER_STATUS_UPDATE"
    | "ORDER_CANCELLED"
    | "INVENTORY_ALERT"
    | "NEW_PRODUCT_CREATED"
    | "NEW_ORDER";
  title: string;
  message: string;
  relatedId?: string; // optional: orderId, productId, etc.
  userIds?: string[]; // optional: target users
  isGlobal?: boolean; // optional: broadcast notification
  createdAt: string; // ISO timestamp

  isRead: boolean;
  updatedAt: string; // ISO timestamp
}

const Notifications = ({
  setOpenCart,
}: {
  setOpenCart: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { token } = useAuth();

  const { data, isLoading, isError } = useQuery<Notification[]>({
    queryKey: ["notify"],
    queryFn: () => getNotify(token as string),
  });
  const { data: product } = useQuery<ShopdataProp[]>({
    queryKey: ["notify"],
    queryFn: () => getProducts(),
  });
  console.log(data);
  console.log(product?.[0]);

  if (isError) {
    return <p className="text-center text-red-500">{isError}</p>;
  }


  return (
    <div className="z-50 absolute md:right-6 md:top-28 shadow-2xl shadow-black/40  w-[350px] h-auto p-4 bg-gray-100 top-52 right-0 ">
      <div className="flex items-center mb-2  justify-between">
        <h2 className="text-lg font-semibold">Your notifications </h2>
        <X onClick={() => setOpenCart(false)} />
      </div>

      {data?.length === 0 && (
        <div className="p-4 text-center text-gray-500">
          No new notifications
        </div>
      )}

      {isLoading && (
        <div className="p-4 text-center text-gray-500">
          <div className="flex justify-center gap-2 items-center">
            <div className="w-4 h-4 border-2 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
            <span>Loading notifications...</span>
          </div>
        </div>
      )}

      {!isLoading && !isError && data && (
        <div className="notification-dropdown">
          {data.map((n) => (
            <div
              key={n._id}
              className="mt-5 border px-3 py-4"
              // onClick={() => markAsRead(n.id)}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex gap-3 items-center ">
                  <BellElectric size={20} />
                  <strong>{n.type}</strong>
                </div>
                <div className="">
                  {!n.isRead ? (
                    <Check size={20} className="text-pink-600" />
                  ) : (
                    <CheckCircle className="text-pink-600" />
                  )}
                </div>
              </div>

              {n.type !== "NEW_PRODUCT_CREATED" && (
                <p className=" uppercase  text-gray-500 font-bold">
                  {n.title.toLowerCase()}{" "}
                </p>
              )}
              <p className=" uppercase  text-gray-500">
                {n.message.toLowerCase()}{" "}
                <small className="mr-auto mx-5 text-pink-600">
                  {new Date(n.createdAt).toLocaleTimeString()}
                </small>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;

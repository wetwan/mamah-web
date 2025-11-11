/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */

"use client";

export const dynamic = "force-dynamic";
import React, { useEffect } from "react";

import {
  Truck,
  Package,
  CheckCircle,
  Clock,
  MapPin,
  List,
  DollarSign,
} from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/context/userStore";
import { redirect, useParams, useRouter } from "next/navigation";
import { getOrder, getProducts } from "@/src/api/product/route";
import { orderProps } from "@/src/types/tpes";
import { toast } from "react-toastify";

const formatDate = (dateString: string | null) => {
  if (!dateString) return "N/A";
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  } catch (err) {
    console.log(err);
    return "Invalid Date";
  }
};

const getStatusInfo = (status: any, isDelivered: any) => {
  const lowerStatus = status?.toLowerCase();

  if (isDelivered || lowerStatus === "delivered") {
    return {
      icon: CheckCircle,
      text: "Delivered",
      color: "text-green-700 bg-green-100",
    };
  }

  switch (lowerStatus) {
    case "processing":
      return {
        icon: Package,
        text: "Processing",
        color: "text-yellow-700 bg-yellow-100",
      };
    case "shipped":
      return {
        icon: Truck,
        text: "Shipped",
        color: "text-blue-700 bg-blue-100",
      };
    case "cancelled":
      return {
        icon: Clock, // Using Clock as a neutral icon for cancelled
        text: "Cancelled",
        color: "text-red-700 bg-red-100",
      };
    default:
      return {
        icon: Clock,
        text: "Pending",
        color: "text-gray-600 bg-gray-100",
      };
  }
};

// --- MAIN COMPONENT ---
const OrderDetails = () => {
  const params = useParams();
  const id = params?.id;
  const { token } = useAuth();

  const {
    data: order,
    isLoading,
    isError,
  } = useQuery<orderProps>({
    queryKey: ["order", id],
    queryFn: () => getOrder(id as string),
    enabled: !!id,
  });

  const {
    icon: StatusIcon,
    text: statusText,
    color: statusColor,
  } = getStatusInfo(order?.status, order?.isDelivered);

  if (isLoading) {
    return null;
  }
  const steps = [
    {
      key: "placed",
      label: "Order Placed",
      description: "Order has been successfully placed.",
      date: order?.createdAt,
      isCompleted: true, // Always completed if the order exists
      isCurrent: !order?.isPaid && order?.status?.toLowerCase() !== "cancelled",
    },
    {
      key: "paid",
      label: "Payment Confirmed",
      description: "Payment has been successfully processed and verified.",
      date: order?.paidAt,
      isCompleted: order?.isPaid,
      isCurrent: order?.isPaid && order?.status?.toLowerCase() === "processing",
    },
    {
      key: "shipped",
      label: "Order Shipped",
      description: "Products are packed and on the way.",
      date:
        order?.status?.toLowerCase() === "shipped" || order?.isDelivered
          ? order?.deliveredAt
          : null, // Use deliveredAt as a placeholder for ship date if not explicitly tracked
      isCompleted:
        order?.status?.toLowerCase() === "shipped" || order?.isDelivered,
      isCurrent: order?.status?.toLowerCase() === "shipped",
    },
    {
      key: "delivered",
      label: "Delivered",
      description: "Package was successfully delivered.",
      date: order?.deliveredAt,
      isCompleted: order?.isDelivered,
      isCurrent: order?.isDelivered,
    },
  ];

  // Determine the active index based on the isCompleted flag for styling the bar
  const activeIndex = steps.reduce((latestIndex, step, index) => {
    return step.isCompleted ? index : latestIndex;
  }, 0);

  return (
    <div className="min-h-screen font-sans">
      {/* Breadcrumb Navigation */}
      <div className="w-full  py-6 bg-[#f8f9fa] md:px-8 lg:px-16 xl:32 2xl:px-64   capitalize flex items-center gap-2 px-4 font-medium">
        <Link href={"/"} className="text-[#7971ea]">
          home
        </Link>
        /
        <Link href={"/order"} className="text-[#7971ea]">
          order
        </Link>
        / <p>{order?._id}</p>
      </div>

      <div className="p-4 sm:p-8">
        {isLoading && <div className="p-6 text-center flex-1">Loading...</div>}
        {isError && (
          <div className="p-6 text-center text-red-500">
            Error loading orders.
          </div>
        )}

        {!isLoading && !isError && order && (
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Header and Status Card */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <h1 className="text-sm font-extrabold text-gray-900 mb-2">
                Order #<span className="text-blue-600">{order?._id}</span>
              </h1>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <p className="text-sm font-medium text-gray-600">
                  Placed on:{" "}
                  <span className="font-semibold text-gray-800">
                    {formatDate(order?.createdAt)}
                  </span>
                </p>
                <div
                  className={`mt-3 sm:mt-0 px-4 py-1.5 rounded-full text-sm font-bold shadow-sm ${statusColor} flex items-center`}
                >
                  <StatusIcon className="w-4 h-4 mr-1.5" />
                  {statusText}
                </div>
              </div>
            </div>

            {/* Main Content Grid: Timeline and Summary/Shipping */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column: Timeline */}
              <div className="lg:col-span-1">
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-md h-full">
                  <h3 className="text-sm font-bold mb-6 text-gray-800 flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-blue-600" />
                    Order Timeline
                  </h3>
                  <div className="relative">
                    {steps.map((step, index) => {
                      const isCompleted = step.isCompleted;
                      const isActive = index === activeIndex;

                      return (
                        <div key={step.key} className="flex relative mb-8">
                          {/* Vertical Line Connector (Hidden for the last step) */}
                          {index < steps.length - 1 && (
                            <div
                              className={`absolute left-[13px] top-6 w-0.5 h-full ${
                                isCompleted ? "bg-blue-400" : "bg-gray-200"
                              }`}
                            />
                          )}

                          {/* Circle Indicator */}
                          <div
                            className={`w-7 h-7 rounded-full z-10 flex items-center justify-center transition-all duration-300 ${
                              isActive && isCompleted
                                ? "bg-blue-600 shadow-lg scale-110"
                                : isCompleted
                                ? "bg-green-500"
                                : "bg-gray-300"
                            }`}
                          >
                            {isCompleted ? (
                              <CheckCircle className="w-4 h-4 text-white" />
                            ) : (
                              <div className="w-3 h-3 rounded-full bg-white opacity-70"></div>
                            )}
                          </div>

                          {/* Step Content */}
                          <div className="ml-4 -mt-1">
                            <p
                              className={`font-semibold text-sm transition-colors duration-300 ${
                                isActive && isCompleted
                                  ? "text-blue-600"
                                  : "text-gray-800"
                              }`}
                            >
                              {step.label}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                              {step.description}
                            </p>
                            {step.date && isCompleted && (
                              <p className="text-xs font-medium text-gray-400 mt-1">
                                {formatDate(step.date)}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right Columns: Summary and Shipping */}
              <div className="lg:col-span-2 space-y-8">
                {/* Financial Summary */}
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                  <h3 className="text-sm font-bold mb-4 text-gray-800 flex items-center">
                    <DollarSign className="w-5 h-5 mr-2 text-green-600" />
                    Financial Summary
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-600">Items Subtotal:</span>
                      <span className="font-medium">
                        ${order?.itemsPrice?.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-600">Shipping:</span>
                      <span className="font-medium">
                        ${order?.shippingPrice?.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-600">Tax:</span>
                      <span className="font-medium">
                        ${order?.taxPrice?.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between pt-2">
                      <span className="text-sm font-bold text-gray-900">
                        Order Total:
                      </span>
                      <span className="text-2xl font-extrabold text-blue-600">
                        ${order?.totalPrice?.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 pt-2 border-t border-gray-100">
                      Payment Method:{" "}
                      <span className="font-semibold capitalize text-gray-700">
                        {order?.paymentMethod}
                      </span>{" "}
                      (Paid Status:{" "}
                      <span
                        className={
                          order?.isPaid
                            ? "text-green-500 font-semibold"
                            : "text-yellow-500 font-semibold"
                        }
                      >
                        {order?.isPaid ? "Completed" : "Pending"}
                      </span>
                      )
                    </p>
                  </div>
                </div>

                {/* Shipping Details */}
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                  <h3 className="text-sm font-bold mb-4 text-gray-800 flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                    Shipping Address
                  </h3>
                  <address className="not-italic text-gray-700 space-y-1.5">
                    <p className="font-semibold text-sm text-gray-900">
                      {order?.shippingAddress?.fullName}
                    </p>
                    <p>{order?.shippingAddress?.address1}</p>
                    <p>
                      {order?.shippingAddress?.state},{" "}
                      {order?.shippingAddress?.country}
                    </p>
                    <p>
                      Email:{" "}
                      <span className="text-blue-600">
                        {order?.shippingAddress?.email}
                      </span>
                    </p>
                    <p>Phone: {order?.shippingAddress?.phone}</p>
                  </address>
                </div>
              </div>
            </div>

            {/* Items List */}
            <div className="bg-white p-6 rounded-xl shadow-2xl border border-gray-200">
              <h3 className="text-sm font-bold mb-6 text-gray-800 flex items-center">
                <List className="w-5 h-5 mr-2 text-blue-600" />
                Order Items
              </h3>
              <div className="space-y-4">
                {order?.items?.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start md:items-center border-b pb-4 last:border-b-0 last:pb-0"
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-20 h-20 rounded-lg object-cover mr-4 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0 pr-4">
                      <p className="font-semibold text-gray-900 truncate">
                        {item.product.name}
                      </p>
                      {/* {item.cat && (
                        <p className="text-sm text-gray-500 capitalize">
                          Category: {item.cat}
                        </p>
                      )} */}
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-bold text-gray-800">
                        ₦ {(item.price * item.quantity).toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-500">
                        {item.quantity} Qty @ ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Export the component using the mock data for preview
export default OrderDetails;

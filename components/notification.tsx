"use client";
import React, { useState } from "react";

import { BellElectric, Check, CheckCircle, Loader, X } from "lucide-react";
import { getNotify, acknowledgeNotification } from "@/src/api/product/route";
import { useAuth } from "@/context/userStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Notification, NotificationData } from "@/src/types/tpes";

const useAckNotification = (token: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => acknowledgeNotification(token, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: (error) => {
      console.error("Failed to acknowledge notification:", error);
    },
  });
};

const Notifications = ({
  setOpenCart,
  notifyRef,
}: {
  setOpenCart: React.Dispatch<React.SetStateAction<boolean>>;
  notifyRef: React.RefObject<null>;
}) => {
  dayjs.extend(relativeTime);
  const { token } = useAuth();

  const { data, isLoading, isError } = useQuery<NotificationData>({
    queryKey: ["notify"],
    queryFn: () => getNotify(token as string),
    enabled: !!token,
    refetchInterval: 2000,
    refetchOnWindowFocus: true,
  });

  const { mutate: acknowledge, isPending } = useAckNotification(
    token as string
  );
  const [activeId, setActiveId] = useState<string | null>(null);

  const handleAck = (id: string) => {
    setActiveId(id);
    acknowledge(id, {
      onSettled: () => setActiveId(null),
    });
  };

  console.log(data);

  // const { data: product } = useQuery<ShopdataProp[]>({
  //   queryKey: ["notify"],
  //   queryFn: () => getProducts(),
  // });

  if (isError) {
    return <p className="text-center text-red-500">{isError}</p>;
  }

  const notification = data?.notifications;

  return (
    <div
      className="z-50 absolute md:right-6 md:top-28 shadow-2xl shadow-black/40  w-[350px] h-auto p-4 bg-gray-100 top-52 right-0 max-h-screen"
      ref={notifyRef}
    >
      <div className="flex items-center mb-2  justify-between">
        <h2 className="text-lg font-semibold">Your notifications </h2>
        <X onClick={() => setOpenCart(false)} />
      </div>

      {notification?.length === 0 && (
        <div className="p-4 text-center text-gray-500">
          No new notifications
        </div>
      )}

      {isLoading && (
        <div className="p-4 text-center text-gray-500">
          <div className="flex justify-center gap-2 items-center">
            <div className="w-4 h-4 border-2 border-pink-500 border-t-transparent rounded-full animate-spin" />
            <span>Loading notifications...</span>
          </div>
        </div>
      )}

      {!isLoading && !isError && notification && (
        <div className="notification-dropdown">
          {notification.map((n: Notification) => (
            <div
              key={n._id}
              className="mt-2 rounded-2xl bg-white border px-3 py-2 shadow-md hover:shadow-lg cursor-pointer"
              onClick={() => handleAck(n._id)}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex gap-3 items-center ">
                  <BellElectric size={20} />
                  <strong className="text-sm">{n.type}</strong>
                </div>
                <div onClick={() => handleAck(n._id)}>
                  {!n.isRead ? (
                    <Check size={20} className="text-pink-600" />
                  ) : activeId === n._id && isPending ? (
                    <Loader className="animate-spin text-pink-600" />
                  ) : (
                    <CheckCircle className="text-pink-600" />
                  )}
                </div>
              </div>
              {n.type !== "NEW_PRODUCT_CREATED" && (
                <p className=" uppercase text-xs text-gray-500 font-semibold">
                  {n.title.toLowerCase()}
                </p>
              )}
              <p className=" uppercase text-gray-500 text-xs">
                {n.message.toLowerCase()}
              </p>
              <small className="text-pink-600 place-items-end w-full flex justify-end text-xs">
                {(() => {
                  const txt = dayjs(n.createdAt || n.timestamp).fromNow();
                  return txt
                    ? txt.charAt(0).toUpperCase() + txt.slice(1)
                    : "N/A";
                })()}
              </small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Bell, ShoppingCart } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import Cart from "./cart";
import ProfileDropdown from "./profiledropdown";
import { Button } from "./ui/button";
import { useCart } from "@/context/cartStore";
import { useAuth } from "@/context/userStore";
import Notifications from "./notification";
import { useQuery } from "@tanstack/react-query";
import { getNotify } from "@/src/api/product/route";
import { NotificationData } from "@/src/types/tpes";
import { useNotificationStore } from "@/context/notificationStore";

const useOnClickOutside = (ref: unknown, handler: any) => {
  useEffect(() => {
    const listener = (event: { target: any }) => {
      const refsArray = Array.isArray(ref) ? ref : [ref];

      for (const currentRef of refsArray) {
        if (!currentRef.current || currentRef.current.contains(event.target)) {
          return;
        }
      }

      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
};

const MenuIcons = () => {
  const [openCart, setOpenCart] = useState(false);
  const [notifyPanel, setNotifyPanel] = useState(false);

  const cartPanelRef = useRef(null);
  const notifyPanelRef = useRef(null);

  const cartButtonRef = useRef(null);
  const notifyButtonRef = useRef(null);

  const cartItems = useCart((state) => state.item);

  const closeCart = () => setOpenCart(false);
  const closeNotifications = () => setNotifyPanel(false);

  useOnClickOutside(
    [cartPanelRef, cartButtonRef],
    openCart ? closeCart : () => {}
  );
  useOnClickOutside(
    [notifyPanelRef, notifyButtonRef],
    notifyPanel ? closeNotifications : () => {}
  );

  const handleNotificationToggle = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    setNotifyPanel(!notifyPanel);

    if (openCart) setOpenCart(false);
  };

  const handleCartToggle = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    setOpenCart(!openCart);

    if (notifyPanel) setNotifyPanel(false);
  };

  const { token } = useAuth();

  const cartnumber = cartItems.length;

  // Get real-time notifications from zustand store
  const { notifications: realtimeNotifications } = useNotificationStore();

  // Fetch server notifications (reduced interval since WebSocket handles real-time)
  const { data = { notifications: [], unreadCount: 0 } } =
    useQuery<NotificationData>({
      queryKey: ["notify", token],
      queryFn: () => getNotify(token as string),
      enabled: !!token,
      refetchInterval: 30000, // Reduced from 20s to 30s
      refetchOnWindowFocus: true,
    });

  // Calculate combined unread count
  const realtimeUnread = realtimeNotifications.filter((n) => !n.isRead).length;
  const serverUnread = data?.unreadCount || 0;
  const totalUnreadCount = Math.max(realtimeUnread, serverUnread);

  // Show ping animation when there are new real-time notifications
  const hasNewNotifications = realtimeUnread > 0;

  return (
    <>
      <ul className="flex items-center gap-3 md:w-1/3 justify-end">
        <li className="text-gray-500 hover:text-neutral-600 cursor-pointer transition-all duration-300 hover:-translate-y-1 ">
          <ProfileDropdown />
        </li>

        {!!token && (
          <li className="text-gray-500 hover:text-neutral-600 cursor-pointer transition-all duration-300 hover:-translate-y-1 ">
            <Button
              ref={notifyButtonRef}
              variant="ghost"
              onClick={handleNotificationToggle}
              className={`relative flex items-center justify-center hover:bg-transparent ${
                totalUnreadCount > 0 && "bg-pink-100 hover:bg-pink-100"
              }`}
            >
              <Bell
                size={54}
                strokeWidth={2.4}
                className="text-3xl scale-[1.6]"
              />
              {totalUnreadCount > 0 && (
                <>
                  <div className="absolute -top-4 -right-1 bg-pink-500 text-white w-6 h-6 text-center flex items-center justify-center rounded-full group-hover:-translate-x-3 transition-all text-xs font-bold">
                    {totalUnreadCount > 99 ? "99+" : totalUnreadCount}
                  </div>
                  
                  {/* Ping animation for new notifications */}
                  {hasNewNotifications && (
                    <span className="absolute -top-4 -right-1 flex h-6 w-6">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                    </span>
                  )}
                </>
              )}
            </Button>
          </li>
        )}

        <li
          ref={cartButtonRef}
          className="text-gray-500 hover:text-neutral-600 cursor-pointer transition-all duration-300 hover:-translate-y-1 relative group"
          onClick={handleCartToggle}
        >
          <Button
            variant="ghost"
            className={`relative flex items-center justify-center hover:bg-transparent ${
              cartnumber && "bg-green-200 hover:bg-green-200"
            }`}
          >
            {/* Bigger icon */}
            <ShoppingCart
              size={54}
              strokeWidth={2.4}
              className="text-3xl scale-[1.6]"
            />
          </Button>

          {cartnumber !== 0 && (
            <div className="absolute -top-4 -right-1 bg-green-500 w-6 h-6 text-center flex items-center justify-center rounded-full group-hover:-translate-x-3 transition-all text-xs font-bold text-white">
              {cartnumber > 99 ? "99+" : cartnumber}
            </div>
          )}
        </li>
      </ul>

      {openCart && <Cart cartRef={cartPanelRef} setOpenCart={setOpenCart} />}
      {notifyPanel && (
        <Notifications
          notifyRef={notifyPanelRef}
          setOpenCart={setNotifyPanel}
        />
      )}
    </>
  );
};

export default MenuIcons;
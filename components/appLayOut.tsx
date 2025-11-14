"use client";

import React, { useEffect, useRef } from "react";
import ToastProvider from "./ToastProvider";
import { Providers } from "./providers";
import Nav from "./nav";
import Footer from "./footer";
import { NotificationListener } from "@/src/hooks/useWebSocketNotifications";
import { useAuth } from "@/context/userStore";
import { subscribeToPush } from "@/src/hooks/usePushNotifications";

const AppLayOut = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { user } = useAuth();
  const subscriptionAttemptedRef = useRef(false);

  useEffect(() => {
    // Only attempt subscription once per session
    if (user?._id && !subscriptionAttemptedRef.current) {
      subscriptionAttemptedRef.current = true;

      // Delay subscription to avoid blocking initial render
      const timer = setTimeout(() => {
        subscribeToPush(user._id)
          .then(() => {
            console.log("✅ Push notifications enabled");
          })
          .catch((err) => {
            console.error("❌ Push subscription error:", err);
          });
      }, 2000); // Wait 2 seconds after page load

      return () => clearTimeout(timer);
    }
  }, [user?._id]);

  return (
    <div>
      <ToastProvider>
        <Providers>
          <Nav />
          {children}
          <Footer />
          {/* Mount WebSocket notifications */}
          <NotificationListener />
        </Providers>
      </ToastProvider>
    </div>
  );
};

export default AppLayOut;

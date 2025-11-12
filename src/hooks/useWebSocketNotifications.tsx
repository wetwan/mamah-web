/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useNotificationStore } from "@/context/notificationStore";
import { useAuth } from "@/context/userStore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface NotificationPayload {
  type: "ORDER_STATUS_UPDATE" | "INVENTORY_ALERT" | "NEW_PRODUCT_CREATED";
  message?: string;
  orderId?: string;
  status?: string;
  alertCount?: number;
}

const WS_URL = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:5000";

const useWebSocketNotifications = (
  token: string | null,
  userId: string | null,
  userRole: string | null
) => {
  const { addNotification } = useNotificationStore();
  useEffect(() => {
    if (!token) {
      console.log("WebSocket: User not authenticated, skipping connection.");
      return;
    }

    const socketUrl = `${WS_URL}?token=${token}`;
    const ws = new WebSocket(socketUrl);

    let reconnectTimeout: NodeJS.Timeout | null = null;
    const RECONNECT_INTERVAL = 5000;

    ws.onopen = () => {
      console.log("✅ WebSocket Connected.");
      if (reconnectTimeout) {
        clearTimeout(reconnectTimeout);
        reconnectTimeout = null;
      }
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data.toString());

        // Handle notifications based on type
        switch (data.type) {
          case "ORDER_STATUS_UPDATE":
            // Only show this to Admins for processing updates, or the specific User for their own updates
            if (userRole === "admin" || data.userId === userId) {
              toast.info(
                `Order #${data.orderId.slice(
                  -4
                )} status changed to: ${data.status.toUpperCase()}`,
                {
                  position: "top-right",
                }
              );
            }
            break;

          case "INVENTORY_ALERT":
            // Inventory alerts are typically only for Admins
            if (userRole === "admin") {
              toast.warn(
                `⚠️ INVENTORY ALERT: ${data.alertCount} product(s) are low in stock!`,
                {
                  position: "top-right",
                  autoClose: false, // Keep alert visible until dismissed
                }
              );
            }
            break;

          case "NEW_PRODUCT_CREATED":
            toast.info(
              `New Product Added: ${data.productName} (Category: ${data.category})`
            );
            addNotification(data); // store in Zustand for history
            break;

          default:
            console.log("WS Server Message:", data);
        }
        addNotification(data);
      } catch (error) {
        const errMsg = error instanceof Error ? error.message : String(error);
        toast.error(errMsg);
        console.log("WS Text Message:", event.data.toString());
      }
    };

    ws.onerror = (error) => {
      console.error("❌ WebSocket Error:", error);
    };

    ws.onclose = (event) => {
      console.log(
        `❌ WebSocket Closed. Code: ${event.code}. Reason: ${event.reason}`
      );

      reconnectTimeout = setTimeout(() => {
        console.log("Attempting to reconnect WebSocket...");
      }, RECONNECT_INTERVAL);
    };

    // 3. Cleanup function: Close the connection when the component unmounts
    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close(1000, "Component Unmounted");
        console.log("WebSocket connection cleaned up.");
      }
      if (reconnectTimeout) {
        clearTimeout(reconnectTimeout);
      }
    };
  }, [token, userId, userRole, addNotification]); // Reconnect only if auth state changes
};

export const NotificationListener = () => {
  const { token, user } = useAuth();

  // Pass real auth data to the WebSocket hook
  useWebSocketNotifications(token, user?._id || null, user?.role || null);

  return null; // No UI needed
};

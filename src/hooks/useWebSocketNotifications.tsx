/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useNotificationStore } from "@/context/notificationStore";
import { useAuth } from "@/context/userStore";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

interface NotificationPayload {
  type:
    | "ORDER_STATUS_UPDATE"
    | "ORDER_CANCELLED"
    | "INVENTORY_ALERT"
    | "NEW_PRODUCT_CREATED"
    | "NEW_ORDER"
    | "CONNECTION_SUCCESS"
    | "NOTIFICATION_HISTORY";
  message?: string;
  orderId?: string;
  status?: string;
  alertCount?: number;
  productName?: string;
  category?: string;
  userId?: string;
  totalPrice?: number;
  timestamp?: string;
  isAuthenticated?: boolean;
  role?: string;
  notifications?: any[];
  count?: number;
}

const WS_URL = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:5000";

const useWebSocketNotifications = (
  token: string | null,
  userId: string | null,
  userRole: string | null
) => {
  const { addNotification } = useNotificationStore();
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const reconnectAttemptsRef = useRef(0);
  const MAX_RECONNECT_ATTEMPTS = 5;
  const RECONNECT_INTERVAL = 5000;

  useEffect(() => {
    if (!token) {
      return;
    }

    const connect = () => {
      // Close existing connection if any
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.close();
      }

      const socketUrl = `${WS_URL}?token=${token}`;
      const ws = new WebSocket(socketUrl);
      wsRef.current = ws;

      // Heartbeat to keep connection alive
      let heartbeatInterval: NodeJS.Timeout;

      ws.onopen = () => {
        console.log("✅ WebSocket Connected.");
        setIsConnected(true);
        reconnectAttemptsRef.current = 0; // Reset reconnect attempts

        if (reconnectTimeoutRef.current) {
          clearTimeout(reconnectTimeoutRef.current);
          reconnectTimeoutRef.current = null;
        }

        // Send heartbeat ping every 25 seconds
        heartbeatInterval = setInterval(() => {
          if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({ type: "PING" }));
          }
        }, 25000);
      };

      ws.onmessage = (event) => {
        try {
          const data: NotificationPayload = JSON.parse(event.data.toString());

          // Handle different notification types
          switch (data.type) {
            case "CONNECTION_SUCCESS":
              if (!data.isAuthenticated) {
                toast.warning("Connected as guest. Please login.");
              }
              break;

            case "NOTIFICATION_HISTORY":
              if (data.notifications && data.notifications.length > 0) {
                data.notifications.forEach((notif) => addNotification(notif));
              }
              break;

            case "ORDER_STATUS_UPDATE":
              if (userRole === "admin" || data.userId === userId) {
                toast.info(
                  `Order #${data.orderId?.slice(
                    -4
                  )} status changed to: ${data.status?.toUpperCase()}`,
                  {
                    position: "top-right",
                  }
                );
                addNotification(data);
              }
              break;

            case "ORDER_CANCELLED":
              if (
                userRole === "admin" ||
                userRole === "sales" ||
                data.userId === userId
              ) {
                toast.error(
                  `Order #${data.orderId?.slice(-4)} was cancelled: ${
                    data.message || "Payment timeout"
                  }`,
                  {
                    position: "top-right",
                  }
                );
                addNotification(data);
              }
              break;

            case "NEW_ORDER":
              toast.success(
                `🎉 New Order Received! Order #${data.orderId?.slice(-4)} - $${
                  data.totalPrice
                }`,
                {
                  position: "top-right",
                }
              );
              addNotification(data);

              break;

            case "INVENTORY_ALERT":
              if (userRole === "admin" || userRole === "sales") {
                toast.warn(
                  `⚠️ INVENTORY ALERT: ${data.alertCount} product(s) are low in stock!`,
                  {
                    position: "top-right",
                    autoClose: false,
                  }
                );
                addNotification(data);
              }
              break;

            case "NEW_PRODUCT_CREATED":
              toast.info(
                `New Product Added: ${data.productName} (Category: ${data.category})`,
                {
                  position: "top-right",
                }
              );
              addNotification(data);
              break;

            default:
              // Add to notification store even if type is unknown
              addNotification(data);
          }
        } catch (error) {
          const errMsg = error instanceof Error ? error.message : String(error);
          console.error("Error parsing WebSocket message:", errMsg);
    
        }
      };

      ws.onerror = (error) => {
        console.error("❌ WebSocket Error:", error);
        setIsConnected(false);
      };

      ws.onclose = (event) => {
        console.log(
          `❌ WebSocket Closed. Code: ${event.code}. Reason: ${event.reason}`
        );
        setIsConnected(false);

        // Clear heartbeat interval
        if (heartbeatInterval) {
          clearInterval(heartbeatInterval);
        }

        // Attempt to reconnect
        if (reconnectAttemptsRef.current < MAX_RECONNECT_ATTEMPTS) {
          reconnectAttemptsRef.current++;
          console.log(
            `🔄 Reconnecting... Attempt ${reconnectAttemptsRef.current}/${MAX_RECONNECT_ATTEMPTS}`
          );
          reconnectTimeoutRef.current = setTimeout(() => {
            connect();
          }, RECONNECT_INTERVAL);
        } else {
          console.error(
            "❌ Max reconnection attempts reached. Please refresh the page."
          );
          toast.error(
            "Connection lost. Please refresh the page to reconnect.",
            {
              position: "top-center",
              autoClose: false,
            }
          );
        }
      };
    };

    connect();

    // Cleanup function
    return () => {
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.close(1000, "Component Unmounted");
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, [token, userId, userRole, addNotification]);

  return { isConnected };
};

export const NotificationListener = () => {
  const { token, user } = useAuth();
  const { isConnected } = useWebSocketNotifications(
    token,
    user?._id || null,
    user?.role || null
  );

  // Optionally render connection status indicator
  return null; // No UI needed
};

export default useWebSocketNotifications;

/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { toast } from "react-toastify";
import { useAuth } from "@/context/userStore";
import { useNotificationStore } from "@/context/notificationStore";
import { Notification } from "../types/tpes";

const WS_URL = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:5000";

export const useWebSocketNotifications = (
  token: string | null,
  userId: string | null,
  userRole: string | null
) => {
  const { addNotification } = useNotificationStore();
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const heartbeatIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const reconnectAttemptsRef = useRef(0);
  const isConnectingRef = useRef(false);

  const MAX_RECONNECT_ATTEMPTS = 5;
  const BASE_RECONNECT_INTERVAL = 5000;

  // Calculate exponential backoff
  const getReconnectDelay = useCallback(() => {
    const delay = Math.min(
      BASE_RECONNECT_INTERVAL * Math.pow(2, reconnectAttemptsRef.current),
      30000 // Max 30 seconds
    );
    return delay;
  }, []);

  // Clean up intervals
  const cleanupHeartbeat = useCallback(() => {
    if (heartbeatIntervalRef.current) {
      clearInterval(heartbeatIntervalRef.current);
      heartbeatIntervalRef.current = null;
    }
  }, []);

  const cleanupReconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
  }, []);

  // Show notification toast based on type
  const showNotificationToast = useCallback((data: Notification) => {
    const message = `${data.title}: ${data.message}`;
    const options = {
      position: "top-right" as const,
      autoClose: 5000,
    };

    switch (data.type) {
      case "ORDER_STATUS_UPDATE":
      case "ORDER_CANCELLED":
      case "USER_LOGIN":
        toast.info(message, options);
        break;

      case "INVENTORY_ALERT":
        toast.warn(message, {
          ...options,
          autoClose: false,
        });
        break;

      case "NEW_PRODUCT_CREATED":
      case "NEW_PRODUCT_UPDATED":
      case "NEW_ORDER":
      case "NEW_ORDER_PAYMENT":
      case "NEW_USER_CREATED":
        toast.success(message, options);
        break;

      default:
        toast(message, options);
    }
  }, []);

  const connect = useCallback(() => {
    // Prevent multiple simultaneous connection attempts
    if (isConnectingRef.current) {
      console.log("⏳ Connection attempt already in progress");
      return;
    }

    // Close existing connection
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.close();
    }

    isConnectingRef.current = true;
    cleanupHeartbeat();
    cleanupReconnect();

    const ws = new WebSocket(`${WS_URL}?token=${token}`);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("✅ WebSocket Connected");
      setIsConnected(true);
      isConnectingRef.current = false;
      reconnectAttemptsRef.current = 0;

      // Start heartbeat
      heartbeatIntervalRef.current = setInterval(() => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify({ type: "PING" }));
        }
      }, 25000);
    };

    ws.onmessage = (event) => {
      try {
        const data: Notification = JSON.parse(event.data);

        // Check if notification is relevant to this user
        const isRelevant =
          data.isGlobal ||
          (data.userIds && userId && data.userIds.includes(userId));

        if (isRelevant) {
          const notification = {
            ...data,
            timestamp: data.timestamp || new Date().toISOString(),
            isRead: false,
          };

          addNotification(notification);
          showNotificationToast(notification);
        }
      } catch (err) {
        console.error("❌ Error parsing WebSocket message:", err);
      }
    };

    ws.onerror = (err) => {
      console.error("❌ WebSocket Error:", err);
      setIsConnected(false);
      isConnectingRef.current = false;
    };

    ws.onclose = (event) => {
      console.log(
        `❌ WebSocket Closed. Code: ${event.code}, Reason: ${
          event.reason || "Unknown"
        }`
      );
      setIsConnected(false);
      isConnectingRef.current = false;
      cleanupHeartbeat();

      // Attempt reconnection with exponential backoff
      if (reconnectAttemptsRef.current < MAX_RECONNECT_ATTEMPTS) {
        const delay = getReconnectDelay();
        reconnectAttemptsRef.current++;

        console.log(
          `🔄 Reconnecting in ${delay / 1000}s (attempt ${
            reconnectAttemptsRef.current
          }/${MAX_RECONNECT_ATTEMPTS})`
        );

        reconnectTimeoutRef.current = setTimeout(connect, delay);
      } else {
        toast.error("Connection lost. Please refresh to reconnect.", {
          position: "top-center",
          autoClose: false,
          toastId: "ws-connection-lost", // Prevent duplicate toasts
        });
      }
    };
  }, [
    token,
    userId,
    addNotification,
    showNotificationToast,
    cleanupHeartbeat,
    cleanupReconnect,
    getReconnectDelay,
  ]);

  useEffect(() => {
    if (!token) {
      console.log("⏸️ No token, skipping WebSocket connection");
      return;
    }

    connect();

    return () => {
      console.log("🧹 Cleaning up WebSocket connection");

      // Clean up timers
      cleanupHeartbeat();
      cleanupReconnect();

      // Close WebSocket
      if (wsRef.current) {
        if (wsRef.current.readyState === WebSocket.OPEN) {
          wsRef.current.close(1000, "Component unmounted");
        }
        wsRef.current = null;
      }

      isConnectingRef.current = false;
      setIsConnected(false);
    };
  }, [token, connect, cleanupHeartbeat, cleanupReconnect]);

  return { isConnected };
};

// Component to mount WebSocket in the app
export const NotificationListener = () => {
  const { token, user } = useAuth();
  const { isConnected } = useWebSocketNotifications(
    token,
    user?._id || null,
    user?.role || null
  );

  // Optional: Show connection status in dev mode
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.log(
        `WebSocket status: ${isConnected ? "Connected" : "Disconnected"}`
      );
    }
  }, [isConnected]);

  return null;
};

// hooks/usePushNotifications.ts
'use client'

import axios from "axios";

// Helper function
function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  return new Uint8Array([...rawData].map((char) => char.charCodeAt(0)));
}

// Check if user is already subscribed
async function getExistingSubscription(): Promise<PushSubscription | null> {
  if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
    return null;
  }
  
  try {
    const registration = await navigator.serviceWorker.ready;
    return await registration.pushManager.getSubscription();
  } catch (error) {
    console.error("Error checking existing subscription:", error);
    return null;
  }
}

// Main subscription function
export const subscribeToPush = async (userId: string): Promise<boolean> => {
  try {
    // Check browser support
    if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
      console.warn("Push notifications not supported");
      return false;
    }

    // Check if already subscribed
    const existingSubscription = await getExistingSubscription();
    if (existingSubscription) {
      console.log("✅ Already subscribed to push notifications");
      // Optionally update server with existing subscription
      await updateServerSubscription(userId, existingSubscription);
      return true;
    }

    // Check notification permission
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      console.warn("Notification permission denied");
      return false;
    }

    // Register service worker
    const registration = await navigator.serviceWorker.register("/sw.js", {
      scope: "/",
      updateViaCache: "none", // Always check for updates
    });

    // Wait for service worker to be ready
    await navigator.serviceWorker.ready;

    // Subscribe to push
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
      ),
    });

    // Send subscription to backend
    await updateServerSubscription(userId, subscription);

    console.log("✅ Push subscription successful");
    return true;

  } catch (err) {
    console.error("❌ Push subscription failed:", err);
    return false;
  }
};

// Update server with subscription
async function updateServerSubscription(
  userId: string,
  subscription: PushSubscription
): Promise<void> {
  try {
    await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}push/allow`,
      {
        userId,
        subscription: subscription.toJSON(), // Convert to JSON
      },
      {
        timeout: 300000, 
      }
    );
    console.log("✅ Server updated with subscription");
  } catch (error) {
    console.error("❌ Failed to update server:", error);
    throw error;
  }
}

// Unsubscribe from push notifications
export const unsubscribeFromPush = async (userId: string): Promise<boolean> => {
  try {
    const subscription = await getExistingSubscription();
    if (!subscription) {
      console.log("No active subscription found");
      return true;
    }

    // Unsubscribe from push manager
    const success = await subscription.unsubscribe();
    
    if (success) {
      // Notify server
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}push/revoke`,
        { userId },
        { timeout: 10000 }
      );
      console.log("✅ Unsubscribed from push notifications");
    }

    return success;
  } catch (error) {
    console.error("❌ Unsubscribe failed:", error);
    return false;
  }
}

// Check current permission status
export const checkNotificationPermission = (): NotificationPermission => {
  if (!("Notification" in window)) {
    return "denied";
  }
  return Notification.permission;
}
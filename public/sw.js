/* eslint-disable @typescript-eslint/no-unused-vars */
// Service Worker for Push Notifications
const CACHE_VERSION = "v1";

// Install event - cache resources if needed
self.addEventListener("install", (event) => {
  console.log("Service Worker installing...");
  self.skipWaiting(); // Activate immediately
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  console.log("Service Worker activating...");
  event.waitUntil(self.clients.claim()); // Take control immediately
});

// Push event - show notification
self.addEventListener("push", (event) => {
  console.log("Push notification received");

  let data = {
    title: "New Notification",
    message: "You have a new notification",
    url: "/",
  };

  try {
    if (event.data) {
      data = event.data.json();
    }
  } catch (error) {
    console.error("Error parsing push data:", error);
  }

  const options = {
    body: data.message,
    icon: "/favicon.ico",
    badge: "/favicon.ico",
    tag: data.tag || "default-notification", // Prevent duplicate notifications
    requireInteraction: data.requireInteraction || false,
    silent: false,
    data: {
      url: data.url || "/",
      timestamp: Date.now(),
      notificationId: data._id || data.id,
    },
    actions: data.actions || [], // Optional action buttons
    vibrate: [200, 100, 200], // Vibration pattern
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options).catch((error) => {
      console.error("Error showing notification:", error);
    })
  );
});

// Notification click event
self.addEventListener("notificationclick", (event) => {
  console.log("Notification clicked");

  event.notification.close();

  const urlToOpen = event.notification.data?.url || "/";

  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        // Check if there's already a window open with this URL
        for (const client of clientList) {
          if (client.url === urlToOpen && "focus" in client) {
            return client.focus();
          }
        }
        // If no window is open, open a new one
        if (clients.openWindow) {
          return clients.openWindow(urlToOpen);
        }
      })
      .catch((error) => {
        console.error("Error handling notification click:", error);
      })
  );
});

// Notification close event (optional analytics)
self.addEventListener("notificationclose", (event) => {
  console.log("Notification closed", event.notification.tag);
  // Optional: Send analytics about dismissed notifications
});

// Message event - handle messages from the client
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

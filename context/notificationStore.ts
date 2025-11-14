import { Notification } from "@/src/types/tpes";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface NotificationStore {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (payload: Notification) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearAll: () => void;
  removeNotification: (id: string) => void;
  getNotificationById: (id: string) => Notification | undefined;
}

export const useNotificationStore = create<NotificationStore>()(
  persist(
    (set, get) => ({
      notifications: [],
      unreadCount: 0,

      addNotification: (data: Notification) => {
        set((state) => {
          // Deduplicate by _id
          const exists = state.notifications.some((n) => n._id === data._id);
          if (exists) {
            console.log(`Notification ${data._id} already exists, skipping`);
            return state;
          }

          const newNotifications = [data, ...state.notifications];
          const limitedNotifications = newNotifications.slice(0, 50); // Keep last 50
          const unreadCount = limitedNotifications.filter((n) => !n.isRead).length;

          return {
            notifications: limitedNotifications,
            unreadCount,
          };
        });
      },

      markAsRead: (id: string) => {
        set((state) => {
          const notifications = state.notifications.map((n) =>
            n._id === id && !n.isRead ? { ...n, isRead: true } : n
          );
          const unreadCount = notifications.filter((n) => !n.isRead).length;

          return {
            notifications,
            unreadCount,
          };
        });
      },

      markAllAsRead: () => {
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, isRead: true })),
          unreadCount: 0,
        }));
      },

      clearAll: () => {
        set({ notifications: [], unreadCount: 0 });
      },

      removeNotification: (id: string) => {
        set((state) => {
          const notifications = state.notifications.filter((n) => n._id !== id);
          const unreadCount = notifications.filter((n) => !n.isRead).length;

          return {
            notifications,
            unreadCount,
          };
        });
      },

      getNotificationById: (id: string) => {
        return get().notifications.find((n) => n._id === id);
      },
    }),
    {
      name: "notification-storage", // localStorage key
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        // Only persist notifications, not computed values
        notifications: state.notifications,
      }),
      // Rehydrate unread count after loading from storage
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.unreadCount = state.notifications.filter((n) => !n.isRead).length;
        }
      },
    }
  )
);
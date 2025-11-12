/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';

// --- TYPE DEFINITIONS ---

export type NotificationType = 'ORDER_STATUS_UPDATE' | 'INVENTORY_ALERT' | 'INFO';

export interface Notification {
    id: string;
    type: NotificationType;
    title: string;
    message: string;
    timestamp: string;
    isRead: boolean;
    relatedId?: string; // e.g., orderId
}

export interface NotificationStore {
    notifications: Notification[];
    unreadCount: number;
    addNotification: (payload: any) => void;
    markAsRead: (id: string) => void;
    markAllAsRead: () => void;
    clearAll: () => void;
}

// Helper function to generate a unique ID
const generateId = () => Math.random().toString(36).substring(2, 9);

// --- ZUSTAND STORE DEFINITION ---

export const useNotificationStore = create<NotificationStore>((set,) => ({
    notifications: [],
    unreadCount: 0,

    // Maps raw WS payload to Notification structure and updates state
    addNotification: (data: any) => {
        let title: string;
        let message: string;
        let type: NotificationType;
        let relatedId: string | undefined;

        switch (data.type) {
            case 'ORDER_STATUS_UPDATE':
                type = 'ORDER_STATUS_UPDATE';
                title = `Order Status Update: #${String(data.orderId).slice(-4)}`;
                message = `Your order status changed to: ${String(data.status).toUpperCase()}`;
                relatedId = data.orderId;
                break;
            case 'INVENTORY_ALERT':
                type = 'INVENTORY_ALERT';
                title = `Urgent Inventory Alert!`;
                message = `🚨 ${data.alertCount} product(s) are running critically low on stock. Check the admin panel immediately.`;
                break;

            // --- ADD THIS NEW CASE ---
            case 'NEW_PRODUCT_CREATED':
                type = 'INFO'; // You can keep this as 'INFO' or add 'NEW_PRODUCT' to your types
                title = data.title;    // Use the title from the payload
                message = data.message; // Use the message from the payload
                relatedId = data.relatedId;
                break;
            // -------------------------

            default:
                type = 'INFO';
                title = 'New System Message';
                message = data.message || 'Received an unknown message from the server.';
        }

        const newNotification: Notification = {
            id: generateId(),
            type,
            title,
            message,
            timestamp: new Date().toISOString(),
            isRead: false,
            relatedId,
        };

        set((state) => {
            const newNotifications = [newNotification, ...state.notifications];
            // Keep only the last 50 notifications to prevent memory issues
            const limitedNotifications = newNotifications.slice(0, 50);
            return {
                notifications: limitedNotifications,
                // Only increment if the dropdown is currently closed (i.e., we're not actively viewing them)
                unreadCount: state.unreadCount + 1,
            };
        });
    },

    markAsRead: (id: string) => set((state) => {
        const notifications = state.notifications.map(n =>
            n.id === id && !n.isRead ? { ...n, isRead: true } : n
        );
        // Recalculate unread count
        const newUnreadCount = notifications.filter(n => !n.isRead).length;
        return { notifications, unreadCount: newUnreadCount };
    }),

    markAllAsRead: () => set((state) => ({
        notifications: state.notifications.map(n => ({ ...n, isRead: true })),
        unreadCount: 0,
    })),

    clearAll: () => set({ notifications: [], unreadCount: 0 }),
}));
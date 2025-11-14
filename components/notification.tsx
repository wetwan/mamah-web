// "use client";
// import React, { useState, useEffect } from "react";
// import { BellElectric, Check, CheckCircle, Loader, X } from "lucide-react";
// import { getNotify, acknowledgeNotification } from "@/src/api/product/route";
// import { useAuth } from "@/context/userStore";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import dayjs from "dayjs";
// import relativeTime from "dayjs/plugin/relativeTime";
// import { Notification, NotificationData } from "@/src/types/tpes";
// import { useNotificationStore } from "@/context/notificationStore";

// dayjs.extend(relativeTime);

// const useAckNotification = (token: string) => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: (id: string) => acknowledgeNotification(token, id),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["notifications"] });
//     },
//     onError: (error) => {
//       console.error("Failed to acknowledge notification:", error);
//     },
//   });
// };

// const Notifications = ({
//   setOpenCart,
//   notifyRef,
// }: {
//   setOpenCart: React.Dispatch<React.SetStateAction<boolean>>;
//   notifyRef: React.RefObject<null>;
// }) => {
//   const { token } = useAuth();
//   const [activeId, setActiveId] = useState<string | null>(null);

//   // Get notifications from both sources
//   const { notifications: realtimeNotifications, markAsRead } =
//     useNotificationStore();

//   // Fetch server notifications
//   const { data, isLoading, isError } = useQuery<NotificationData>({
//     queryKey: ["notify"],
//     queryFn: () => getNotify(token as string),
//     enabled: !!token,
//     refetchInterval: 30000, // Reduced from 2s to 30s since WebSocket handles real-time
//     refetchOnWindowFocus: true,
//   });

//   const { mutate: acknowledge, isPending } = useAckNotification(
//     token as string
//   );

//   // Merge server notifications with real-time notifications
//   const [mergedNotifications, setMergedNotifications] = useState<
//     Notification[]
//   >([]);

//   useEffect(() => {
//     const serverNotifications = data?.notifications || [];

//     // Create a map of notification IDs for deduplication
//     const notificationMap = new Map<string, Notification>();

//     // Add real-time notifications first (they're more recent)
//     realtimeNotifications.forEach((n) => {
//       notificationMap.set(n._id, n);
//     });

//     // Add server notifications (if not already present)
//     serverNotifications.forEach((n) => {
//       if (!notificationMap.has(n._id)) {
//         notificationMap.set(n._id, n);
//       }
//     });

//     // Convert map to array and sort by timestamp (newest first)
//     const merged = Array.from(notificationMap.values()).sort((a, b) => {
//       const dateA = new Date(a.timestamp || a.createdAt).getTime();
//       const dateB = new Date(b.timestamp || b.createdAt).getTime();
//       return dateB - dateA;
//     });

//     setMergedNotifications(merged);
//   }, [realtimeNotifications, data?.notifications]);

//   const handleAck = (id: string, isRead: boolean) => {
//     setActiveId(id);

//     // Mark as read in zustand store (for real-time notifications)
//     if (!isRead) {
//       markAsRead(id);
//     }

//     // Also acknowledge on server
//     acknowledge(id, {
//       onSettled: () => setActiveId(null),
//     });
//   };

//   if (isError) {
//     return (
//       <div
//         className="z-50 absolute md:right-6 md:top-28 shadow-2xl shadow-black/40 w-[350px] h-auto p-4 bg-gray-100 top-52 right-0 max-h-screen"
//         ref={notifyRef}
//       >
//         <div className="flex items-center mb-2 justify-between">
//           <h2 className="text-lg font-semibold">Your notifications</h2>
//           <X onClick={() => setOpenCart(false)} className="cursor-pointer" />
//         </div>
//         <p className="text-center text-red-500">Failed to load notifications</p>
//       </div>
//     );
//   }

//   // Calculate unread count from merged notifications
//   const unreadCount = mergedNotifications.filter((n) => !n.isRead).length;

//   return (
//     <div
//       className="z-50 absolute md:right-6 md:top-28 shadow-2xl shadow-black/40 w-[350px] h-auto p-4 bg-gray-100 top-52 right-0 max-h-[500px] overflow-hidden flex flex-col"
//       ref={notifyRef}
//     >
//       <div className="flex items-center mb-2 justify-between">
//         <div className="flex items-center gap-2">
//           <h2 className="text-lg font-semibold">Your notifications</h2>
//           {unreadCount > 0 && (
//             <span className="flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 rounded-full">
//               {unreadCount > 99 ? "99+" : unreadCount}
//             </span>
//           )}
//         </div>
//         <X
//           onClick={() => setOpenCart(false)}
//           className="cursor-pointer hover:text-red-600"
//         />
//       </div>

//       {mergedNotifications.length === 0 && !isLoading && (
//         <div className="p-4 text-center text-gray-500">
//           <div className="flex flex-col items-center justify-center py-8">
//             <BellElectric size={48} className="text-gray-300 mb-3" />
//             <p className="font-medium">No notifications yet</p>
//             <p className="text-xs mt-1">
//               We&apos;ll notify you when something arrives
//             </p>
//           </div>
//         </div>
//       )}

//       {isLoading && mergedNotifications.length === 0 && (
//         <div className="p-4 text-center text-gray-500">
//           <div className="flex justify-center gap-2 items-center">
//             <div className="w-4 h-4 border-2 border-pink-500 border-t-transparent rounded-full animate-spin" />
//             <span>Loading notifications...</span>
//           </div>
//         </div>
//       )}

//       {mergedNotifications.length > 0 && (
//         <div className="notification-dropdown overflow-y-auto flex-1 pr-2">
//           {mergedNotifications.map((n: Notification) => (
//             <div
//               key={n._id}
//               className={`mt-2 rounded-2xl border px-3 py-2 shadow-md hover:shadow-lg cursor-pointer transition-all ${
//                 !n.isRead
//                   ? "bg-blue-50 border-blue-200"
//                   : "bg-white border-gray-200"
//               }`}
//               onClick={() => handleAck(n._id, n.isRead)}
//             >
//               <div className="flex items-center justify-between mb-1">
//                 <div className="flex gap-3 items-center">
//                   <BellElectric
//                     size={20}
//                     className={!n.isRead ? "text-blue-600" : "text-gray-600"}
//                   />
//                   <strong className="text-sm">
//                     {n.type.replace(/_/g, " ")}
//                   </strong>
//                 </div>
//                 <div
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     handleAck(n._id, n.isRead);
//                   }}
//                 >
//                   {!n.isRead ? (
//                     <Check size={20} className="text-pink-600" />
//                   ) : activeId === n._id && isPending ? (
//                     <Loader size={20} className="animate-spin text-pink-600" />
//                   ) : (
//                     <CheckCircle size={20} className="text-pink-600" />
//                   )}
//                 </div>
//               </div>
//               {n.title && (
//                 <p className="uppercase text-xs text-gray-500 font-semibold">
//                   {n.title.toLowerCase()}
//                 </p>
//               )}
//               <p className="uppercase text-gray-500 text-xs">
//                 {n.message.toLowerCase()}
//               </p>
//               <small className="text-pink-600 place-items-end w-full flex justify-end text-xs">
//                 {(() => {
//                   const txt = dayjs(n.createdAt || n.timestamp).fromNow();
//                   return txt
//                     ? txt.charAt(0).toUpperCase() + txt.slice(1)
//                     : "N/A";
//                 })()}
//               </small>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Notifications;

"use client";
import React, { useState, useEffect } from "react";
import { BellElectric, Check, CheckCircle, Loader, X } from "lucide-react";
import { getNotify, acknowledgeNotification } from "@/src/api/product/route";
import { useAuth } from "@/context/userStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Notification, NotificationData } from "@/src/types/tpes";
import { useNotificationStore } from "@/context/notificationStore";

dayjs.extend(relativeTime);

// -----------------------------
// Mutation Hook
// -----------------------------
const useAckNotification = (token: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => acknowledgeNotification(token, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: (err) => {
      console.error("Failed to acknowledge notification:", err);
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
  const { token } = useAuth();
  const [activeId, setActiveId] = useState<string | null>(null);

  // Zustand notifications
  const { notifications: realtimeNotifications, markAsRead } =
    useNotificationStore();

  // Fetch server notifications
  const { data, isLoading, isError } = useQuery<NotificationData>({
    queryKey: ["notifications"], // FIXED
    queryFn: () => getNotify(token as string),
    enabled: !!token,
    refetchInterval: 30000,
    refetchOnWindowFocus: true,
  });

  const { mutate: acknowledge, isPending } = useAckNotification(
    token as string
  );

  // Merge notifications
  const [mergedNotifications, setMergedNotifications] = useState<
    Notification[]
  >([]);

  useEffect(() => {
    const server = data?.notifications || [];
    const map = new Map<string, Notification>();

    realtimeNotifications.forEach((n) => map.set(n._id, n));
    server.forEach((n) => {
      if (!map.has(n._id)) map.set(n._id, n);
    });

    const merged = Array.from(map.values()).sort((a, b) => {
      const A = new Date(a.timestamp || a.createdAt).getTime();
      const B = new Date(b.timestamp || b.createdAt).getTime();
      return B - A;
    });

    setMergedNotifications(merged);
  }, [realtimeNotifications, data?.notifications]);

  // --------------------------------------
  // Acknowledge
  // --------------------------------------
  const handleAck = (id: string, isRead: boolean) => {
    setActiveId(id);

    if (!isRead) {
      markAsRead(id);
    }

    acknowledge(id, {
      onSettled: () => setActiveId(null),
    });
  };

  // unread count
  const unreadCount = mergedNotifications.filter((n) => !n.isRead).length;

  // --------------------------------------
  // Render
  // --------------------------------------
  if (isError) {
    return (
      <div
        className="z-50 absolute md:right-6 md:top-28 shadow-2xl shadow-black/40 w-[350px] h-auto p-4 bg-gray-100 top-52 right-0 max-h-screen"
        ref={notifyRef}
      >
        <div className="flex items-center mb-2 justify-between">
          <h2 className="text-lg font-semibold">Your notifications</h2>
          <X onClick={() => setOpenCart(false)} className="cursor-pointer" />
        </div>
        <p className="text-center text-red-500">Failed to load notifications</p>
      </div>
    );
  }

  return (
    <div
      className="z-50 absolute md:right-6 md:top-28 shadow-2xl shadow-black/40 w-[350px] h-auto p-4 bg-gray-100 top-52 right-0 max-h-[500px] overflow-hidden flex flex-col"
      ref={notifyRef}
    >
      <div className="flex items-center mb-2 justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">Your notifications</h2>

          {unreadCount > 0 && (
            <span className="flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 rounded-full">
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
        </div>

        <X
          onClick={() => setOpenCart(false)}
          className="cursor-pointer hover:text-red-600"
        />
      </div>

      {/* Empty */}
      {!isLoading && mergedNotifications.length === 0 && (
        <div className="p-4 text-center text-gray-500">
          <div className="flex flex-col items-center justify-center py-8">
            <BellElectric size={48} className="text-gray-300 mb-3" />
            <p className="font-medium">No notifications yet</p>
            <p className="text-xs mt-1">
              We’ll notify you when something arrives
            </p>
          </div>
        </div>
      )}

      {/* Loading */}
      {isLoading && mergedNotifications.length === 0 && (
        <div className="p-4 text-center text-gray-500">
          <div className="flex justify-center gap-2 items-center">
            <div className="w-4 h-4 border-2 border-pink-500 border-t-transparent rounded-full animate-spin" />
            <span>Loading notifications...</span>
          </div>
        </div>
      )}

      {/* List */}
      {mergedNotifications.length > 0 && (
        <div className="notification-dropdown overflow-y-auto flex-1 pr-2">
          {mergedNotifications.map((n) => (
            <div
              key={n._id}
              className={`mt-2 rounded-2xl border px-3 py-2 shadow-md hover:shadow-lg cursor-pointer transition-all ${
                !n.isRead
                  ? "bg-blue-50 border-blue-200"
                  : "bg-white border-gray-200"
              }`}
              onClick={() => handleAck(n._id, n.isRead)}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex gap-3 items-center">
                  <BellElectric
                    size={20}
                    className={!n.isRead ? "text-blue-600" : "text-gray-600"}
                  />
                  <strong className="text-sm">
                    {n.type.replace(/_/g, " ")}
                  </strong>
                </div>

                {/* Ack icon */}
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAck(n._id, n.isRead);
                  }}
                >
                  {activeId === n._id && isPending ? (
                    <Loader size={20} className="animate-spin text-pink-600" />
                  ) : !n.isRead ? (
                    <Check size={20} className="text-pink-600" />
                  ) : (
                    <CheckCircle size={20} className="text-pink-600" />
                  )}
                </div>
              </div>

              {n.title && (
                <p className="uppercase text-xs text-gray-500 font-semibold">
                  {n.title.toLowerCase()}
                </p>
              )}

              <p className="uppercase text-gray-500 text-xs">
                {n.message.toLowerCase()}
              </p>

              <small className="text-pink-600 w-full flex justify-end text-xs">
                {dayjs(n.createdAt || n.timestamp).fromNow()}
              </small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;

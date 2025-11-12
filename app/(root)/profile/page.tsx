"use client";
export const dynamic = "force-dynamic";

import { useNotificationStore } from "@/context/notificationStore";
import Link from "next/link";
import React from "react";

const Profile = () => {
  const notifications = useNotificationStore((state) => state.notifications);
  const markAsRead = useNotificationStore((state) => state.markAsRead);
  return (
    <div>
      <div className="w-full  py-6 bg-[#f8f9fa] md:px-8 lg:px-16 xl:32 2xl:px-64   capitalize flex items-center gap-2 px-4 font-medium">
        <Link href={"/"} className="text-[#7971ea]">
          home
        </Link>
        / <p>profile</p>
      </div>

      <div className="notification-dropdown">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`notification-item ${n.isRead ? "read" : "unread"}`}
            onClick={() => markAsRead(n.id)}
          >
            <strong>{n.title}</strong>
            <p>{n.message}</p>
            <small>{new Date(n.timestamp).toLocaleTimeString()}</small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;


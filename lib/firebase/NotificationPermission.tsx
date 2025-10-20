"use client";
import { useEffect } from "react";
import { requestNotificationPermission } from "@/lib/firebase/requestNotificationPermission";

const NotificationPermission = () => {
  useEffect(() => {
    const subscribeUser = async () => {
      await requestNotificationPermission();
    };

    subscribeUser();
  }, []);

  return null; // No UI, just runs logic
};

export default NotificationPermission;

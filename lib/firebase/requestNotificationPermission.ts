// Purpose: Request notification permission, retrieve FCM token and save it
import { getToken, messaging, onMessage } from "./firebaseConfig";
import { saveFcmToken } from "./saveFcmToken";

export const requestNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission(); // Request notification permission

    if (permission !== "granted") {
      console.warn("Notification permission denied.");
      return;
    }

    // Register the service worker from firebase-messaging-sw.js
    const registration = await navigator.serviceWorker.register(
      "/firebase-messaging-sw.js"
    );
    if (!registration) {
      return;
    }

    // Request FCM token for the browser/device & link to the service worker
    const token = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
      serviceWorkerRegistration: registration, // Link to service worker, allowing FCM to deliver notifications properly
    });

    if (!token) {
      console.warn("Failed to retrieve FCM token.");
      return;
    }

    // Save the token to supabase
    const res = await saveFcmToken(token);
    if (!res.success) {
      console.error("Error saving token:", res.error);
      return;
    }

    // ✅ listener de mensagens em foreground
    onMessage(messaging, (payload) => {
      const title = payload.notification?.title;
      const body = payload.notification?.body;
      if (Notification.permission === "granted" && title && body) {
        new Notification(title, {
          body,
          icon: "https://ipcatole.org.br/favicon/android-chrome-192x192.png", // opcional: ícone da notificação
        });
      }
    });
  } catch (error) {
    console.error("Error requesting permission:", error);
  }
};

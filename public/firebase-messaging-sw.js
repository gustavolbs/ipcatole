// Purpose: Handle incoming push notifications with firebase

importScripts(
  "https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging-compat.js"
);

// Firebase config (placeholders replaced at build time)
firebase.initializeApp({
  apiKey: "AIzaSyB5e7eg2P0XevjwVFfCt1fiRC25nGKrHfc",
  authDomain: "ipcatole.firebaseapp.com",
  projectId: "ipcatole",
  storageBucket: "ipcatole.firebasestorage.app",
  messagingSenderId: "421725837653",
  appId: "1:421725837653:web:1b7c71eec811e72ad0f7dc",
  // measurementId: "G-FK2H27N0P2",
});

// Initialize FCM to enable this(sw) to receive push notifications from firebase servers
const messaging = firebase.messaging();

// Listen to background messages from firebase servers
messaging.onBackgroundMessage((payload) => {
  // Extract the required details from the payload
  const notificationTitle = payload.notification?.title || "Notification";
  const notificationOptions = {
    body:
      payload.notification?.body ||
      "You have a new message. Please check it out",
    icon: "/favicon/logo.webp" || payload.notification?.icon,
    // icon: "https://ipcatole.org.br/favicon/android-chrome-192x192.png",
    data: { url: payload.fcmOptions?.link || "/" }, // The notification will redirect to the homepage("/") when clicked. Fell free to redirect to whatever page you want to.
  };

  // Display push notification
  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification click events
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const targetUrl = event.notification.data?.url || "/";

  event.waitUntil(
    clients
      .matchAll({
        type: "window",
        includeUncontrolled: true,
      }) /* Get all open browser tabs controlled by this service worker */
      .then((clientList) => {
        // Loop through each open tab/window
        for (const client of clientList) {
          if (client.url.includes(targetUrl) && "focus" in client) {
            return client.focus(); // If a matching tab exists, bring it to the front
          }
        }
        // If no matching tab is found, open a new one
        return clients.openWindow(targetUrl);
      })
  );
});

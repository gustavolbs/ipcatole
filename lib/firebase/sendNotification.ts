import admin from "./firebaseAdmin";

// Purpose: Send push notification when an event occurs in Supabase
export const sendNotification = async (
  title: string,
  body: string,
  recipients: string[]
) => {
  try {
    const response = await admin.messaging().sendEachForMulticast({
      tokens: recipients,
      notification: { title, body },
    });

    if (response.failureCount > 0) {
      response.responses.forEach((res, index) => {
        if (
          !res.success &&
          res.error?.code === "messaging/registration-token-not-registered"
        ) {
          console.warn(`Invalid token found: ${recipients[index]}`);
        }
      });
    }
  } catch (error) {
    console.error("Error sending notifications:", error);
  }
};

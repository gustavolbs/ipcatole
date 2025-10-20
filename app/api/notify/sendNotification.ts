export const sendNotification = async (
  topic: string,
  title: string,
  message: string
) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/notify`, {
    method: "POST",
    body: JSON.stringify({ topic, title, message }),
  });
  if (!res.ok) {
    throw new Error("Erro ao enviar notificação");
  }
  return res.json();
};

import { Role } from "@/lib/supabase/roles";

export const sendEmail = async (
  topic: Role | "none",
  title: string,
  message: string,
  destination?: string
) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/sendEmail`, {
    method: "POST",
    body: JSON.stringify({ topic, title, message, destination }),
  });
  if (!res.ok) {
    throw new Error("Erro ao enviar notificação");
  }
  return res.json();
};

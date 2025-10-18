import { PrayerRequest } from "@/app/(protected)/pedidos-oracao/page";
import { revalidateTag } from "@/lib/revalidateTag";

export const postPrayerRequests = async (request: PrayerRequest) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/pedidos`, {
    method: "POST",
    body: JSON.stringify(request),
  });
  if (!res.ok) {
    throw new Error("Erro ao criar pedidos de oração");
  }
  revalidateTag("prayer-requests");
  return res.json();
};

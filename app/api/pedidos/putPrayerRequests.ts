import { PrayerRequest } from "@/app/(protected)/pedidos-oracao/page";
import { revalidateTag } from "@/lib/revalidateTag";

export const putPrayerRequests = async (request: PrayerRequest) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/pedidos`, {
    method: "PUT",
    body: JSON.stringify(request),
  });
  if (!res.ok) {
    throw new Error("Erro ao atualizar pedidos de oração");
  }
  revalidateTag("prayer-requests");
  return res.json();
};

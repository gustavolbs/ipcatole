import { PrayerRequest } from "@/app/(protected)/pedidos-oracao/page";
import { revalidateTag } from "@/lib/revalidateTag";

export const deletePrayerRequests = async (request: PrayerRequest) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/pedidos?id=${request._id}`,
    {
      method: "DELETE",
    }
  );
  if (!res.ok) {
    throw new Error("Erro ao deletar pedidos de oração");
  }
  revalidateTag("prayer-requests");
  return res.json();
};

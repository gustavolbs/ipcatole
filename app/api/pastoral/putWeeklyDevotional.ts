import { Devotional } from "@/app/(non-protected)/(home)/_components";
import { revalidateTag } from "@/lib/revalidateTag";

export const putWeeklyDevotional = async (devotional: Devotional) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/pastoral`, {
    method: "PUT",
    body: JSON.stringify(devotional),
  });
  if (!res.ok) {
    throw new Error("Erro ao atualizar devocional semanal");
  }
  revalidateTag("weekly-devotional");
  return res.json();
};

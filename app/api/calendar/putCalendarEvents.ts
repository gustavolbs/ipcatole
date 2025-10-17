import { revalidateTag } from "@/lib/revalidateTag";
import { Event } from "@/app/(protected)/midia/_components/Calendar";

export const putCalendarEvents = async (events: Event[]) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/calendar`, {
    method: "PUT",
    body: JSON.stringify(events),
  });
  if (!res.ok) {
    throw new Error("Erro ao atualizar eventos");
  }
  revalidateTag("weekly-calendar");
  return res.json();
};

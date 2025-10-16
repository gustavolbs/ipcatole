export const getCalendarEvents = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/calendar`, {
    cache: "force-cache",
    next: {
      tags: ["weekly-calendar"],
    },
  });
  if (!res.ok) {
    throw new Error("Erro ao buscar eventos");
  }
  return res.json();
};

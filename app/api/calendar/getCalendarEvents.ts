export const getBirthdays = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/calendar`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Erro ao buscar eventos");
  }
  return res.json();
};

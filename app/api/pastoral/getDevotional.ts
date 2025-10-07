export const getDevotional = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/pastoral`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Erro ao buscar devocional");
  }
  return res.json();
};

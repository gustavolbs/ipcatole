export const getPrayerRequests = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/pedidos`, {
    cache: "force-cache",
    next: {
      tags: ["prayer-requests"],
    },
  });
  if (!res.ok) {
    throw new Error("Erro ao buscar pedidos de oração");
  }
  return res.json();
};

export const getNotices = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/notices`, {
    cache: "force-cache",
    next: {
      tags: ["weekly-notices"],
    },
  });
  if (!res.ok) {
    throw new Error("Erro ao buscar avisos");
  }
  return res.json();
};

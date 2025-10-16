export const getCampaign = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/campaign`, {
    cache: "force-cache",
    next: {
      tags: ["active-campaign"],
    },
  });
  if (!res.ok) {
    throw new Error("Erro ao buscar campanhas");
  }
  return res.json();
};

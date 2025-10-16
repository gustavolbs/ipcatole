export const getBirthdays = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/birthdays`, {
    cache: "force-cache",
    next: {
      tags: ["weekly-birthdays"],
    },
  });
  if (!res.ok) {
    throw new Error("Erro ao buscar aniversários");
  }
  return res.json();
};

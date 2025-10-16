export const getWeeklyQuestion = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/catecismo/semanal`,
    {
      cache: "force-cache",
      next: {
        tags: ["weekly-question"],
      },
    }
  );
  if (!res.ok) {
    throw new Error("Erro ao buscar pergunta semanal");
  }
  return res.json();
};

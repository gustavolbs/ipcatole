import { revalidateTag } from "@/lib/revalidateTag";

export const putWeeklyQuestion = async (question: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/catecismo/semanal`,
    {
      method: "PUT",
      body: JSON.stringify({ question }),
    }
  );
  if (!res.ok) {
    throw new Error("Erro ao atualizar pergunta semanal");
  }
  revalidateTag("weekly-question");
  return res.json();
};

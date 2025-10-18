import { Member } from "@/app/(protected)/membros/page";
import { revalidateTag } from "@/lib/revalidateTag";

export const putMember = async (member: Member) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/membros`, {
    method: "PUT",
    body: JSON.stringify(member),
  });

  if (!res.ok) throw new Error("Erro ao atualizar membro");
  revalidateTag("members");
  revalidateTag("aniversariantes");
  return res.json();
};

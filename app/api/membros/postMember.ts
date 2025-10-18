import { Member } from "@/app/(protected)/membros/page";
import { revalidateTag } from "@/lib/revalidateTag";

export const postMember = async (member: Member) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/membros`, {
    method: "POST",
    body: JSON.stringify(member),
  });

  if (!res.ok) throw new Error("Erro ao criar membro");
  revalidateTag("members");
  revalidateTag("aniversariantes");
  return res.json();
};

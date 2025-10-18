import { Member } from "@/app/(protected)/membros/page";
import { revalidateTag } from "@/lib/revalidateTag";

export const deleteMember = async (member: Member) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/membros?id=${member._id}`,
    {
      method: "DELETE",
    }
  );

  if (!res.ok) throw new Error("Erro ao deletar membro");

  revalidateTag("members");
  revalidateTag("aniversariantes");
  return res.json();
};

import { Notice } from "@/app/(non-protected)/(home)/_components";
import { revalidateTag } from "@/lib/revalidateTag";

export const putNotices = async (notices: Notice[]) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/notices`, {
    method: "PUT",
    body: JSON.stringify(notices),
  });
  if (!res.ok) {
    throw new Error("Erro ao atualizar avisos");
  }
  revalidateTag("weekly-notices");
  return res.json();
};

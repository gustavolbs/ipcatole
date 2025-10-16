import { type ImageSchema } from "@/app/(non-protected)/(home)/_components";
import { revalidateTag } from "@/lib/revalidateTag";

export const putGalleryFeed = async (feed: ImageSchema[]) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/gallery`, {
    method: "PUT",
    body: JSON.stringify(feed),
  });
  if (!res.ok) {
    throw new Error("Erro ao atualizar galeria");
  }
  revalidateTag("gallery-feed");
  return res.json();
};

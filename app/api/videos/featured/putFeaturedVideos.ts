import { FeaturedVideo } from "@/app/(non-protected)/(home)/_components";
import { revalidateTag } from "@/lib/revalidateTag";

export const putFeaturedVideos = async (videos: FeaturedVideo[]) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/videos/featured`,
    {
      method: "PUT",
      body: JSON.stringify(videos),
    }
  );
  if (!res.ok) {
    throw new Error("Erro ao atualizar vídeos em destaque");
  }
  revalidateTag("featured-videos");
  return res.json();
};

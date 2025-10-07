export const getFeaturedVideos = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/videos/featured`,
    { cache: "no-store" }
  );
  if (!res.ok) {
    throw new Error("Erro ao buscar vídeos em destaque");
  }
  return res.json();
};

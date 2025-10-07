export const getGalleryFeed = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/gallery`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Erro ao buscar galeria");
  }
  return res.json();
};

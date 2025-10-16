export const getGalleryFeed = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/gallery`, {
    cache: "force-cache",
    next: {
      tags: ["gallery-feed"],
    },
  });
  if (!res.ok) {
    throw new Error("Erro ao buscar galeria");
  }
  return res.json();
};

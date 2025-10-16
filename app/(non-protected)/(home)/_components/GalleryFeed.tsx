import Image from "next/image";

export type ImageSchema = {
  link: string;
  description: string;
  _id: string;
};

export const GalleryFeed = ({ feed }: { feed: ImageSchema[] }) => {
  return (
    <section>
      <h2 className="text-3xl font-bold mb-6">Galeria</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {feed.map((item) => (
          <div
            key={item._id}
            className="group relative aspect-square bg-muted rounded-lg overflow-hidden shadow-card hover:shadow-elegant transition-all cursor-pointer"
          >
            <Image
              src={item.link}
              alt={item.description}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              width={380}
              height={380}
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <p className="text-white font-medium text-center px-2">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

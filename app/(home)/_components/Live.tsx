import { YouTubeVideo } from "@/lib/youtube";

export const Live = ({ video }: { video: YouTubeVideo }) => {
  return (
    <section className="relative gradient-hero text-white py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 animate-fade-in">
            {video.isLive ? "🔴 Transmissão ao vivo" : "Último vídeo"}
          </h2>
          <div className="aspect-video rounded-xl overflow-hidden shadow-elegant animate-slide-up">
            <iframe
              width="100%"
              height="100%"
              src={video.embedUrl}
              title="Transmissão ao Vivo"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

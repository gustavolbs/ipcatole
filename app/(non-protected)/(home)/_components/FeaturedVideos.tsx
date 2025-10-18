import React from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Video } from "lucide-react";

export type FeaturedVideo = {
  title: string;
  link: string;
  _id: string;
};

export const FeaturedVideos: React.FC<{ videos: FeaturedVideo[] }> = ({
  videos,
}) => {
  return (
    <section className="animate-fade-in">
      <div className="flex items-center gap-2 mb-6">
        <Video className="h-6 w-6 text-primary" />
        <h2 className="text-3xl font-bold">Destaques</h2>
      </div>

      {/* Scrollable container */}
      <div className="flex gap-4 overflow-x-auto scroll-smooth pb-4 snap-x snap-mandatory sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 sm:overflow-visible">
        {videos?.map((video) => {
          const id = video.link.substr(video.link.indexOf("=") + 1);
          return (
            <Card
              key={video._id}
              className="flex-shrink-0 snap-start w-[85%] sm:w-auto overflow-hidden shadow-card hover:shadow-elegant transition-shadow"
            >
              <div className="aspect-video bg-black max-h-48 mx-auto">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://youtube.com/embed/${id}?controls=1&autoplay=0`}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <CardHeader className="py-1 px-2 text-center mx-auto max-w-[90%]">
                <CardTitle
                  className="text-sm md:text-base truncate"
                  title={video.title}
                >
                  {video.title}
                </CardTitle>
              </CardHeader>
            </Card>
          );
        })}
      </div>
    </section>
  );
};

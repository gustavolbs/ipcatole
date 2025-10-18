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
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {videos?.map((video) => {
          const link = video.link;
          const id = link.substr(link.indexOf("=") + 1);
          return (
            <Card
              key={video.link}
              className="overflow-hidden shadow-card hover:shadow-elegant transition-shadow"
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
                <CardTitle className="text-md truncate" title={video.title}>
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

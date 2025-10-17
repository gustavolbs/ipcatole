"use client";
import { type FeaturedVideo } from "@/app/(non-protected)/(home)/_components";
import { getFeaturedVideos, putFeaturedVideos } from "@/app/api";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const FeaturedVideos = () => {
  const [videos, setVideos] = useState<FeaturedVideo[]>([]);
  const [loading, setLoading] = useState(true);

  const handleSaveVideos = async () => {
    try {
      await putFeaturedVideos(videos);
      toast.success("Vídeos em destaque salvos com sucesso!");
    } catch (error) {
      toast.error("Erro ao salvar vídeos em destaque");
    }
  };

  const handleAddVideo = () => {
    const newVideo: FeaturedVideo = {
      _id: Date.now().toString(),
      title: "",
      link: "",
    };
    setVideos([...videos, newVideo]);
  };

  const handleRemoveVideo = (id: string) => {
    setVideos(videos.filter((v) => v._id !== id));
  };

  const handleVideoChange = (
    id: string,
    field: "title" | "link",
    value: string
  ) => {
    setVideos(videos.map((v) => (v._id === id ? { ...v, [field]: value } : v)));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getFeaturedVideos();
        setVideos(data);
      } catch (error) {
        console.error("Erro ao carregar vídeos em destaque:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Vídeos em Destaque</CardTitle>
        <CardDescription>
          Gerencie os vídeos que aparecem na página inicial
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {videos.map((video, index) => (
          <div
            key={video._id}
            className="space-y-3 p-4 border border-border rounded-lg"
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-sm text-muted-foreground">
                Vídeo {index + 1}
              </h4>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleRemoveVideo(video._id)}
                disabled={videos.length === 1}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor={`video-title-${video._id}`}>Título</Label>
              <Input
                id={`video-title-${video._id}`}
                placeholder="Título do vídeo"
                value={video.title}
                onChange={(e) =>
                  handleVideoChange(video._id, "title", e.target.value)
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`video-url-${video._id}`}>Link do YouTube</Label>
              <Input
                id={`video-url-${video._id}`}
                placeholder="https://www.youtube.com/watch?v=..."
                value={video.link}
                onChange={(e) =>
                  handleVideoChange(video._id, "link", e.target.value)
                }
              />
            </div>
          </div>
        ))}

        <div className="flex flex-col md:flex-row gap-2">
          <Button onClick={handleAddVideo} variant="outline" className="flex-1">
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Vídeo
          </Button>
          <Button
            onClick={handleSaveVideos}
            disabled={!videos.length || loading}
            className="flex-1"
          >
            Salvar Todos os Vídeos
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

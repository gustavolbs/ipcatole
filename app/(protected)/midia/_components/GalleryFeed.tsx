"use client";
import { type ImageSchema } from "@/app/(non-protected)/(home)/_components";
import { getGalleryFeed, putGalleryFeed } from "@/app/api";
import Image from "next/image";
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
import { Trash2, Plus, ImageIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { images } from "@/lib/imageUpload";

export const GalleryFeed = () => {
  const [gallery, setGallery] = useState<ImageSchema[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState<string | null>(null);

  const handleSaveGallery = async () => {
    try {
      await putGalleryFeed(gallery);
      toast.success("Galeria salva com sucesso!");
    } catch (error) {
      toast.error("Erro ao salvar galeria");
    }
  };

  const handleAddImage = () => {
    const newImage: ImageSchema = {
      _id: Date.now().toString(),
      description: "",
      link: "",
    };
    setGallery([...gallery, newImage]);
  };

  const handleRemoveImage = (id: string) => {
    setGallery(gallery.filter((n) => n._id !== id));
  };

  const handleImageChange = (
    id: string,
    field: keyof ImageSchema,
    value: string
  ) => {
    setGallery((prev) =>
      prev.map((n) => (n._id === id ? { ...n, [field]: value } : n))
    );
  };

  const handleUploadImage = async (id: string, file: File) => {
    try {
      setUploading(id);
      const response = await images.upload(file);
      const imageUrl = response?.data?.url;

      if (imageUrl) {
        handleImageChange(id, "link", imageUrl);
        toast.success("Imagem enviada com sucesso!");
      }
    } catch {
      toast.error("Falha ao enviar imagem");
    } finally {
      setUploading(null);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getGalleryFeed();
        setGallery(data);
      } catch (error) {
        console.error("Erro ao carregar galeria:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Galeria/Mural</CardTitle>
        <CardDescription>
          Gerencie as imagens que aparecem na galeria
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {gallery.map((image, index) => (
          <div
            key={image._id}
            className="space-y-3 p-4 border border-border rounded-lg"
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-sm text-muted-foreground">
                Imagem {index + 1}
              </h4>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleRemoveImage(image._id)}
                disabled={gallery.length === 1}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              {/* IMAGEM */}
              <div className="w-full md:w-1/3 flex flex-col gap-2">
                <Label htmlFor={`gallery-image-${image._id}`}>Imagem</Label>

                {image.link ? (
                  <div className="relative w-full aspect-square rounded-lg overflow-hidden border">
                    <Image
                      src={image.link}
                      alt={image.description || "Imagem da galeria"}
                      fill
                      className="object-cover"
                    />
                    <Button
                      type="button"
                      size="icon"
                      variant="secondary"
                      className="absolute top-2 right-2"
                      onClick={() => handleImageChange(image._id, "link", "")}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center border border-dashed rounded-lg py-6">
                    <ImageIcon className="h-8 w-8 text-muted-foreground mb-2" />
                    <Label
                      htmlFor={`file-upload-${image._id}`}
                      className="cursor-pointer text-sm text-blue-500 hover:underline"
                    >
                      Escolher imagem
                    </Label>
                    <Input
                      id={`file-upload-${image._id}`}
                      type="file"
                      accept="image/png, image/jpeg"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleUploadImage(image._id, file);
                      }}
                      disabled={uploading === image._id}
                    />
                  </div>
                )}
              </div>

              {/* CAMPOS */}
              <div className="flex-1 flex flex-col gap-2">
                <div className="space-y-2">
                  <Label htmlFor={`gallery-description-${image._id}`}>
                    Descrição
                  </Label>
                  <Input
                    id={`gallery-description-${image._id}`}
                    placeholder="Descrição da imagem"
                    value={image.description}
                    onChange={(e) =>
                      handleImageChange(
                        image._id,
                        "description",
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="flex flex-col md:flex-row gap-2">
          <Button onClick={handleAddImage} variant="outline" className="flex-1">
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Imagem
          </Button>
          <Button
            onClick={handleSaveGallery}
            disabled={!gallery.length || loading}
            className="flex-1"
          >
            Salvar Todas as Imagens
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

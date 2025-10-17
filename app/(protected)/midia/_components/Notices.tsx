"use client";
import { type Notice } from "@/app/(non-protected)/(home)/_components";
import { getNotices, putNotices } from "@/app/api";
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
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Plus, ImageIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { images } from "@/lib/imageUpload";

export const Notices = () => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState<string | null>(null);

  const handleSaveNotices = async () => {
    try {
      await putNotices(notices);
      toast.success("Avisos salvos com sucesso!");
    } catch (error) {
      toast.error("Erro ao salvar avisos");
    }
  };

  const handleAddNotice = () => {
    const newNotice: Notice = {
      _id: Date.now().toString(),
      title: "",
      description: "",
      link: "",
      image: "",
    };
    setNotices([...notices, newNotice]);
  };

  const handleRemoveNotice = (id: string) => {
    setNotices(notices.filter((n) => n._id !== id));
  };

  const handleNoticeChange = (
    id: string,
    field: keyof Notice,
    value: string
  ) => {
    setNotices((prev) =>
      prev.map((n) => (n._id === id ? { ...n, [field]: value } : n))
    );
  };

  const handleUploadImage = async (id: string, file: File) => {
    try {
      setUploading(id);
      const response = await images.upload(file);
      const imageUrl = response?.data?.url;

      if (imageUrl) {
        handleNoticeChange(id, "image", imageUrl);
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
        const data = await getNotices();
        setNotices(data);
      } catch (error) {
        console.error("Erro ao carregar avisos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Avisos</CardTitle>
        <CardDescription>
          Gerencie os avisos que aparecem na página inicial
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {notices.map((notice, index) => (
          <div
            key={notice._id}
            className="space-y-3 p-4 border border-border rounded-lg"
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-sm text-muted-foreground">
                Aviso {index + 1}
              </h4>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleRemoveNotice(notice._id)}
                disabled={notices.length === 1}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              {/* IMAGEM */}
              <div className="w-full md:w-1/3 flex flex-col gap-2">
                <Label htmlFor={`notice-image-${notice._id}`}>Imagem</Label>

                {notice.image ? (
                  <div className="relative w-full aspect-square rounded-lg overflow-hidden border">
                    <Image
                      src={notice.image}
                      alt={notice.title || "Imagem do aviso"}
                      fill
                      className="object-cover"
                    />
                    <Button
                      type="button"
                      size="icon"
                      variant="secondary"
                      className="absolute top-2 right-2"
                      onClick={() =>
                        handleNoticeChange(notice._id, "image", "")
                      }
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center border border-dashed rounded-lg py-6">
                    <ImageIcon className="h-8 w-8 text-muted-foreground mb-2" />
                    <Label
                      htmlFor={`file-upload-${notice._id}`}
                      className="cursor-pointer text-sm text-blue-500 hover:underline"
                    >
                      Escolher imagem
                    </Label>
                    <Input
                      id={`file-upload-${notice._id}`}
                      type="file"
                      accept="image/png, image/jpeg"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleUploadImage(notice._id, file);
                      }}
                      disabled={uploading === notice._id}
                    />
                  </div>
                )}
              </div>

              {/* CAMPOS */}
              <div className="flex-1 flex flex-col gap-2">
                <div className="space-y-2">
                  <Label htmlFor={`notice-title-${notice._id}`}>Título</Label>
                  <Input
                    id={`notice-title-${notice._id}`}
                    placeholder="Título do aviso"
                    value={notice.title}
                    onChange={(e) =>
                      handleNoticeChange(notice._id, "title", e.target.value)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`notice-desc-${notice._id}`}>
                    Texto do Aviso
                  </Label>
                  <Textarea
                    id={`notice-desc-${notice._id}`}
                    placeholder="Digite o texto do aviso"
                    value={notice.description}
                    onChange={(e) =>
                      handleNoticeChange(
                        notice._id,
                        "description",
                        e.target.value
                      )
                    }
                    rows={5}
                    className="resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`notice-link-${notice._id}`}>
                    Link externo (opcional)
                  </Label>
                  <Input
                    id={`notice-link-${notice._id}`}
                    placeholder="Deixe em branco caso não haja"
                    value={notice.link}
                    onChange={(e) =>
                      handleNoticeChange(notice._id, "link", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="flex flex-col md:flex-row gap-2">
          <Button
            onClick={handleAddNotice}
            variant="outline"
            className="flex-1"
          >
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Aviso
          </Button>
          <Button
            onClick={handleSaveNotices}
            disabled={!notices.length || loading}
            className="flex-1"
          >
            Salvar Todos os Avisos
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

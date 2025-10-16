"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { getDevotional, putWeeklyDevotional } from "@/app/api";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { Devotional as DevotionalType } from "@/app/(non-protected)/(home)/_components/Devotional";

export const Devotional = () => {
  const [loading, setLoading] = useState(true);
  const [devotional, setDevotional] = useState<DevotionalType>(
    {} as DevotionalType
  );

  // Busca inicial — carrega o devocional já salvo no banco
  useEffect(() => {
    const fetchWeeklyDevotional = async () => {
      try {
        const data = await getDevotional();
        setDevotional(data);
      } catch (error) {
        console.error("Erro ao carregar devocional semanal:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeeklyDevotional();
  }, []);

  const handleSaveDevotional = async () => {
    try {
      await putWeeklyDevotional(devotional);
      toast.success("Devocional salvo com sucesso!");
    } catch (error) {
      toast.error("Erro ao salvar devocional");
    }
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Devocional do Dia</CardTitle>
        <CardDescription>
          Configure o devocional que aparecerá na página inicial
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="devotional-title">Título</Label>
          <Input
            id="devotional-title"
            placeholder="Título do devocional"
            value={devotional.title}
            onChange={(e) =>
              setDevotional({ ...devotional, title: e.target.value })
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="devotional-author">Autor</Label>
          <Input
            id="devotional-author"
            placeholder="Nome do autor"
            value={devotional.author}
            onChange={(e) =>
              setDevotional({ ...devotional, author: e.target.value })
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="devotional-text">Texto da Pastoral</Label>
          <Textarea
            id="devotional-text"
            placeholder="Digite o texto do devocional"
            value={devotional.description}
            onChange={(e) =>
              setDevotional({ ...devotional, description: e.target.value })
            }
            rows={8}
            className="resize-none"
          />
        </div>

        <Button
          onClick={handleSaveDevotional}
          className="w-full sm:w-auto"
          disabled={!devotional || loading}
        >
          Salvar Devocional
        </Button>
      </CardContent>
    </Card>
  );
};

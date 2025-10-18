"use client";
import { PrayerRequest } from "@/app/(protected)/pedidos-oracao/page";
import { postPrayerRequests } from "@/app/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Heart } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const INITIAL_REQUEST: PrayerRequest = {
  _id: new Date().toISOString(),
  author: "",
  description: "",
  date: "",
  answered: false,
};
export function PrayerRequests() {
  const [request, setRequest] = useState<PrayerRequest>(INITIAL_REQUEST);

  const handleSave = async () => {
    try {
      if (!request) throw new Error("Pedido de oração vazio");
      await postPrayerRequests({
        ...request,
        answered: false,
        date: new Date().toISOString(),
      });
      toast.success("Pedido de oração enviado com sucesso!");
      setRequest(INITIAL_REQUEST);
    } catch (error) {
      console.log(request);
      toast.error("Erro ao enviar pedido de oração");
    }
  };

  const handleChange = (field: keyof PrayerRequest, value: string) => {
    setRequest((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <section>
      <div className="flex items-center gap-2 mb-6">
        <Heart className="h-6 w-6 text-primary" />
        <h2 className="text-3xl font-bold">Pedidos de Oração</h2>
      </div>
      <Card className="shadow-card max-w-2xl mx-auto">
        <CardContent className="pt-6 space-y-4">
          <div className="pt-4">
            <Input
              placeholder="Seu nome (opcional)"
              value={request?.author}
              onChange={(e) => handleChange("author", e.target.value)}
            />
          </div>
          <div>
            <Textarea
              placeholder="Seu pedido de oração"
              rows={5}
              value={request?.description}
              onChange={(e) => handleChange("description", e.target.value)}
              required
            />
          </div>
          <Button
            onClick={handleSave}
            className="w-full sm:w-auto"
            disabled={!request?.description}
          >
            Enviar Pedido
          </Button>
        </CardContent>
      </Card>
    </section>
  );
}

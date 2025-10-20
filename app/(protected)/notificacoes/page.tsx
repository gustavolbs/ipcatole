"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { sendNotification } from "@/app/api";

const NotificationPage = () => {
  const [topic, setTopic] = useState("igreja");
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim()) {
      toast.error("Digite a mensagem antes de enviar");
      return;
    }

    setLoading(true);

    try {
      await sendNotification(topic, title, message);

      toast.success("✅ Notificação enviada com sucesso!");
      setMessage("");
      setTitle("");
    } catch (err) {
      console.error(err);
      toast.error("Erro ao enviar notificação");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-xl">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Enviar Notificação 📢</CardTitle>
            <CardDescription>
              Envie notificações via OneSignal para usuários inscritos em cada
              tópico.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Título */}
              <div className="grid gap-2">
                <Label htmlFor="title">Título</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Digite o título da notificação"
                  required
                />
              </div>

              {/* Tópico */}
              <div className="grid gap-2">
                <Label htmlFor="topic">Tópico *</Label>
                <Select
                  value={topic}
                  onValueChange={(value) => setTopic(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um tópico" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="igreja">Igreja</SelectItem>
                    <SelectItem value="louvor">Louvor</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Mensagem */}
              <div className="grid gap-2">
                <Label htmlFor="message">Mensagem *</Label>
                <Input
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Digite sua mensagem aqui"
                  required
                />
              </div>

              {/* Botão */}
              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1" disabled={loading}>
                  {loading ? "Enviando..." : "Enviar Notificação"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NotificationPage;

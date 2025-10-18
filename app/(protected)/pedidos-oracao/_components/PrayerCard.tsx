"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Trash2 } from "lucide-react";
import { toggleAnswered, deletePrayer } from "../actions";
import { PrayerRequest } from "../page";

type Props = {
  pedido: PrayerRequest;
};

export function PrayerCard({ pedido }: Props) {
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    startTransition(async () => {
      try {
        await toggleAnswered(pedido);
        toast.success("Status do pedido atualizado!");
      } catch (err) {
        toast.error("Erro ao atualizar o pedido");
      }
    });
  };

  const handleDelete = () => {
    startTransition(async () => {
      try {
        await deletePrayer(pedido);
        toast.success("Pedido de oração excluído com sucesso!");
      } catch (err) {
        toast.error("Erro ao excluir o pedido");
      }
    });
  };

  return (
    <Card
      className={`shadow-card ${
        pedido.answered ? "border-green-500/50 bg-green-50/5" : ""
      }`}
    >
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base flex-1">
            {pedido.author || "Anônimo"}
          </CardTitle>
          <Badge variant={pedido.answered ? "default" : "secondary"}>
            {pedido.answered ? "Respondido" : "Pendente"}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground">
          {new Date(pedido.date).toLocaleDateString("pt-BR")}
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm leading-relaxed">{pedido.description}</p>

        <div className="flex gap-2">
          <Button
            size="sm"
            variant={pedido.answered ? "outline" : "default"}
            onClick={handleToggle}
            className="flex-1 w-full"
            disabled={isPending}
          >
            <CheckCircle className="h-4 w-4 mr-1" />
            {pedido.answered ? "Marcar Pendente" : "Marcar Respondido"}
          </Button>

          <Button
            size="sm"
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

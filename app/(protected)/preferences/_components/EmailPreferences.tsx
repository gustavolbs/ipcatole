"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Role, ROLES_NAMES } from "@/lib/supabase/roles";

interface Subscription {
  endpoint: string;
  name: string;
  topics: string[];
}

interface Props {
  initialSubscription: Subscription;
  userEmail: string;
  userRoles: Role[];
}

const categorias = [
  "Diaconia",
  "Músicos",
  "Mídia",
  "Pastores",
  "Toda a Igreja",
];

export default function EmailPreferences({
  initialSubscription,
  userEmail,
  userRoles,
}: Props) {
  const [subscription, setSubscription] =
    useState<Subscription>(initialSubscription);
  const [loading, setLoading] = useState(false);

  async function handleUpdate() {
    try {
      setLoading(true);
      // TODO: UPDATE TO USE EXTERNAL FUNCTION HERE
      const res = await fetch("/api/email-preferences/update", {
        method: "POST",
        body: JSON.stringify(subscription),
      });

      if (!res.ok) throw new Error("Erro ao salvar preferências");

      toast.success("Preferências atualizadas com sucesso!");
    } catch (err) {
      console.log(err);
      toast.error("Erro ao salvar suas preferências.");
    } finally {
      setLoading(false);
    }
  }

  async function handleUnsubscribe() {
    try {
      setLoading(true);
      // TODO: UPDATE TO USE EXTERNAL FUNCTION HERE
      const res = await fetch("/api/email-preferences/unsubscribe", {
        method: "POST",
        body: JSON.stringify({ email: userEmail }),
      });

      if (!res.ok) throw new Error("Erro ao cancelar inscrição");

      toast.success("Você foi removido das notificações.");
    } catch {
      toast.error("Não foi possível cancelar sua inscrição.");
    } finally {
      setLoading(false);
    }
  }

  const handleCategoriaToggle = (categoria: string) => {
    setSubscription((prev) => ({
      ...prev,
      topics: prev.topics.includes(categoria)
        ? prev.topics.filter((c) => c !== categoria)
        : [...prev.topics, categoria],
    }));
  };

  const categoriasDoUsuario = userRoles.map((r) => ({
    key: r,
    label: ROLES_NAMES[r],
  }));

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Preferências de Email</CardTitle>
            <CardDescription>
              Gerencie os tipos de notificações que deseja receber
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <Label>Nome</Label>
              <Input
                value={subscription.name}
                onChange={(e) =>
                  setSubscription({ ...subscription, name: e.target.value })
                }
              />
            </div>

            <div className="space-y-4">
              <Label>Categorias de Interesse</Label>
              <div className="grid grid-cols-2 gap-3">
                {categoriasDoUsuario.map((categoria) => (
                  <div
                    key={categoria.key}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={`pref-${categoria.key}`}
                      checked={subscription.topics.includes(categoria.key)}
                      onCheckedChange={() =>
                        handleCategoriaToggle(categoria.key)
                      }
                    />
                    <Label
                      htmlFor={`pref-${categoria.key}`}
                      className="font-normal cursor-pointer"
                    >
                      {categoria.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={handleUpdate}
                disabled={loading}
                className="flex-1"
              >
                {loading ? "Atualizando..." : "Atualizar preferências"}
              </Button>
              <Button
                onClick={handleUnsubscribe}
                variant="destructive"
                disabled={loading}
                className="flex-1"
              >
                Não quero nenhum email
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

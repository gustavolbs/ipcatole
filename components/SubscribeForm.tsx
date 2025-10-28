"use client";

import { useState, useTransition } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { subscribeUserEmail } from "@/lib/emails/subscribeUserEmail";

const SubscribeForm = () => {
  const [email, setEmail] = useState("");
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!email) {
      toast.error("Por favor, insira um email válido.");
      return;
    }

    startTransition(async () => {
      const { success, message, error } = await subscribeUserEmail(email);

      if (success) {
        toast.success(message || "Inscrição realizada com sucesso!");
        setEmail("");
      } else {
        toast.error(
          error || message || "Erro ao se inscrever. Tente novamente."
        );
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 max-w-md mx-auto">
      <Input
        type="email"
        placeholder="seu@email.com"
        name="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="flex-1"
        disabled={isPending}
      />
      <Button type="submit" disabled={isPending}>
        {isPending ? "Enviando..." : "Inscrever-se"}
      </Button>
    </form>
  );
};

export default SubscribeForm;

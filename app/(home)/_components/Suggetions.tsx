"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare } from "lucide-react";
import { useState } from "react";
import { Oval } from "react-loader-spinner";
import { toast } from "sonner";

const INITIAL_STATE = {
  nome: "",
  subject: "",
  mensagem: "",
  from_name: "APP IPCatole",
  access_key: "a9235230-97d7-434d-a00b-8da436ea36aa",
};

export const Suggestions: React.FC = () => {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: JSON.stringify({
          ...formData,
          subject: `[Nova sugestão]: ${formData.subject}`,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }),
      });

      setFormData(INITIAL_STATE);
      toast.success("Sugestão Enviada", {
        position: "bottom-center",
      });
    } catch (err) {
      console.error(err);
      toast.error("Erro ao enviar sugestão", {
        position: "bottom-center",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;

    setFormData((curr) => ({
      ...curr,
      [name]: value,
    }));
  };

  return (
    <section>
      <div className="flex items-center gap-2 mb-6">
        <MessageSquare className="h-6 w-6 text-primary" />
        <h2 className="text-3xl font-bold">Envie sua Sugestão</h2>
      </div>
      <Card className="shadow-card max-w-2xl mx-auto">
        <CardContent className="pt-6">
          <form onSubmit={onSubmit} className="space-y-4">
            <input type="hidden" name="from_name" value="APP IPCatole" />

            <div>
              <Input
                id="name"
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                placeholder="Seu nome (opcional)"
              />
            </div>
            <div>
              <Select
                onValueChange={(value) =>
                  setFormData((curr) => ({
                    ...curr,
                    subject: value,
                  }))
                }
                defaultValue={formData.subject}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo de sugestão*" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tema de EBD">Tema de EBD</SelectItem>
                  <SelectItem value="Tema para estudos">
                    Tema para estudos
                  </SelectItem>
                  <SelectItem value="Sugestao ao conselho">
                    Sugestão ao conselho
                  </SelectItem>
                  <SelectItem value="Sugestao para a igreja">
                    Sugestão para a igreja
                  </SelectItem>
                  <SelectItem value="Sugestao aos desenvolvedores">
                    Sugestão aos desenvolvedores
                  </SelectItem>
                  <SelectItem value="Outro">Outro</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Textarea
                name="mensagem"
                id="message"
                placeholder="Sua sugestão ou mensagem"
                rows={5}
                required
                value={formData.mensagem}
                onChange={handleChange}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <Oval
                  color="#fff"
                  height={18}
                  strokeWidth={4}
                  strokeWidthSecondary={4}
                />
              ) : (
                "Enviar Sugestão"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
};

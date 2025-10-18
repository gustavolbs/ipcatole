"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import { SpouseCombobox } from "./SpouseCombobox";
import { Member } from "../page";
import { postMember, putMember } from "@/app/api";

type Props = {
  members?: Member[]; // Lista de todos membros para o combobox
  initialMember?: Member; // Só para edição
};

const MemberForm = ({ members = [], initialMember }: Props) => {
  const router = useRouter();
  const isEditing = !!initialMember;
  console.log("INITIAL", initialMember);

  const [formData, setFormData] = useState<Omit<Member, "_id">>({
    name: "",
    email: "",
    phone: "",
    birthDate: "",
    married: false,
    spouseName: "",
    spouseId: "",
    marriageDate: "",
  });

  useEffect(() => {
    if (isEditing && initialMember) {
      setFormData({
        name: initialMember.name,
        email: initialMember.email || "",
        phone: initialMember.phone || "",
        birthDate: initialMember.birthDate || "",
        married: initialMember.married || false,
        spouseName: initialMember.spouseName || "",
        spouseId: initialMember.spouseId || "",
        marriageDate: initialMember.marriageDate || "",
      });
    }
  }, [initialMember, isEditing]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.birthDate) {
      toast.error("Por favor, preencha os campos obrigatórios");
      return;
    }

    try {
      if (isEditing) {
        await putMember({ ...formData, _id: initialMember._id });
      } else {
        await postMember(formData);
      }
      toast.success(isEditing ? "Membro atualizado!" : "Membro criado!");
      router.push("/membros");
    } catch (err) {
      console.error(err);
      toast.error("Erro ao salvar o membro");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Button
          variant="ghost"
          className="mb-4 gap-2"
          onClick={() => router.push("/membros")}
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Button>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-2xl">
              {isEditing ? "Editar Membro" : "Adicionar Novo Membro"}
            </CardTitle>
            <CardDescription>
              {isEditing
                ? "Atualize os dados do membro da igreja"
                : "Preencha os dados do novo membro da igreja"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Nome */}
              <div className="grid gap-2">
                <Label htmlFor="name">Nome Completo *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="João Silva"
                  required
                />
              </div>

              {/* Email */}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="joao@email.com"
                />
              </div>

              {/* Telefone */}
              <div className="grid gap-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="(11) 98765-4321"
                />
              </div>

              {/* Data de nascimento */}
              <div className="grid gap-2">
                <Label htmlFor="birthDate">Data de Nascimento *</Label>
                <Input
                  id="birthDate"
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) =>
                    setFormData({ ...formData, birthDate: e.target.value })
                  }
                  required
                />
              </div>

              {/* Casado */}
              <div className="flex items-center gap-2 pt-2">
                <Label htmlFor="married">Casado</Label>
                <Switch
                  id="married"
                  checked={formData.married}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, married: checked })
                  }
                />
              </div>

              {/* Cônjuge */}
              {formData.married && (
                <>
                  <div className="grid gap-2">
                    <SpouseCombobox
                      members={members}
                      value={formData.spouseName ?? ""}
                      excludeId={initialMember?._id}
                      onChange={(name, id) =>
                        setFormData({
                          ...formData,
                          spouseName: name,
                          spouseId: id || "", // se não for membro, fica vazio
                        })
                      }
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="marriageDate">Data do Casamento</Label>
                    <Input
                      id="marriageDate"
                      type="date"
                      value={formData.marriageDate || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          marriageDate: e.target.value,
                        })
                      }
                    />
                  </div>
                </>
              )}

              {/* Botões */}
              <div className="flex gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => router.push("/membros")}
                >
                  Cancelar
                </Button>
                <Button type="submit" className="flex-1">
                  {isEditing ? "Atualizar" : "Adicionar"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MemberForm;

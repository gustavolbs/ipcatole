"use client";

import { useState, useTransition } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import {
  Mail,
  Send,
  Users,
  FileText,
  Calendar as CalendarIcon,
} from "lucide-react";

import { RichTextEditor } from "@/components/RichTextEditor";
import {
  EmailTemplateKey,
  EscalaEmailProps,
  EscalaEmailHTML,
  WeeklyUpdateEmailHTML,
} from "@/lib/emails/templates";
import { Role, ROLES_NAMES } from "@/lib/supabase/roles";
import { sendEmail } from "@/app/api";
import { formatDate } from "@/app/(non-protected)/(home)/_components/Calendar/utils";

export default function EnviarEmailsPage() {
  const [isPending, startTransition] = useTransition();
  const [template, setTemplate] = useState<EmailTemplateKey>("weekly");
  const [topic, setTopic] = useState<Role>("user");

  // ESCALA
  const [escala, setEscala] = useState<Omit<EscalaEmailProps, "nome">>({
    categoria: "",
    data: "",
    titulo: "",
    responsaveis: [],
  });
  const [responsavel, setResponsavel] = useState("");

  // WEEKLY (rich text — HTML)
  const [conteudoSemanal, setConteudoSemanal] = useState<string>(`
    <p>Olá, irmão(irmã)!</p>
    <p>Esperamos que todos estejam bem! Aqui estão as principais novidades e eventos desta semana:</p>
    <h2>🎉 Eventos da Semana</h2>
    <p><strong>Culto de Celebração</strong> — Domingo, 10h<br/>Teremos uma manhã especial de louvor e adoração. Venha preparado para adorar!</p>
    <p><strong>Encontro de Jovens</strong> — Sexta-feira, 19h30<br/>Momento de comunhão, jogos e estudo da palavra. Traga seus amigos!</p>
    <h2>📢 Avisos Importantes</h2>
    <ul>
      <li>Inscrições para o retiro abertas até sexta-feira</li>
      <li>Grupo de oração toda terça-feira às 20h</li>
      <li>Novos cursos de discipulado começam na próxima semana</li>
    </ul>
    <h2>🎂 Aniversariantes da Semana</h2>
    <p>Queremos celebrar a vida de nossos irmãos que fazem aniversário esta semana! 🎉</p>
  `);

  // CUSTOM (rich text — HTML)
  const [assuntoCustom, setAssuntoCustom] = useState("");
  const [conteudoCustom, setConteudoCustom] = useState<string>(
    "<p>Digite o conteúdo do seu email aqui...</p>"
  );

  const getSubject = (): string => {
    switch (template) {
      case "escala":
        return escala.titulo ? `Nova Escala: ${escala.titulo}` : "Nova Escala";
      case "weekly":
        return "Atualização Semanal da Igreja";
      case "custom":
        return assuntoCustom || "Comunicação";
    }
  };

  const getEmailHTML = (): string => {
    if (template === "escala") {
      return EscalaEmailHTML({
        nome: "", // pode preencher dinamicamente por destinatário se quiser
        ...escala,
      });
    }
    if (template === "weekly") {
      return WeeklyUpdateEmailHTML({ htmlContent: conteudoSemanal });
    }
    // custom
    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${getSubject()}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: hsl(150, 45%, 20%); margin: 0 auto; padding: 20px; background-color: hsl(40, 35%, 92%);">
  <div style="background: hsl(45, 40%, 88%); padding: 32px; border: 1px solid hsl(40, 25%, 75%); border-radius: 12px;">
    ${conteudoCustom}
  </div>
  <div style="text-align: center; margin-top: 16px; color: hsl(150, 20%, 40%); font-size: 12px;">
    <p>Este é um email automático. Para alterar suas preferências de notificação, acesse as configurações.</p>
  </div>
</body>
</html>`.trim();
  };

  const handleSendEmail = async () => {
    startTransition(async () => {
      try {
        const subject = getSubject();
        const html = getEmailHTML();

        await sendEmail(topic, subject, html);

        toast.success("📨 Email enviado com sucesso!");
      } catch (error) {
        console.error(error);
        toast.error("❌ Ocorreu um erro ao enviar o email.");
      }
    });
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:py-12">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid lg:grid-cols-[300px_1fr_1fr] gap-6">
          {/* Coluna 1 — Configurações */}
          <div className="space-y-6">
            <Card className="shadow-card">
              <CardHeader className="gradient-primary text-primary-foreground rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Template
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <Select
                  value={template}
                  onValueChange={(v) => setTemplate(v as EmailTemplateKey)}
                >
                  <SelectTrigger className="border-2 hover:border-primary transition-colors">
                    <SelectValue placeholder="Selecione um template" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="escala">Escala</SelectItem>
                    <SelectItem value="weekly">Atualização Semanal</SelectItem>
                    <SelectItem value="custom">Email Personalizado</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader className="gradient-primary text-primary-foreground rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Destinatários
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  {Object.entries(ROLES_NAMES).map(([role, name]) => (
                    <div
                      key={role}
                      className="flex items-center space-x-3 p-2 rounded hover:bg-accent/10 transition-colors"
                    >
                      <Checkbox
                        id={role}
                        checked={topic === role}
                        onCheckedChange={() => setTopic(role as Role)}
                      />
                      <Label
                        htmlFor={role}
                        className="cursor-pointer flex-1 font-medium"
                      >
                        {name}
                      </Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Button
              onClick={handleSendEmail}
              className="w-full shadow-elegant"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Send className="mr-2 h-4 w-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Enviar
                </>
              )}
            </Button>
          </div>

          {/* Coluna 2 — Conteúdo */}
          <Card className="shadow-card">
            <CardHeader className="gradient-primary text-primary-foreground rounded-t-lg">
              <CardTitle>Personalizar Conteúdo</CardTitle>
              <CardDescription className="text-primary-foreground/80">
                {template === "escala" && "Configure a notificação de escala"}
                {template === "weekly" &&
                  "Crie o conteúdo da atualização semanal"}
                {template === "custom" && "Crie seu email personalizado"}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              {template === "escala" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="escala-categoria"
                      className="flex items-center gap-2 text-base font-semibold"
                    >
                      Categoria
                    </Label>
                    <Input
                      id="escala-categoria"
                      placeholder="Ex: Diaconia"
                      value={escala.categoria}
                      onChange={(e) =>
                        setEscala((s) => ({ ...s, categoria: e.target.value }))
                      }
                      className="border-2 hover:border-primary transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="escala-titulo"
                      className="flex items-center gap-2 text-base font-semibold"
                    >
                      Título da Escala
                    </Label>
                    <Input
                      id="escala-titulo"
                      placeholder="Ex: Culto de Domingo"
                      value={escala.titulo}
                      onChange={(e) =>
                        setEscala((s) => ({ ...s, titulo: e.target.value }))
                      }
                      className="border-2 hover:border-primary transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="escala-data"
                      className="flex items-center gap-2 text-base font-semibold"
                    >
                      <CalendarIcon className="h-4 w-4" />
                      Data
                    </Label>
                    <Input
                      id="escala-data"
                      type="date"
                      value={escala.data}
                      onChange={(e) =>
                        setEscala((s) => ({
                          ...s,
                          data: formatDate(e.target.value),
                        }))
                      }
                      className="border-2 hover:border-primary transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-base font-semibold">
                      Responsáveis
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Nome do responsável"
                        value={responsavel}
                        onChange={(e) => setResponsavel(e.target.value)}
                        className="border-2 hover:border-primary transition-colors"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            if (responsavel.trim()) {
                              setEscala((s) => ({
                                ...s,
                                responsaveis: [
                                  ...s.responsaveis,
                                  responsavel.trim(),
                                ],
                              }));
                              setResponsavel("");
                            }
                          }
                        }}
                      />
                      <Button
                        type="button"
                        onClick={() => {
                          if (responsavel.trim()) {
                            setEscala((s) => ({
                              ...s,
                              responsaveis: [
                                ...s.responsaveis,
                                responsavel.trim(),
                              ],
                            }));
                            setResponsavel("");
                          }
                        }}
                        className="shrink-0"
                      >
                        Adicionar
                      </Button>
                    </div>

                    {escala.responsaveis.length > 0 && (
                      <div className="space-y-2 max-h-40 overflow-y-auto mt-3">
                        {escala.responsaveis.map((resp, index) => (
                          <div
                            key={`${resp}-${index}`}
                            className="flex items-center justify-between bg-accent/10 border border-accent/20 p-3 rounded-lg"
                          >
                            <span className="font-medium">{resp}</span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                setEscala((s) => ({
                                  ...s,
                                  responsaveis: s.responsaveis.filter(
                                    (_, i) => i !== index
                                  ),
                                }))
                              }
                            >
                              Remover
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {template === "weekly" && (
                <div className="space-y-2">
                  <Label className="text-base font-semibold">
                    Conteúdo da Atualização
                  </Label>
                  <RichTextEditor
                    content={conteudoSemanal}
                    onChange={setConteudoSemanal}
                  />
                </div>
              )}

              {template === "custom" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="assunto-custom"
                      className="text-base font-semibold"
                    >
                      Assunto
                    </Label>
                    <Input
                      id="assunto-custom"
                      placeholder="Digite o assunto do email"
                      value={assuntoCustom}
                      onChange={(e) => setAssuntoCustom(e.target.value)}
                      className="border-2 hover:border-primary transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-base font-semibold">Conteúdo</Label>
                    <RichTextEditor
                      content={conteudoCustom}
                      onChange={setConteudoCustom}
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Coluna 3 — Preview */}
          <Card className="shadow-card">
            <CardHeader className="gradient-primary text-primary-foreground rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Prévia do Email
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div
                className="tiptap prose prose-sm max-w-none border-2 border-border rounded-lg p-4 bg-background max-h-[600px] overflow-y-auto"
                dangerouslySetInnerHTML={{ __html: getEmailHTML() }}
              />
              <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
                <span>Assunto: {getSubject()}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

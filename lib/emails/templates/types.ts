export type EmailTemplateKey = "escala" | "weekly" | "custom";

export interface EscalaEmailProps {
  nome: string;
  categoria: string;
  data: string;
  titulo: string;
  responsaveis: string[];
}

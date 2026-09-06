import Link from "next/link";
import { BookOpen, Landmark, ScrollText, Users } from "lucide-react";
import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import churchDocuments, {
  type ChurchDocument,
  type DocumentCategory,
} from "@/data/documentos";

export const metadata: Metadata = {
  title: "Documentos",
  description:
    "Símbolos de fé, documentos da IPB, GTSI e referências da tradição reformada.",
};

const categoryOrder: DocumentCategory[] = [
  "simbolo-de-fe-ipb",
  "governo-e-ordem-ipb",
  "sociedade-interna-ipb",
  "heranca-reformada",
  "credo-historico",
];

const categoryInfo: Record<
  DocumentCategory,
  { title: string; description: string; icon: typeof BookOpen }
> = {
  "simbolo-de-fe-ipb": {
    title: "Símbolos de Fé da IPB",
    description:
      "A Confissão de Fé de Westminster e os Catecismos Maior e Breve de Westminster.",
    icon: BookOpen,
  },
  "governo-e-ordem-ipb": {
    title: "Governo e Ordem da IPB",
    description:
      "Documentos que regulam a organização, disciplina e liturgia da Igreja Presbiteriana do Brasil.",
    icon: Landmark,
  },
  "sociedade-interna-ipb": {
    title: "Sociedades Internas",
    description:
      "Guias e normas de trabalho das Sociedades Internas da Igreja Presbiteriana do Brasil.",
    icon: Users,
  },
  "heranca-reformada": {
    title: "Herança Reformada",
    description:
      "Documentos históricos importantes da tradição reformada, apresentados como referência e não como símbolos oficiais da IPB.",
    icon: ScrollText,
  },
  "credo-historico": {
    title: "Credos Históricos",
    description: "Credos ecumênicos históricos recebidos pela tradição cristã.",
    icon: ScrollText,
  },
};

const statusLabel: Record<ChurchDocument["status"], string> = {
  "oficial-ipb": "Símbolo oficial da IPB",
  "normativo-ipb": "Normativo da IPB",
  "referencia-historica": "Referência histórica",
};

export default function DocumentosPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl space-y-12">
          <header className="space-y-3">
            <div className="flex items-center gap-3">
              <BookOpen className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-bold">Documentos</h1>
            </div>
            <p className="max-w-3xl text-muted-foreground">
              Consulte os símbolos de fé adotados pela IPB, documentos de
              governo e ordem, o GTSI e textos históricos da tradição
              reformada.
            </p>
          </header>

          {categoryOrder.map((category) => {
            const documents = churchDocuments.filter(
              (document) => document.category === category
            );

            if (documents.length === 0) return null;

            const info = categoryInfo[category];
            const Icon = info.icon;

            return (
              <section key={category} className="space-y-5">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Icon className="h-5 w-5 text-primary" />
                    <h2 className="text-2xl font-bold">{info.title}</h2>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {info.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {documents.map((document) => (
                    <Card
                      key={document.id}
                      className="flex h-full flex-col shadow-card transition-shadow hover:shadow-elegant"
                    >
                      <CardHeader className="space-y-3">
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary">
                            {statusLabel[document.status]}
                          </Badge>
                          {document.year && (
                            <Badge variant="outline">{document.year}</Badge>
                          )}
                        </div>
                        <CardTitle className="text-xl">
                          {document.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="flex flex-1 flex-col justify-between gap-5">
                        <p className="text-sm text-muted-foreground">
                          {document.description}
                        </p>
                        <Link href={`/documentos/${document.id}`}>
                          <Button className="w-full">Visualizar</Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}

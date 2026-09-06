import Link from "next/link";
import { ArrowLeft, BookOpen, ExternalLink, Users } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import breveCatecismo from "@/data/catecismo-breve";
import maiorCatecismo from "@/data/catecismo-maior";
import churchDocuments, {
  gtsiBySociety,
  westminsterConfessionChapters,
} from "@/data/documentos";
import { CatecismoViewer } from "../_components/CatecismoViewer";

const categoryLabel = {
  "simbolo-de-fe-ipb": "Símbolo de Fé da IPB",
  "governo-e-ordem-ipb": "Governo e Ordem da IPB",
  "sociedade-interna-ipb": "Sociedade Interna da IPB",
  "heranca-reformada": "Herança Reformada",
  "credo-historico": "Credo Histórico",
} as const;

const statusLabel = {
  "oficial-ipb": "Oficial da IPB",
  "normativo-ipb": "Normativo da IPB",
  "referencia-historica": "Referência histórica",
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const document = churchDocuments.find((item) => item.id === id);

  if (!document) return { title: "Documento não encontrado" };

  return {
    title: document.title,
    description: document.description,
  };
}

export default async function DocumentoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const document = churchDocuments.find((item) => item.id === id);

  if (!document) notFound();

  const catecismoItems =
    id === "breve-catecismo-westminster"
      ? breveCatecismo
      : id === "catecismo-maior-westminster"
        ? maiorCatecismo
        : null;

  const externalSources = document.sources.filter(
    (source) => source.url.startsWith("http://") || source.url.startsWith("https://")
  );

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl space-y-8">
          <Link href="/documentos" className="flex w-fit">
            <Button variant="ghost" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Voltar para Documentos
            </Button>
          </Link>

          <header className="space-y-4">
            <div className="flex items-start gap-3">
              <BookOpen className="mt-1 h-8 w-8 shrink-0 text-primary" />
              <div className="space-y-3">
                <h1 className="text-3xl font-bold md:text-4xl">
                  {document.title}
                </h1>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">
                    {categoryLabel[document.category]}
                  </Badge>
                  <Badge variant="outline">
                    {statusLabel[document.status]}
                  </Badge>
                  {document.year && (
                    <Badge variant="outline">{document.year}</Badge>
                  )}
                </div>
              </div>
            </div>
            <p className="text-muted-foreground">{document.description}</p>
          </header>

          {catecismoItems && <CatecismoViewer items={catecismoItems} />}

          {id === "confissao-fe-westminster" && (
            <section className="space-y-4">
              <div>
                <h2 className="text-2xl font-bold">Capítulos</h2>
                <p className="text-sm text-muted-foreground">
                  Índice dos 33 capítulos da Confissão de Fé de Westminster.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {westminsterConfessionChapters.map((chapter) => (
                  <Card key={chapter.number}>
                    <CardContent className="flex gap-3 p-4">
                      <Badge variant="outline" className="h-fit">
                        {chapter.number}
                      </Badge>
                      <p className="font-medium">{chapter.title}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {id === "gtsi" && (
            <section className="space-y-4">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <h2 className="text-2xl font-bold">Sociedades Internas</h2>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {gtsiBySociety.map((society) => (
                  <Card key={society.id}>
                    <CardContent className="space-y-1 p-4">
                      <p className="font-semibold">
                        {society.acronym} — {society.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Última edição catalogada: {society.latestKnownEdition}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {document.notes && document.notes.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Observações</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                  {document.notes.map((note) => (
                    <li key={note}>{note}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {externalSources.length > 0 && (
            <section className="space-y-4">
              <div>
                <h2 className="text-2xl font-bold">Fontes e edições</h2>
                <p className="text-sm text-muted-foreground">
                  Consulte as versões publicadas pelas fontes indicadas.
                </p>
              </div>
              <div className="space-y-3">
                {externalSources.map((source) => (
                  <Card key={`${source.label}-${source.url}`}>
                    <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="font-medium">{source.label}</p>
                        {(source.publisher || source.year) && (
                          <p className="text-sm text-muted-foreground">
                            {[source.publisher, source.year]
                              .filter(Boolean)
                              .join(" · ")}
                          </p>
                        )}
                        {source.notes && (
                          <p className="mt-1 text-sm text-muted-foreground">
                            {source.notes}
                          </p>
                        )}
                      </div>
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0"
                      >
                        <Button variant="outline" className="w-full sm:w-auto">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Abrir fonte
                        </Button>
                      </a>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

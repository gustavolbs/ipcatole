import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import bibliaData from "@/data/ARA.json";
import Link from "next/link";
import { Book } from "../page";

export const dynamic = "force-static";

// Gera todas as rotas estáticas baseadas nos livros da Bíblia
export async function generateStaticParams() {
  const books = bibliaData as Book[];
  return books.map((book) => ({
    abbrev: book.abbrev.toLowerCase(),
  }));
}

type LivroProps = {
  params: { abbrev: string };
};

export default function Livro({ params }: LivroProps) {
  const { abbrev } = params;
  const books = bibliaData as Book[];
  const selected = books.find(
    (book) =>
      book.abbrev.toLowerCase() === decodeURIComponent(abbrev).toLowerCase()
  );

  if (!selected) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Livro não encontrado.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <BookOpen className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold">Bíblia Sagrada</h1>
          </div>

          <div>
            <Link href="/biblia">
              <Button variant="ghost" className="mb-6">
                ← Voltar aos livros
              </Button>
            </Link>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-2xl">{selected.name}</CardTitle>
                <p className="text-muted-foreground">
                  {selected.chapters.length} capítulos
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
                  {selected.chapters.map((_, idx) => {
                    const cap = idx + 1;
                    return (
                      <Link href={`/biblia/${abbrev}/${cap}`} key={cap}>
                        <Button variant="outline" className="aspect-square">
                          {cap}
                        </Button>
                      </Link>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import bibliaData from "@/data/ARA.json";
import { Book } from "../../page";
import Link from "next/link";

export const dynamic = "force-static";

export async function generateStaticParams() {
  const books = bibliaData as Book[];

  // Gera todas as combinações possíveis de livro + capítulo
  return books.flatMap((book) =>
    book.chapters.map((_, index) => ({
      abbrev: book.abbrev.toLowerCase(),
      cap: String(index + 1),
    }))
  );
}

interface CapituloProps {
  params: { abbrev: string; cap: string };
}

export default function Capitulo({ params }: CapituloProps) {
  const { abbrev, cap } = params;

  const books = bibliaData as Book[];
  const selectedBook = books.find(
    (book) => book.abbrev.toLowerCase() === abbrev.toLowerCase()
  );
  const selectedChapter = selectedBook?.chapters[Number(cap) - 1];

  if (!selectedBook || !selectedChapter) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Capítulo não encontrado.</p>
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
            <Link href={`/biblia/${abbrev}`}>
              <Button variant="ghost" className="mb-6">
                ← Voltar aos capítulos
              </Button>
            </Link>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-2xl">
                  {selectedBook.name} {cap}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedChapter.map((verse, idx) => (
                  <p key={idx} className="text-base leading-relaxed">
                    <span className="font-semibold text-primary mr-2">
                      {idx + 1}
                    </span>
                    {verse}
                  </p>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

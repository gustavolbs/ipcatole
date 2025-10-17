"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import bibliaData from "@/data/biblia.json";

// TODO: UPDATE THIS LATER
const Biblia = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedBook, setSelectedBook] = useState<any>(null);
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);

  const velhoTestamento = bibliaData.livros.filter(
    (l) => l.testamento === "Velho"
  );
  const novoTestamento = bibliaData.livros.filter(
    (l) => l.testamento === "Novo"
  );

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <BookOpen className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold">Bíblia Sagrada</h1>
          </div>

          {!selectedBook ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Velho Testamento */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-2xl">Velho Testamento</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    {velhoTestamento.map((livro) => (
                      <Button
                        key={livro.nome}
                        variant="outline"
                        className="justify-start"
                        onClick={() => setSelectedBook(livro)}
                      >
                        {livro.nome}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Novo Testamento */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-2xl">Novo Testamento</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    {novoTestamento.map((livro) => (
                      <Button
                        key={livro.nome}
                        variant="outline"
                        className="justify-start"
                        onClick={() => setSelectedBook(livro)}
                      >
                        {livro.nome}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : !selectedChapter ? (
            <div>
              <Button
                variant="ghost"
                onClick={() => setSelectedBook(null)}
                className="mb-6"
              >
                ← Voltar aos livros
              </Button>
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-2xl">
                    {selectedBook.nome}
                  </CardTitle>
                  <p className="text-muted-foreground">
                    {selectedBook.capitulos} capítulos
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
                    {Array.from(
                      { length: selectedBook.capitulos },
                      (_, i) => i + 1
                    ).map((cap) => (
                      <Button
                        key={cap}
                        variant="outline"
                        className="aspect-square"
                        onClick={() => setSelectedChapter(cap)}
                      >
                        {cap}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div>
              <Button
                variant="ghost"
                onClick={() => setSelectedChapter(null)}
                className="mb-6"
              >
                ← Voltar aos capítulos
              </Button>
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-2xl">
                    {selectedBook.nome} {selectedChapter}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedBook.exemplo &&
                  selectedBook.exemplo.capitulo === selectedChapter ? (
                    selectedBook.exemplo.versiculos.map(
                      (v: string, i: number) => (
                        <p key={i} className="text-base leading-relaxed">
                          <span className="font-semibold text-primary mr-2">
                            {i + 1}
                          </span>
                          {v}
                        </p>
                      )
                    )
                  ) : (
                    <p className="text-muted-foreground italic">
                      Conteúdo completo disponível em breve. Este é um exemplo
                      de navegação.
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Biblia;

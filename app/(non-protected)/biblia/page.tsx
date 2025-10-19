import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import bibliaData from "@/data/ARA.json";
import Link from "next/link";

export type Book = {
  abbrev: string;
  chapters: string[][];
  name: string[];
};

const Biblia = () => {
  const velhoTestamento = (bibliaData as Book[]).slice(0, 39);
  const novoTestamento = (bibliaData as Book[]).slice(39);

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <BookOpen className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold">Bíblia Sagrada</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Velho Testamento */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-2xl">Velho Testamento</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {velhoTestamento.map((livro) => (
                    <Link
                      href={`/biblia/${livro.abbrev}`}
                      key={livro.abbrev}
                      className="w-full"
                    >
                      <Button
                        variant="outline"
                        className="justify-start w-full"
                      >
                        {livro.name}
                      </Button>
                    </Link>
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
                    <Link
                      href={`/biblia/${livro.abbrev}`}
                      key={livro.abbrev}
                      className="w-full"
                    >
                      <Button
                        variant="outline"
                        className="justify-start w-full"
                      >
                        {livro.name}
                      </Button>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Biblia;

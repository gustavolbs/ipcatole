import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Download } from "lucide-react";
import Link from "next/link";

const DOCUMENTS = [
  {
    title: "Breve Catecismo de Westminster",
    description:
      "Estudo das doutrinas essenciais da fé reformada em formato de perguntas e respostas.",
    name: "breve",
    ref: "https://ipb.org.br/content/Arquivos/Breve_Catecismo_de_Westminster.pdf",
  },
  {
    title: "Catecismo Maior de Westminster",
    name: "maior",
    description:
      "Versão completa e detalhada das doutrinas presbiterianas com explicações aprofundadas.",
    ref: "https://ipb.org.br/content/Arquivos/Catecismo_Maior_de_Westminster.pdf",
  },
];
const Catecismo = () => {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <BookOpen className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold">Catecismo</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {DOCUMENTS.map((doc) => (
              <Card
                key={doc.name}
                className="shadow-card hover:shadow-elegant transition-shadow cursor-pointer"
              >
                <CardHeader>
                  <CardTitle className="text-2xl">{doc.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{doc.description}</p>
                  <div className="space-y-2 flex flex-col">
                    <Link href={`/catecismo/${doc.name}`}>
                      <Button className="w-full">Visualizar</Button>
                    </Link>
                    <a href={doc.ref} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" className="w-full">
                        <Download className="h-4 w-4 mr-2" />
                        Baixar PDF
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catecismo;

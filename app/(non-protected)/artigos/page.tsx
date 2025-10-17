import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Calendar, Download } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Artigos e Documentos",
};
// TODO: UPDATE THIS LATER
const Artigos = () => {
  const artigos = [
    {
      id: 1,
      titulo: "A Doutrina da Justificação pela Fé",
      autor: "Rev. João Silva",
      data: "01/10/2025",
      categoria: "Teologia",
      resumo:
        "Estudo aprofundado sobre a doutrina central da Reforma Protestante e sua relevância para os dias atuais.",
    },
    {
      id: 2,
      titulo: "A Importância da Escola Dominical",
      autor: "Presb. Maria Santos",
      data: "28/09/2025",
      categoria: "Educação Cristã",
      resumo:
        "Reflexão sobre o papel fundamental da Escola Dominical na formação espiritual dos membros da igreja.",
    },
    {
      id: 3,
      titulo: "Os Cinco Solas da Reforma",
      autor: "Rev. Dr. Pedro Costa",
      data: "20/09/2025",
      categoria: "História",
      resumo:
        "Análise histórica e teológica dos cinco princípios fundamentais da Reforma Protestante do século XVI.",
    },
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <FileText className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold">Artigos e Documentos</h1>
          </div>

          <div className="space-y-6">
            {artigos.map((artigo) => (
              <Card
                key={artigo.id}
                className="shadow-card hover:shadow-elegant transition-shadow"
              >
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <CardTitle className="text-2xl">{artigo.titulo}</CardTitle>
                    <span className="text-sm px-3 py-1 bg-primary/10 text-primary rounded-full w-fit">
                      {artigo.categoria}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{artigo.autor}</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {artigo.data}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{artigo.resumo}</p>
                  <div className="flex gap-3">
                    <Button>Ler Artigo</Button>
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Baixar PDF
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-12 shadow-card bg-muted/30">
            <CardContent className="pt-6 text-center">
              <p className="text-muted-foreground mb-4">
                Em breve, mais artigos e documentos serão adicionados à
                biblioteca digital.
              </p>
              <p className="text-sm text-muted-foreground">
                Sugestões de temas? Entre em contato através do formulário na
                página inicial.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Artigos;

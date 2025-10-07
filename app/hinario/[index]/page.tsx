import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  params: {
    index: string;
  };
}

interface Hino {
  numero: string;
  titulo: string;
  categoria: string;
  estrofes: string[];
}

export default async function HinoPage({ params }: Props) {
  let hino: Hino | null = null;
  const index = await params.index;

  try {
    const hinoModule = await import(`@/data/hinario/${index}.json`);
    hino = hinoModule.default;
  } catch (err) {
    console.error("Hino não encontrado:", err);
    hino = null;
  }

  if (!hino) {
    return <>Hino não encontrado.</>;
  }

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="text-2xl">
          Hino {hino.numero} - {hino.titulo}
        </CardTitle>
        <p className="text-muted-foreground">{hino.categoria}</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {hino.estrofes.map((estrofe, i) => {
          const isChorus = estrofe.startsWith("chorus:");
          estrofe = estrofe.replace("chorus:", "").trim();
          return (
            <div
              key={i}
              className={`space-y-2 ${isChorus ? "italic pl-4" : ""}`}
            >
              <p className="whitespace-pre-line text-base leading-relaxed">
                {estrofe}
              </p>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

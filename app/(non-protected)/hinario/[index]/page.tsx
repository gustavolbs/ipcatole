import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Metadata } from "next";
import fs from "fs";
import path from "path";

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

// 🧠 Gera metadata dinâmica com base no hino
export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { index } = params;
  const hinoModule = await import(`@/data/hinario/${index}.json`);
  const hino = hinoModule.default;

  return {
    title: `${hino.numero} · ${hino.titulo} | Hinário Novo Cântico | IPCatolé`,
    description: `Hino ${hino.numero} - ${hino.titulo} (${hino.categoria}) do Hinário Novo Cântico.`,
  };
};

// ⚙️ Gera páginas estáticas para todos os hinos
export async function generateStaticParams() {
  const dir = path.join(process.cwd(), "/data/hinario");
  const files = fs.readdirSync(dir);

  return files.map((file) => ({
    index: file.replace(".json", ""),
  }));
}

// 🕊️ Página do hino individual
export default async function HinoPage({ params }: Props) {
  const { index } = params;

  let hino: Hino | null = null;

  try {
    const hinoModule = await import(`@/data/hinario/${index}.json`);
    hino = hinoModule.default;
  } catch (err) {
    console.error("❌ Hino não encontrado:", err);
    return (
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Hino não encontrado</CardTitle>
          <p className="text-muted-foreground">
            O número informado não corresponde a nenhum hino disponível.
          </p>
        </CardHeader>
      </Card>
    );
  }

  if (!hino) return null;

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Hino {hino.numero} — {hino.titulo}
        </CardTitle>
        <p className="text-muted-foreground">{hino.categoria}</p>
      </CardHeader>

      <CardContent className="space-y-6">
        {hino.estrofes.map((estrofe, i) => {
          const isChorus = estrofe
            .trimStart()
            .toLowerCase()
            .startsWith("chorus:");
          const texto = estrofe.replace(/^chorus:/i, "").trim();

          return (
            <div
              key={i}
              className={`space-y-2 ${
                isChorus ? "italic pl-4 border-l-2 border-primary/30" : ""
              }`}
            >
              <p className="whitespace-pre-line text-base leading-relaxed">
                {texto}
              </p>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

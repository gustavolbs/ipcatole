"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Metadata } from "next";
import { use, useEffect, useState } from "react";

type CatecismoItem = {
  number: string;
  title: string;
  answer: string;
  refs: string;
};

export default function Catecismo({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = use(params);
  const [catecismo, setCatecismo] = useState<CatecismoItem[]>([]);

  useEffect(() => {
    import(`@/data/catecismo-${type}.ts`)
      .then((mod) => setCatecismo(mod.default))
      .catch(() => setCatecismo([]));
  }, [type]);

  const [searchTerm, setSearchTerm] = useState("");
  const filteredCatecismo = catecismo.filter(
    (h) =>
      h.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      h.number.toString().includes(searchTerm)
  );

  if (!catecismo) {
    return <>Catecismo não encontrado.</>;
  }

  return (
    <>
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Buscar por número ou título..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <Card className="shadow-card">
        <CardHeader />
        <CardContent className="space-y-6">
          {filteredCatecismo.map((item) => (
            <div
              key={item.number}
              className="p-4 rounded-lg bg-muted/30 space-y-2"
            >
              <p className="font-semibold text-primary">
                {item.number}. {item.title}
              </p>
              <p className="text-muted-foreground">
                <span className="font-medium text-foreground">R:</span>{" "}
                {item.answer.split("\n").map((line, i) => (
                  <span key={i}>
                    {line}
                    <br />
                  </span>
                ))}
              </p>
              {!!item.refs && (
                <small className="text-muted-foreground">
                  <span className="font-medium text-foreground">ref:</span>{" "}
                  {item.refs}
                </small>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  );
}

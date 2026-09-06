"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type CatecismoItem = {
  number: string;
  title: string;
  answer: string;
  refs: string;
};

export function CatecismoViewer({ items }: { items: CatecismoItem[] }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    if (!normalizedSearch) return items;

    return items.filter((item) =>
      [item.number, item.title, item.answer, item.refs].some((value) =>
        value.toLowerCase().includes(normalizedSearch)
      )
    );
  }, [items, searchTerm]);

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar por número, pergunta, resposta ou referência..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          className="pl-10"
        />
      </div>

      <p className="text-sm text-muted-foreground">
        {filteredItems.length} de {items.length} itens
      </p>

      <Card className="shadow-card">
        <CardContent className="space-y-6 pt-6">
          {filteredItems.map((item) => (
            <article
              key={item.number}
              className="space-y-2 rounded-lg bg-muted/30 p-4"
            >
              <h2 className="font-semibold text-primary">
                {item.number}. {item.title}
              </h2>
              <p className="text-muted-foreground">
                <span className="font-medium text-foreground">R:</span>{" "}
                {item.answer.split("\n").map((line, index) => (
                  <span key={`${item.number}-${index}`}>
                    {line}
                    {index < item.answer.split("\n").length - 1 && <br />}
                  </span>
                ))}
              </p>
              {item.refs && (
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">Refs:</span>{" "}
                  {item.refs}
                </p>
              )}
            </article>
          ))}

          {filteredItems.length === 0 && (
            <p className="py-8 text-center text-muted-foreground">
              Nenhum item encontrado para esta busca.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Music, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";
import hinarioData from "@/data/index-hinario.json";

export default function HinarioPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredHinos = hinarioData.filter(
    (h) =>
      h.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      h.numero.toString().includes(searchTerm) ||
      h.categoria.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const hinosSemNumero = ["amen-3", "amen-4", "amen-7"];
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Music className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold">Hinário Presbiteriano</h1>
          </div>

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
            <CardHeader>
              <CardTitle>Índice de Hinos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {filteredHinos.map((hino) => (
                  <Link
                    key={hino.numero}
                    href={`/hinario/${hino.numero}`}
                    className="block w-full text-left p-4 rounded-lg border hover:bg-muted/50 transition-colors flex items-center justify-between"
                  >
                    <div>
                      <p className="font-semibold">
                        {hinosSemNumero.includes(hino.numero)
                          ? ""
                          : `${hino.numero}. `}
                        {hino.titulo}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {hino.categoria}
                      </p>
                    </div>
                    <Music className="h-5 w-5 text-primary" />
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

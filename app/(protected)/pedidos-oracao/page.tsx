import { Card, CardContent } from "@/components/ui/card";
import { Heart } from "lucide-react";
import { getPrayerRequests } from "@/app/api";
import { PrayerCard } from "./_components/PrayerCard";

export type PrayerRequest = {
  _id: string;
  description: string;
  author?: string;
  date: string;
  answered: boolean;
};

export default async function PedidosOracao() {
  const pedidos: PrayerRequest[] = await getPrayerRequests();

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <Heart className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold">Pedidos de Oração</h1>
        </div>

        {pedidos.length === 0 ? (
          <Card className="shadow-card">
            <CardContent className="py-12 text-center">
              <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg text-muted-foreground">
                Nenhum pedido de oração no momento.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pedidos.map((pedido) => (
              <PrayerCard key={pedido._id} pedido={pedido} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

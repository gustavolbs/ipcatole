import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HandHeart, HelpingHand, Users } from "lucide-react";
import { getMembers, getPrayerRequests } from "@/app/api";
import { PrayerRequest } from "../pedidos-oracao/page";
import { getUserProfile } from "@/lib/supabase/getUserProfile";
import {
  ROLES_ALLOWED_MEMBERS,
  ROLES_ALLOWED_PRAYER_REQUESTS,
} from "@/lib/supabase/roles";

const Dashboard = async () => {
  const userData = await getUserProfile();
  const userRoles = userData?.profile?.roles || [];

  const [pedidos, membros] = await Promise.all([
    getPrayerRequests(),
    getMembers(),
  ]);

  const metrics = [
    {
      title: "Pedidos de Oração",
      value: pedidos.length,
      icon: HelpingHand,
      allowedRoles: ROLES_ALLOWED_PRAYER_REQUESTS,
    },
    {
      title: "Pedidos de Oração (em aberto)",
      value: pedidos.filter((pedido: PrayerRequest) => !pedido.answered).length,
      icon: HandHeart,
      allowedRoles: ROLES_ALLOWED_PRAYER_REQUESTS,
    },
    {
      title: "Membros Cadastrados",
      value: membros.length,
      icon: Users,
      allowedRoles: ROLES_ALLOWED_MEMBERS,
    },
  ];

  // Filtra apenas as métricas visíveis para o usuário atual
  const visibleMetrics = metrics.filter((metric) =>
    metric.allowedRoles.some((role) => userRoles.includes(role))
  );

  if (visibleMetrics.length === 0) return null;

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-foreground mb-4">Métricas</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {visibleMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card
              key={index}
              className="shadow-card hover:shadow-elegant transition-shadow"
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {metric.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">
                  {metric.value}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;

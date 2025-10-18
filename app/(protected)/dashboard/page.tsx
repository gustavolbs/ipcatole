import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HandHeart, HelpingHand } from "lucide-react";
import { getPrayerRequests } from "@/app/api";
import { PrayerRequest } from "../pedidos-oracao/page";
import { getUserProfile } from "@/lib/supabase/getUserProfile";
import { ROLES_ALLOWED_PRAYER_REQUESTS } from "@/lib/supabase/roles";

const Dashboard = async () => {
  const userData = await getUserProfile();
  const userRole = userData?.profile?.role;
  const [pedidos] = await Promise.all([getPrayerRequests()]);

  const metrics = [
    {
      title: "Pedidos de Oração",
      value: pedidos.length,
      icon: HelpingHand,
      whoCanSee: ROLES_ALLOWED_PRAYER_REQUESTS,
    },
    {
      title: "Pedidos de Oração (em aberto)",
      value: pedidos.filter((pedido: PrayerRequest) => !pedido.answered).length,
      icon: HandHeart,
      whoCanSee: ROLES_ALLOWED_PRAYER_REQUESTS,
    },
  ];

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-foreground mb-4">Métricas</h2>
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => {
          if (
            metric.whoCanSee &&
            (!userRole || !metric.whoCanSee.includes(userRole))
          ) {
            return null;
          }
          return (
            <Card
              key={index}
              className="shadow-card hover:shadow-elegant transition-shadow"
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {metric.title}
                </CardTitle>
                <metric.icon className="h-4 w-4 text-muted-foreground" />
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

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookOpen, Video, FileText, Music, HandHeart } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";
import { getUserProfile } from "@/lib/supabase/getUserProfile";
import {
  Role,
  ROLES_ALLOWED_DASHBOARD,
  ROLES_ALLOWED_PRAYER_REQUESTS,
} from "@/lib/supabase/roles";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Gerencie os aspectos da igreja em um só lugar",
};

type Links = {
  title: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  path: string;
  color: string;
  enabledRoles?: Role[];
}[];

const quickLinks: Links = [
  {
    title: "Gestão de Mídias",
    description: "Gerenciar campanhas, vídeos e devocionais",
    icon: Video,
    path: "/midia",
    color: "text-primary",
    enabledRoles: ROLES_ALLOWED_DASHBOARD,
  },
  {
    title: "Pedidos de Oração",
    description: "Acessar e gerenciar pedidos de oração",
    icon: HandHeart,
    path: "/pedidos-oracao",
    color: "text-accent",
    enabledRoles: ROLES_ALLOWED_PRAYER_REQUESTS,
  },
];

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userData = await getUserProfile();
  const userRole = userData?.profile?.role;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Dashboard Administrativo
          </h1>
          <p className="text-muted-foreground">
            Gerencie todos os aspectos da igreja em um só lugar
          </p>
        </div>

        {/* Quick Links */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Acesso Rápido
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickLinks.map((link, index) => {
              if (
                !userRole ||
                (link.enabledRoles && !link.enabledRoles.includes(userRole))
              ) {
                return null;
              }
              return (
                <Link key={index} href={link.path}>
                  <Card className="shadow-card hover:shadow-elegant transition-all hover:scale-105 cursor-pointer h-full">
                    <CardHeader>
                      <link.icon className={`h-8 w-8 mb-2 ${link.color}`} />
                      <CardTitle className="text-lg">{link.title}</CardTitle>
                      <CardDescription>{link.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>

        {children}
      </div>
    </div>
  );
}

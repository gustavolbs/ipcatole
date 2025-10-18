import { Button } from "@/components/ui/button";
import { getUserProfile } from "@/lib/supabase/getUserProfile";
import { ROLES_ALLOWED_PRAYER_REQUESTS } from "@/lib/supabase/roles";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Pedidos de Oração",
  description: "Gerencie os pedidos de oração da igreja.",
};

export default async function PedidosOracaoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userData = await getUserProfile();

  if (
    !userData?.user ||
    !userData.profile?.role ||
    !ROLES_ALLOWED_PRAYER_REQUESTS.includes(userData.profile?.role)
  ) {
    redirect("/dashboard");
  }

  return (
    <>
      <Link href="/dashboard">
        <Button variant="ghost" className="mb-6 flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" /> Voltar ao dashboard
        </Button>
      </Link>

      {children}
    </>
  );
}

import { Button } from "@/components/ui/button";
import { getUserProfile } from "@/lib/supabase/getUserProfile";
import { ROLES_ALLOWED_DASHBOARD } from "@/lib/supabase/roles";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Enviar Emails",
  description: "Envie emails para a igreja.",
};

export default async function EmailsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userData = await getUserProfile();

  if (
    !userData?.user ||
    !userData.profile?.roles ||
    !userData.profile?.roles.some((role) =>
      ROLES_ALLOWED_DASHBOARD.includes(role)
    )
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

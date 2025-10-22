// app/email-preferences/page.tsx
import { createServer } from "@/lib/supabase/server";
import EmailPreferences from "./_components/EmailPreferences";
import { getUserProfile } from "@/lib/supabase/getUserProfile";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default async function EmailPreferencesPage() {
  const userData = await getUserProfile();

  if (!userData?.user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Você precisa estar logado para acessar suas preferências de email.
      </div>
    );
  }
  const supabase = createServer();

  // Busca os tópicos (interesses) e dados extras do usuário
  const { data: subscription } = await (await supabase)
    .from("push_subscriptions")
    .select("topics, endpoint, name")
    .eq("endpoint", userData.user.email)
    .maybeSingle();

  // fallback se ainda não existir
  const userSubscription = subscription ?? {
    endpoint: userData.user.email,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    name: (userData.user as any).name || "",
    topics: [],
  };

  return (
    <>
      <Link href="/dashboard">
        <Button variant="ghost" className="mb-6 flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" /> Voltar ao dashboard
        </Button>
      </Link>

      <EmailPreferences
        initialSubscription={userSubscription}
        userEmail={userData.user.email ?? ""}
        userRoles={userData.profile?.roles ?? []}
      />
    </>
  );
}

import { redirect } from "next/navigation";
import { createServer } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";

const ROLES_ALLOWED = ["admin", "conselho", "presidentes"];

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServer();
  const {
    data: { user },
  } = await (await supabase).auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await (await supabase)
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!ROLES_ALLOWED.includes(profile?.role || "") || !profile) {
    redirect("/");
  }

  return (
    <>
      <div className="container 2xl:max-w-[1200px] mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Bem vindo, {user.user_metadata.name} ({profile.role})
          </h1>
          <form action="/logout" method="post">
            <Button
              type="submit"
              className="mt-4 rounded-lg px-4 py-2 text-white"
            >
              Sair
            </Button>
          </form>
        </div>
        {children}
      </div>
    </>
  );
}

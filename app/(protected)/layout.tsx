import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getUserProfile } from "@/lib/supabase/getUserProfile";

const ROLES_ALLOWED = ["admin", "conselho", "presidentes", "midia"];

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userData = await getUserProfile();
  if (!userData?.user) {
    redirect("/login");
  }

  const { user, profile } = userData;

  if (!ROLES_ALLOWED.includes(profile?.role || "") || !profile) {
    redirect("/");
  }

  return (
    <>
      <div className="container 2xl:max-w-[1200px] mx-auto px-4 py-12">
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-2xl font-bold text-foreground mb-2 text-balance">
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

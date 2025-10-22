import { createServer } from "@/lib/supabase/server";
import type { Role } from "@/lib/supabase/roles";
import type { User } from "@supabase/supabase-js";

export async function getUserProfile(): Promise<{
  user: User;
  profile: { roles: Role[] } | null;
} | null> {
  const supabase = createServer();
  const {
    data: { user },
  } = await (await supabase).auth.getUser();
  if (!user) return null;

  const { data: profile } = await (await supabase)
    .from("profiles")
    .select("roles")
    .eq("id", user.id)
    .single();

  return { user, profile: profile as { roles: Role[] } | null };
}

export async function getOneUserProfile(email: string): Promise<{
  user: User;
  profile: { roles: Role[] } | null;
} | null> {
  const supabase = createServer();

  // 1️⃣ Busca o usuário pelo email na tabela public.profiles
  const { data: users, error: userError } = await (await supabase)
    .from("profiles")
    .select("*")
    .eq("email", email)
    .limit(1);

  if (userError || !users?.length) return null;

  const user = users[0] as User;

  // 2️⃣ Busca o profile correspondente na tabela profiles
  const { data: profile } = await (await supabase)
    .from("profiles")
    .select("roles")
    .eq("id", user.id)
    .single();

  return { user, profile: profile as { roles: Role[] } | null };
}

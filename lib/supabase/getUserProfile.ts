import { createServer } from "@/lib/supabase/server";
import type { Role } from "@/lib/supabase/roles";
import type { User } from "@supabase/supabase-js";

export async function getUserProfile(): Promise<{
  user: User;
  profile: { role: Role } | null;
} | null> {
  const supabase = createServer();
  const {
    data: { user },
  } = await (await supabase).auth.getUser();
  if (!user) return null;

  const { data: profile } = await (await supabase)
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  return { user, profile: profile as { role: Role } | null };
}

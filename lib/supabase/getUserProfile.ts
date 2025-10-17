import { createServer } from "@/lib/supabase/server";

export async function getUserProfile() {
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

  return { user, profile };
}

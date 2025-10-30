"use server";
import { sendEmail } from "@/app/api";
import { createClient } from "../supabase/client";
import { getOneUserProfile } from "../supabase/getUserProfile";
import { WelcomeEmail } from "./templates";
import { ALL_ROLES, Role } from "../supabase/roles";

export const subscribeUserEmail = async (email: string) => {
  const supabase = await createClient();

  let userId: string | null = null;
  let topics: Role[] = ["user"]; // padrão: todos entram aqui

  // 1️⃣ Se tiver usuário logado, pega role
  const userData = await getOneUserProfile(email);
  try {
    if (userData?.user) {
      userId = userData.user.id;

      // TODO: UPDATE THIS LATER
      // if (userData.profile?.role === "louvor") topics.push("louvor");
      if (userData.profile?.roles.some((role) => ["admin"].includes(role))) {
        topics = ALL_ROLES;
      }
    }
  } catch (e) {
    console.warn("Nenhum usuário autenticado, registrando como visitante");
  }

  // 2️⃣ Verifica se email já existe
  const { data: existing } = await supabase
    .from("push_subscriptions")
    .select("id")
    .eq("endpoint", email)
    .single();

  if (!existing) {
    const { error } = await supabase.from("push_subscriptions").insert({
      endpoint: email,
      user_id: userId,
      topics,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      name: (userData?.user as any)?.name ?? null,
    });

    if (error) {
      console.error("Erro ao inscrever email:", error);
      return { success: false, error: error.message };
    }

    await sendEmail(
      "none",
      "Bem-vindo(a) a IPCatolé!",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      WelcomeEmail({ nome: (userData?.user as any)?.name ?? email }),
      email
    );
  }

  // TODO: SEND WELCOME EMAIL
  return { success: true, message: "Email salvo e registrado nos tópicos" };
};

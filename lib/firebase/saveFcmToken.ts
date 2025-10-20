"use server";
import { subscribeTopic } from "@/app/api/subscribeTopic";
import { createClient } from "../supabase/client";
import { getUserProfile } from "../supabase/getUserProfile";

export const saveFcmToken = async (token: string) => {
  const supabase = await createClient();

  let userId: string | null = null;
  const topics = ["igreja"]; // padrão: todos entram aqui

  // 1️⃣ Se tiver usuário logado, pega role
  try {
    const userData = await getUserProfile();

    if (userData?.user) {
      userId = userData.user.id;

      // TODO: UPDATE THIS LATER
      // if (userData.profile?.role === "louvor") topics.push("louvor");
      if (userData.profile?.role === "admin") topics.push("avisos", "louvor");
    }
  } catch (e) {
    console.warn("Nenhum usuário autenticado, registrando como visitante");
  }

  // 2️⃣ Verifica se token já existe
  const { data: existing } = await supabase
    .from("push_subscriptions")
    .select("id")
    .eq("endpoint", token)
    .single();

  if (!existing) {
    const { error } = await supabase.from("push_subscriptions").insert({
      endpoint: token,
      user_id: userId,
      topics,
    });

    if (error) {
      console.error("Erro ao salvar FCM token:", error);
      return { success: false, error: error.message };
    }
  }

  // 3️⃣ Inscrever nos tópicos no Firebase
  await subscribeTopic(token, topics);

  return { success: true, message: "Token salvo e registrado nos tópicos" };
};

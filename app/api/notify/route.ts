import { NextResponse } from "next/server";
import admin from "@/lib/firebase/firebaseAdmin";

export async function POST(req: Request) {
  try {
    const { topic, title, message } = await req.json();

    if (!topic || !message) {
      return NextResponse.json(
        { message: "topic e message são obrigatórios" },
        { status: 400 }
      );
    }

    await admin.messaging().send({
      topic,
      notification: {
        title,
        body: message,
        // TODO: CHECK THIS LATER (NOT PASSING THE RIGHT IMAGE TO PUSH NOTIFICATION)
        imageUrl: "https://ipcatole.org.br/favicon/android-chrome-192x192.png",
      },
    });

    return NextResponse.json({ message: "Notificação enviada com sucesso!" });
  } catch (err) {
    console.error("Erro na rota /api/notify:", err);
    return NextResponse.json(
      { message: "Erro interno ao enviar notificações" },
      { status: 500 }
    );
  }
}

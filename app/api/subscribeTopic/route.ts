import { NextResponse } from "next/server";
import admin from "@/lib/firebase/firebaseAdmin";

export async function POST(req: Request) {
  try {
    const { token, topics } = await req.json();
    if (!token || !Array.isArray(topics)) {
      return NextResponse.json(
        { message: "Token ou tópicos inválidos" },
        { status: 400 }
      );
    }

    for (const topic of topics) {
      await admin.messaging().subscribeToTopic(token, topic);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao inscrever em tópicos:", error);
    return NextResponse.json({ success: false, error });
  }
}

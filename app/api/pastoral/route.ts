import { NextResponse } from "next/server";
import mongoose from "mongoose";

if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI não configurada no arquivo .env");
}

// Conexão global para evitar múltiplas conexões durante o hot reload
let isConnected = false;
async function connectMongo() {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGODB_URI ?? "");
  isConnected = true;
}

// Definição do schema e model da devocional
const devotionalSchema = new mongoose.Schema(
  {
    author: { type: String, required: true },
    description: { type: String, required: true },
    title: { type: String, required: true },
  },
  { timestamps: true }
);

// Evita recriar o model em hot reload
const Devotional =
  mongoose.models.Devotional || mongoose.model("Devotional", devotionalSchema);

// Handler GET → retorna devocional
export async function GET() {
  try {
    await connectMongo();
    const data = await Devotional.findOne();

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar pergunta:", error);
    return NextResponse.json(
      { message: "Erro ao buscar pergunta" },
      { status: 500 }
    );
  }
}

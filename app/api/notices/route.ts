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

// Definição do schema e model do Aviso
const noticeSchema = new mongoose.Schema(
  {
    image: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    link: { type: String, required: true },
  },
  { timestamps: true }
);

// Evita recriar o model em hot reload
const Notice = mongoose.models.Notice || mongoose.model("Notice", noticeSchema);

// Handler GET → retorna avisos
export async function GET() {
  try {
    await connectMongo();

    const notices = await Notice.find().sort({ createdAt: -1 }).limit(8);

    return NextResponse.json(notices, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar avisos:", error);
    return NextResponse.json(
      { message: "Erro ao buscar avisos" },
      { status: 500 }
    );
  }
}

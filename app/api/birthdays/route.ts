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

// Definição do schema e model dos aniversários
const birthdaySchema = new mongoose.Schema(
  {
    date: { type: String, required: true },
  },
  { timestamps: true }
);

// Evita recriar o model em hot reload
const Birthday =
  mongoose.models.Birthday || mongoose.model("Birthday", birthdaySchema);

// Handler GET → retorna aniversários
export async function GET() {
  try {
    await connectMongo();
    const data = await Birthday.find();

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar aniversários:", error);
    return NextResponse.json(
      { message: "Erro ao buscar aniversários" },
      { status: 500 }
    );
  }
}

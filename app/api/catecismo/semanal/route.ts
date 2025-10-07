import { NextResponse } from "next/server";
import mongoose from "mongoose";
import breveCatecismo from "@/data/catecismo-breve";

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

// Definição do schema e model da pergunta semanal
const weeklyQuestionSchema = new mongoose.Schema(
  {
    question: { type: Number, required: true },
  },
  { timestamps: true }
);

// Evita recriar o model em hot reload
const WeeklyQuestion =
  mongoose.models.WeeklyQuestion ||
  mongoose.model("WeeklyQuestion", weeklyQuestionSchema);

// Handler GET → retorna pergunta semanal
export async function GET() {
  try {
    await connectMongo();
    const data = await WeeklyQuestion.findOne();

    const element = breveCatecismo.find(
      (item) => Number(item.number) === data?.question
    );

    if (!element) {
      return NextResponse.json(
        { message: "Pergunta não encontrada!" },
        { status: 400 }
      );
    }

    return NextResponse.json(element, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar pergunta:", error);
    return NextResponse.json(
      { message: "Erro ao buscar pergunta" },
      { status: 500 }
    );
  }
}

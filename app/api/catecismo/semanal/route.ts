import { NextRequest, NextResponse } from "next/server";
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

export async function PUT(req: NextRequest) {
  try {
    await connectMongo();

    const data = await req.json();

    // Limpa a pergunta antiga antes de adicionar uma nova
    await WeeklyQuestion.deleteOne();

    // Adiciona a nova pergunta
    const question = Number(data.question);
    const isValidQuestion = question >= 1 && question <= 107;

    if (isValidQuestion) {
      await WeeklyQuestion.create(data);
      return NextResponse.json(
        { message: "Pergunta Semanal atualizada com sucesso" },
        { status: 200 }
      );
    } else {
      throw new Error("Erro ao modificar Pergunta Semanal");
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        message:
          "Erro ao atualizar pergunta. Certifique-se de preencher todos os dados corretamente!",
      },
      { status: 500 }
    );
  }
}

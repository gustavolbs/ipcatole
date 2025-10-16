import { NextRequest, NextResponse } from "next/server";
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

// Definição do schema e model das campanhas
const campaignSchema = new mongoose.Schema(
  {
    isActive: { type: Boolean, required: true },
    description: { type: String, required: true, maxLength: 140 },
  },
  { timestamps: true }
);

// Evita recriar o model em hot reload
const Campaign =
  mongoose.models.Campaign || mongoose.model("Campaign", campaignSchema);

// Handler GET → retorna campanhas
export async function GET() {
  try {
    await connectMongo();
    const data = await Campaign.findOne();

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar campanhas:", error);
    return NextResponse.json(
      { message: "Erro ao buscar campanhas" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    await connectMongo();
    const data = await req.json();

    // Limpa a campanha antiga antes de adicionar uma nova
    await Campaign.deleteOne();

    // Adiciona a nova campanha
    await Campaign.create(data);
    return NextResponse.json(
      { message: "Campanha atualizada com sucesso" },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        message:
          "Erro ao atualizar campanha. Certifique-se de preencher todos os dados corretamente!",
      },
      { status: 500 }
    );
  }
}

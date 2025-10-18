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

// Definição do schema e model da devocional
const prayerRequestsSchema = new mongoose.Schema(
  {
    author: { type: String, required: false },
    description: { type: String, required: true },
    date: { type: String, required: true },
    answered: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Evita recriar o model em hot reload
const PrayerRequest =
  mongoose.models.PrayerRequest ||
  mongoose.model("PrayerRequest", prayerRequestsSchema);

// Handler GET → retorna pedidos de oração
export async function GET() {
  try {
    await connectMongo();
    const data = await PrayerRequest.find();

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar pedidos de oração:", error);
    return NextResponse.json(
      { message: "Erro ao buscar pedidos de oração" },
      { status: 500 }
    );
  }
}

// POST → Cria um novo pedido
export async function POST(req: NextRequest) {
  try {
    await connectMongo();
    const data = await req.json();

    delete data._id;

    const newPrayer = new PrayerRequest(data);
    await newPrayer.save();

    return NextResponse.json(
      { message: "Pedido de oração criado com sucesso" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro ao criar pedido de oração:", error);
    return NextResponse.json(
      { message: "Erro ao criar pedido de oração" },
      { status: 500 }
    );
  }
}

// PUT → Atualiza um pedido existente
export async function PUT(req: NextRequest) {
  try {
    await connectMongo();
    const data = await req.json();
    const { _id, ...updateData } = data;

    if (!_id) {
      return NextResponse.json(
        { message: "ID do pedido é obrigatório para atualização" },
        { status: 400 }
      );
    }

    const updated = await PrayerRequest.findByIdAndUpdate(_id, updateData, {
      new: true,
    });

    if (!updated) {
      return NextResponse.json(
        { message: "Pedido de oração não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Pedido de oração atualizado com sucesso" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao atualizar pedido de oração:", error);
    return NextResponse.json(
      { message: "Erro ao atualizar pedido de oração" },
      { status: 500 }
    );
  }
}

// DELETE → Remove um pedido existente
export async function DELETE(req: NextRequest) {
  try {
    await connectMongo();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "ID do pedido é obrigatório para exclusão" },
        { status: 400 }
      );
    }

    const deleted = await PrayerRequest.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { message: "Pedido de oração não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Pedido de oração removido com sucesso" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao deletar pedido de oração:", error);
    return NextResponse.json(
      { message: "Erro ao deletar pedido de oração" },
      { status: 500 }
    );
  }
}

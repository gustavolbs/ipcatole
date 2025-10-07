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

// Definição do schema e model dos eventos
const calendarSchema = new mongoose.Schema(
  {
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    name: { type: String, required: true },
    society: { type: String, required: true },
  },
  { timestamps: true }
);

// Evita recriar o model em hot reload
const Calendar =
  mongoose.models.Calendar || mongoose.model("Calendar", calendarSchema);

// Handler GET → retorna eventos
export async function GET() {
  try {
    await connectMongo();
    // Obtém o primeiro dia do mês atual
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    // Busca eventos com startDate >= primeiro dia do mês atual
    const data = await Calendar.find({
      startDate: { $gte: firstDayOfMonth.toISOString().slice(0, 10) },
    });

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar eventos:", error);
    return NextResponse.json(
      { message: "Erro ao buscar eventos" },
      { status: 500 }
    );
  }
}

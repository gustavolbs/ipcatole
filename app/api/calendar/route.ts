import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { Event } from "@/app/(protected)/midia/_components/Calendar";

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
    title: { type: String, required: true },
    society: { type: String, required: true },
    startTime: { type: String, required: true },
    location: { type: String, required: true },
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

export async function PUT(req: NextRequest) {
  try {
    await connectMongo();

    const events = await req.json();

    // Valida apenas eventos com todos os campos obrigatórios preenchidos
    const validEvents = events.filter(
      (event: Event) =>
        event.title?.trim() &&
        event.startDate?.trim() &&
        event.endDate?.trim() &&
        event.startTime?.trim() &&
        event.society?.trim() &&
        event.location?.trim()
    );

    if (validEvents.length === 0) {
      throw new Error("Nenhum evento válido para adicionar");
    }

    const newEvents = validEvents.map((event: Event) => ({
      title: event.title,
      startDate: event.startDate,
      endDate: event.endDate,
      startTime: event.startTime,
      society: event.society,
      location: event.location,
    }));
    // Limpa eventos antigos e adiciona os novos
    await Calendar.deleteMany();
    await Calendar.insertMany(newEvents);

    return NextResponse.json(
      { message: "Eventos atualizados com sucesso" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Erro ao atualizar eventos:", err);
    return NextResponse.json(
      {
        message:
          "Erro ao atualizar eventos. Certifique-se de preencher todos os campos corretamente!",
      },
      { status: 500 }
    );
  }
}

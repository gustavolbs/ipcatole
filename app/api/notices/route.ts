import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { type Notice as NoticeType } from "@/app/(non-protected)/(home)/_components";

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
    link: { type: String, required: false },
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

export async function PUT(req: NextRequest) {
  try {
    await connectMongo();

    const data = await req.json();

    // Adiciona os novos avisos
    const validNotices = data.filter(
      (notice: NoticeType) =>
        notice.title?.trim() &&
        notice.image?.trim() &&
        notice.description?.trim()
    );
    // Apaga todos os avisos antes de adicionar um novo conjunto
    if (validNotices.length > 0) {
      const newNotices = validNotices.map((notice: NoticeType) => ({
        title: notice.title,
        ...(notice.link ? { link: notice.link } : {}),
        description: notice.description,
        image: notice.image,
      }));
      await Notice.deleteMany();
      await Notice.insertMany(newNotices);

      return NextResponse.json(
        { message: "Avisos atualizados com sucesso" },
        { status: 200 }
      );
    }
    throw new Error("Nenhum aviso válido para adicionar");
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        message:
          "Erro ao atualizar avisos. Certifique-se de preencher todos os dados corretamente!",
      },
      { status: 500 }
    );
  }
}

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

// Definição do schema e model do vídeo
const videoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    link: { type: String, required: true },
  },
  { timestamps: true }
);

// Evita recriar o model em hot reload
const Video = mongoose.models.Video || mongoose.model("Video", videoSchema);

// Handler GET → retorna vídeos em destaque
export async function GET() {
  try {
    await connectMongo();

    const videos = await Video.find()
      .sort({ updatedAt: -1 })
      .limit(5)
      .select("_id title link");

    const data = videos.map((v) => ({
      _id: v._id.toString(),
      title: v.title,
      link: v.link,
    }));

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar vídeos:", error);
    return NextResponse.json(
      { message: "Erro ao buscar vídeos em destaque" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { type FeaturedVideo } from "@/app/(non-protected)/(home)/_components";

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

export async function PUT(req: NextRequest) {
  try {
    await connectMongo();
    const data = await req.json();

    // Adiciona os novos vídeos
    const validVideos = data.filter(
      (video: FeaturedVideo) => video.link !== "" && video.title !== ""
    );
    // Apaga todos os videos antes de adicionar um novo conjunto
    if (validVideos.length > 0) {
      const newVideos = validVideos.map((video: FeaturedVideo) => ({
        title: video.title,
        link: video.link,
      }));
      await Video.deleteMany();
      await Video.insertMany(newVideos);

      return NextResponse.json(
        { message: "Vídeos em destaque atualizados com sucesso" },
        { status: 200 }
      );
    }
    throw new Error("Nenhum vídeo válido para adicionar");
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        message:
          "Erro ao atualizar vídeos em destaque. Certifique-se de preencher todos os dados corretamente!",
      },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { type ImageSchema } from "@/app/(non-protected)/(home)/_components";

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

// Definição do schema e model da galeria
const gallerySchema = new mongoose.Schema(
  {
    description: { type: String, required: true },
    link: { type: String, required: true },
  },
  { timestamps: true }
);

// Evita recriar o model em hot reload
const Gallery =
  mongoose.models.Gallery || mongoose.model("Gallery", gallerySchema);

// Handler GET → retorna galeria
export async function GET() {
  try {
    await connectMongo();

    const galleries = await Gallery.find().sort({ createdAt: -1 }).limit(8);

    const data = galleries.map((g) => ({
      _id: g._id.toString(),
      description: g.description,
      link: g.link,
    }));

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar galeria:", error);
    return NextResponse.json(
      { message: "Erro ao buscar galeria" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    await connectMongo();

    const data = await req.json();

    // Adiciona a nova galeria
    const validImages = data.filter(
      (image: ImageSchema) => image.description?.trim() && image.link?.trim()
    );
    // Apaga toda a galeria antes de adicionar a nova
    if (validImages.length > 0) {
      const newFeed = validImages.map((image: ImageSchema) => ({
        description: image.description,
        link: image.link,
      }));
      await Gallery.deleteMany();
      await Gallery.insertMany(newFeed);

      return NextResponse.json(
        { message: "Galeria atualizada com sucesso" },
        { status: 200 }
      );
    }
    throw new Error("Nenhuma imagem válida para adicionar");
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        message:
          "Erro ao atualizar galeria. Certifique-se de preencher todos os dados corretamente!",
      },
      { status: 500 }
    );
  }
}

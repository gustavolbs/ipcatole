import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { AnniversaryItem } from "@/app/(non-protected)/(home)/_components";

if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI não configurada no arquivo .env");
}

let isConnected = false;
async function connectMongo() {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGODB_URI ?? "");
  isConnected = true;
}

const Member =
  mongoose.models.Member ||
  mongoose.model(
    "Member",
    new mongoose.Schema({
      name: String,
      email: String,
      phone: String,
      birthDate: String,
      married: Boolean,
      spouseName: String,
      spouseId: { type: mongoose.Schema.Types.ObjectId, ref: "Member" },
      marriageDate: String,
    })
  );

export async function GET(req: NextRequest) {
  try {
    await connectMongo();
    const { searchParams } = new URL(req.url);
    const start = searchParams.get("start");
    const end = searchParams.get("end");

    if (!start || !end) {
      return NextResponse.json(
        { message: "Datas de início e fim são obrigatórias" },
        { status: 400 }
      );
    }

    const startDate = new Date(start);
    const endDate = new Date(end);

    const members = await Member.find().populate("spouseId");

    const aniversariantes: AnniversaryItem[] = [];

    members.forEach((m) => {
      const currentYear = new Date().getFullYear();

      // Verifica aniversário de nascimento
      const birth = new Date(`${currentYear}-${m.birthDate.slice(5)}`);
      if (birth >= startDate && birth <= endDate) {
        aniversariantes.push({
          type: "birthday",
          member: {
            _id: m._id,
            name: m.name,
            birthDate: m.birthDate,
          },
        });
      }

      // Verifica aniversário de casamento
      if (m.married && m.marriageDate) {
        const marriage = new Date(`${currentYear}-${m.marriageDate.slice(5)}`);
        if (marriage >= startDate && marriage <= endDate) {
          if (m.spouseId) {
            // Casal completo → agrupa ambos
            // Evita duplicação: só adiciona se _id < spouseId para não repetir
            if (m._id.toString() < m.spouseId._id.toString()) {
              aniversariantes.push({
                type: "marriage",
                couple: [
                  { _id: m._id, name: m.name },
                  { _id: m.spouseId._id, name: m.spouseId.name },
                ],
                marriageDate: m.marriageDate,
              });
            }
          } else {
            // Apenas um membro → exibe sozinho com spouseName
            aniversariantes.push({
              type: "marriage",
              member: { _id: m._id, name: m.name },
              spouseName: m.spouseName,
              marriageDate: m.marriageDate,
            });
          }
        }
      }
    });

    return NextResponse.json(aniversariantes, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar aniversariantes:", error);
    return NextResponse.json(
      { message: "Erro ao buscar aniversariantes" },
      { status: 500 }
    );
  }
}

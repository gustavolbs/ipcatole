import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI não configurada no arquivo .env");
}

// Conexão global
let isConnected = false;
async function connectMongo() {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGODB_URI ?? "");
  isConnected = true;
}

// Schema e Model de Membro
const memberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: false },
    phone: { type: String, required: false },
    birthDate: { type: String, required: true }, // formato YYYY-MM-DD
    married: { type: Boolean, default: false },
    spouseName: { type: String, required: false },
    spouseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
      required: false,
    },
    marriageDate: { type: String, required: false }, // formato YYYY-MM-DD
  },
  { timestamps: true }
);

const Member = mongoose.models.Member || mongoose.model("Member", memberSchema);

type MemberQuery = {
  _id?: string;
  name?: { $regex: RegExp };
  email?: { $regex: RegExp };
};

// GET → Busca todos ou filtra
export async function GET(req: NextRequest) {
  try {
    await connectMongo();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const email = searchParams.get("email");

    const query: MemberQuery = {};
    if (id) {
      query._id = id;
    } else {
      if (name) query.name = { $regex: new RegExp(name, "i") };
      if (email) query.email = { $regex: new RegExp(email, "i") };
    }

    const members = await Member.find(query);

    return NextResponse.json(members, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar membros:", error);
    return NextResponse.json(
      { message: "Erro ao buscar membros" },
      { status: 500 }
    );
  }
}

// POST → Cria novo membro
export async function POST(req: NextRequest) {
  try {
    await connectMongo();
    const data = await req.json();
    delete data._id;

    // Se spouseId for "", transforma em undefined
    if (data.spouseId === "") {
      data.spouseId = undefined;
    }

    const newMember = new Member(data);
    await newMember.save();

    return NextResponse.json(
      { message: "Membro criado com sucesso" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro ao criar membro:", error);
    return NextResponse.json(
      { message: "Erro ao criar membro" },
      { status: 500 }
    );
  }
}

// PUT → Atualiza membro
export async function PUT(req: NextRequest) {
  try {
    await connectMongo();
    const data = await req.json();
    const { _id, ...updateData } = data;

    if (!_id) {
      return NextResponse.json(
        { message: "ID do membro é obrigatório" },
        { status: 400 }
      );
    }

    // Normaliza spouseId
    if (updateData.spouseId === "") {
      updateData.spouseId = undefined;
    }

    const updated = await Member.findByIdAndUpdate(_id, updateData, {
      new: true,
    });

    if (!updated) {
      return NextResponse.json(
        { message: "Membro não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Membro atualizado com sucesso" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao atualizar membro:", error);
    return NextResponse.json(
      { message: "Erro ao atualizar membro" },
      { status: 500 }
    );
  }
}

// DELETE → Remove membro
export async function DELETE(req: NextRequest) {
  try {
    await connectMongo();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "ID do membro é obrigatório" },
        { status: 400 }
      );
    }

    const deleted = await Member.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { message: "Membro não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Membro removido com sucesso" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao deletar membro:", error);
    return NextResponse.json(
      { message: "Erro ao deletar membro" },
      { status: 500 }
    );
  }
}

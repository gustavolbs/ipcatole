import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { createServer } from "@/lib/supabase/server";

async function getEmailsForTopic(
  topic: string
): Promise<{ endpoint: string; name: string }[]> {
  const supabase = createServer();
  const { data, error } = await (await supabase)
    .from("push_subscriptions")
    .select("endpoint, name")
    .contains("topics", [topic]);

  if (error) {
    console.error("Erro ao buscar emails para o tópico:", error);
    return [];
  }

  return data ?? [];
}

// Envio em paralelo com limite seguro (5 simultâneos)
async function sendEmailsInBatches(
  emails: { endpoint: string; name: string }[],
  title: string,
  message: string
) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  const batchSize = 5; // máximo de e-mails simultâneos
  for (let i = 0; i < emails.length; i += batchSize) {
    const batch = emails.slice(i, i + batchSize);

    await Promise.allSettled(
      batch.map(async ({ endpoint: email, name }) => {
        try {
          const res = await transporter.sendMail({
            from: `"IPCatolé" <${process.env.GMAIL_USER}>`,
            to: email,
            subject: title || "Notificação IPCatolé",
            html: message,
          });

          console.log(`✅ Email enviado para ${email}`, res.messageId);
        } catch (err) {
          console.error(`❌ Falha ao enviar para ${email}:`, err);
        }
      })
    );

    // pequena pausa entre os lotes para não sobrecarregar o Gmail
    if (i + batchSize < emails.length) {
      await new Promise((resolve) => setTimeout(resolve, 1500));
    }
  }
}

export async function POST(req: Request) {
  try {
    const { topic, title, message, destination } = await req.json();

    if (!topic || !message) {
      return NextResponse.json(
        { message: "topic e message são obrigatórios" },
        { status: 400 }
      );
    }

    const emails =
      topic === "none"
        ? [{ endpoint: destination ?? "", name: "" }]
        : await getEmailsForTopic(topic);

    if (!emails.length) {
      return NextResponse.json(
        { message: "Nenhum destinatário encontrado para este tópico." },
        { status: 404 }
      );
    }

    // ✅ responde ao cliente imediatamente
    setImmediate(() => {
      sendEmailsInBatches(emails, title, message)
        .then(() =>
          console.log(`🎉 Envio finalizado: ${emails.length} destinatários`)
        )
        .catch((err) => console.error("Erro no envio em background:", err));
    });

    return NextResponse.json({
      message: `Envio iniciado para ${emails.length} destinatário(s).`,
    });
  } catch (err) {
    console.error("Erro na rota /api/sendEmail:", err);
    return NextResponse.json(
      { message: "Erro interno ao agendar notificações" },
      { status: 500 }
    );
  }
}

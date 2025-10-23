import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { createServer } from "@/lib/supabase/server";

export const runtime = "nodejs"; // ⚠️ necessário para Gmail (não roda em Edge)

// Busca emails do tópico
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

// Envio em paralelo com limite de 5
async function sendEmailsInBatches(
  emails: { endpoint: string; name: string }[],
  title: string,
  message: string
) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  // 🔍 Verifica conexão SMTP (importante na Vercel)
  await new Promise((resolve, reject) => {
    transporter.verify((error, success) => {
      if (error) {
        console.error("Erro na verificação SMTP:", error);
        reject(error);
      } else {
        console.log("✅ Servidor SMTP pronto:", success);
        resolve(success);
      }
    });
  });

  const batchSize = 5;

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

  console.log(`🎉 Envio concluído (${emails.length} destinatários)`);
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

    // 💡 dispara a Promise de envio, mas sem bloquear a resposta
    sendEmailsInBatches(emails, title, message).catch((err) =>
      console.error("Erro no envio:", err)
    );

    // retorna rápido ao cliente
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

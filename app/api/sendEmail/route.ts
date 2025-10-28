import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createServer } from "@/lib/supabase/server";

const resend = new Resend(process.env.RESEND_API_KEY);

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

async function sendEmailsInBatches(
  emails: { endpoint: string; name: string }[],
  title: string,
  message: string
) {
  const batchSize = 100;
  const results: { success: string[]; failed: string[] } = {
    success: [],
    failed: [],
  };

  for (let i = 0; i < emails.length; i += batchSize) {
    const batch = emails.slice(i, i + batchSize);

    const batchData = batch.map(({ endpoint: email, name }) => ({
      from: `"IPCatolé" <${process.env.RESEND_USER}>`,
      to: email,
      subject: title || "Notificação IPCatolé",
      html: message,
    }));

    try {
      const { data } = await resend.batch.send(batchData, {
        batchValidation: "permissive",
      });

      if (data?.errors) {
        // Resend retorna um array com status de cada envio
        data?.errors.forEach((fail: object, idx: number) => {
          return {
            ...fail,
            email: batch[idx].endpoint,
          };
        });

        console.error("Erro no envio do lote:", data?.errors);
      }
    } catch (err) {
      console.error("Erro inesperado no envio do lote:", err);
      results.failed.push(...batch.map((b) => b.endpoint));
    }

    // pausa leve entre lotes (evita bursts)
    if (i + batchSize < emails.length) {
      await new Promise((r) => setTimeout(r, 1500));
    }
  }

  return results;
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

    // Envia em background
    setImmediate(() => {
      sendEmailsInBatches(emails, title, message);
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

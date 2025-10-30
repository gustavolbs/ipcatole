import { EscalaEmailProps } from "./types";

export const EscalaEmailHTML = ({
  nome,
  categoria,
  data,
  titulo,
  responsaveis,
}: EscalaEmailProps) => {
  const bgPage = "hsl(40, 35%, 92%)";
  const bgCard = "hsl(45, 40%, 88%)";
  const border = "hsl(40, 25%, 75%)";
  const green = "hsl(150, 55%, 42%)";
  const text = "hsl(150, 45%, 20%)";
  const muted = "hsl(150, 20%, 40%)";
  const badge = "#e4d7b8";

  const equipeList = (responsaveis ?? [])
    .map(
      (r) => `
        <li style="margin:0; padding:12px 14px; border-bottom:1px solid ${border}; font-size:14px; list-style:none; color:${text};">✓ ${r}</li>`
    )
    .join("");

  return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Nova Escala</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: ${bgPage}; color: ${text}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6;">
    <div style="max-width: 640px; margin: 0 auto; padding: 24px 16px;">
      <div style="background: linear-gradient(135deg, ${green}, hsl(150, 60%, 38%)); padding: 32px 24px; text-align: center; border-radius: 16px 16px 0 0; box-shadow: 0 12px 42px -14px ${green}33;">
        <h1 style="font-size: 26px; font-weight: 700; color: #ffffff; margin: 0;">📋 Nova Escala Disponível</h1>
      </div>

      <div style="background: ${bgCard}; border: 1px solid ${border}; border-top: none; border-radius: 0 0 16px 16px; padding: 32px 28px;">
        <p style="margin: 0 0 14px; font-size: 18px;">Olá, <strong>${nome || "irmão(ã)"}!</strong></p>
        <p style="margin: 0 0 18px;">Uma nova escala foi publicada para <strong>${categoria || ""}</strong>.</p>

        ${titulo ? `<h2 style="margin: 0 0 16px; font-size: 20px; color: ${green};">${titulo}</h2>` : ""}

        <div style="background: ${green}; color: #ffffff; padding: 18px; border-radius: 12px; margin: 16px 0 22px;">
          <p style="margin: 0; font-size: 14px;"><strong>📅 Data:</strong> ${data || ""}</p>
          <p style="margin: 8px 0 0; font-size: 14px;"><strong>🏷️ Categoria:</strong> ${categoria || ""}</p>
        </div>

        <div style="margin: 0 0 20px;">
          <div style="background-color: ${badge}; padding: 12px 16px; border-radius: 10px 10px 0 0; border-left: 4px solid ${green};">
            <strong style="color: ${green};">👥 Equipe Escalada</strong>
          </div>
          <ul style="margin: 0; padding: 0; border: 1px solid ${border}; border-top: none; border-radius: 0 0 10px 10px; overflow: hidden; list-style: none;">
            ${
              equipeList ||
              `<li style="margin:0; padding:12px 14px; font-size:14px; color:${muted}; list-style:none;">—</li>`
            }
          </ul>
        </div>

        <div style="background-color: #efe3c6; border-left: 4px solid #d7b56f; padding: 12px 16px; border-radius: 10px; font-size: 14px;">
          <strong>⚠️ Importante:</strong> Por favor, confirme sua presença ou avise com antecedência caso não possa comparecer.
        </div>

        <p style="margin: 24px 0 8px;">Contamos com você!</p>
        <p style="margin: 0; font-weight: 700;">Equipe de Coordenação</p>
      </div>

      <div style="text-align: center; margin-top: 24px; color: ${muted}; font-size: 12px;">
        Este é um email automático. Para alterar suas preferências de notificação, acesse as configurações.
      </div>
    </div>
  </body>
</html>
  `.trim();
};

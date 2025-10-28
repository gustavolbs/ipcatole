import { EscalaEmailProps } from "./types";

export const EscalaEmailHTML = ({
  nome,
  categoria,
  data,
  titulo,
  responsaveis,
}: EscalaEmailProps) => {
  // cores equivalentes às que você usava
  const bgPage = "#f4f0e6"; // hsl(40,35%,92%)
  const bgCard = "#f8f3e2"; // hsl(45,40%,88%)
  const border = "#d6c9a9"; // hsl(40,25%,75%)
  const green = "#30a66b"; // hsl(150,55%,42%)
  const text = "#1f3b2c"; // hsl(150,45%,20%)
  const muted = "#567360"; // hsl(150,20%,40%)
  const badge = "#e4d7b8";

  const equipeRows = (responsaveis ?? [])
    .map(
      (r) => `
        <tr>
          <td style="padding:10px 14px; border-bottom:1px solid ${border}; font-size:14px;">✓ ${r}</td>
        </tr>`
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
  <body style="margin:0; padding:0; background-color:${bgPage}; color:${text}; font-family:Arial, Helvetica, sans-serif; line-height:1.6;">
    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" align="center" style="background-color:${bgPage};">
      <tr>
        <td align="center" style="padding:24px 12px;">
          <table role="presentation" width="700" border="0" cellspacing="0" cellpadding="0" style="max-width:700px; width:100%;">
            <!-- Header sólido (sem gradiente) -->
            <tr>
              <td align="center" bgcolor="${green}" style="padding:28px 20px; border-radius:12px 12px 0 0;">
                <span style="font-size:26px; font-weight:700; color:#ffffff; display:block;">📋 Nova Escala Disponível</span>
              </td>
            </tr>

            <!-- Card -->
            <tr>
              <td bgcolor="${bgCard}" style="border:1px solid ${border}; border-top:none; border-radius:0 0 12px 12px; padding:32px 28px;">
                <p style="margin:0 0 14px; font-size:18px;">Olá, <strong>${
                  nome || "irmão(ã)"
                }!</strong></p>
                <p style="margin:0 0 18px;">Uma nova escala foi publicada para <strong>${
                  categoria || ""
                }</strong>.</p>

                <!-- Título da escala -->
                ${
                  titulo
                    ? `<h2 style="margin:0 0 12px; font-size:20px; color:${green};">${titulo}</h2>`
                    : ""
                }

                <!-- Bloco de data/categoria -->
                <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin:16px 0 22px 0;">
                  <tr>
                    <td bgcolor="${green}" style="color:#ffffff; padding:16px; border-radius:10px;">
                      <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                          <td style="font-size:14px; padding:2px 0;"><strong>📅 Data:</strong> ${
                            data || ""
                          }</td>
                        </tr>
                        <tr>
                          <td style="font-size:14px; padding:6px 0 0 0;"><strong>🏷️ Categoria:</strong> ${
                            categoria || ""
                          }</td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>

                <!-- Equipe -->
                <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin:0 0 18px 0;">
                  <tr>
                    <td style="background-color:${badge}; padding:12px 16px; border-radius:8px 8px 0 0; border-left:4px solid ${green};">
                      <strong style="color:${green};">👥 Equipe Escalada</strong>
                    </td>
                  </tr>
                  <tr>
                    <td style="border:1px solid ${border}; border-top:none; border-radius:0 0 8px 8px;">
                      <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                        ${
                          equipeRows ||
                          `<tr><td style="padding:12px 14px; font-size:14px; color:${muted};">—</td></tr>`
                        }
                      </table>
                    </td>
                  </tr>
                </table>

                <!-- Aviso -->
                <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin:8px 0 18px 0;">
                  <tr>
                    <td style="background-color:#efe3c6; border-left:4px solid #d7b56f; padding:12px; border-radius:6px;">
                      <span style="font-size:14px;"><strong>⚠️ Importante:</strong> Por favor, confirme sua presença ou avise com antecedência caso não possa comparecer.</span>
                    </td>
                  </tr>
                </table>

                <p style="margin:18px 0 6px;">Contamos com você!</p>
                <p style="margin:0; font-weight:700;">Equipe de Coordenação</p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td align="center" style="padding:16px; color:${muted}; font-size:12px;">
                Este é um email automático. Para alterar suas preferências de notificação, acesse as configurações.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
  `.trim();
};

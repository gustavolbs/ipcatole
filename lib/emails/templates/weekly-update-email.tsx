interface WeeklyUpdateEmailBaseProps {
  htmlContent: string;
}

export const WeeklyUpdateEmailHTML = ({
  htmlContent,
}: WeeklyUpdateEmailBaseProps) => {
  return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Atualização Semanal</title>
  </head>
  <body style="margin:0; padding:0; background-color:#f4f0e6; font-family: Arial, Helvetica, sans-serif; color:#1f3b2c;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" align="center" style="max-width:700px; margin:auto; background-color:#f4f0e6;">
      <tr>
        <td align="center" bgcolor="#30a66b" style="padding:30px 20px; border-radius:12px 12px 0 0;">
          <h1 style="color:#ffffff; margin:0; font-size:26px; font-weight:600;">📰 Atualização Semanal</h1>
        </td>
      </tr>

      <tr>
        <td bgcolor="#f8f3e2" style="padding:40px 30px; border:1px solid #d6c9a9; border-top:none; border-radius:0 0 12px 12px;">
          ${htmlContent}
        </td>
      </tr>

      <tr>
        <td align="center" style="padding:20px; color:#567360; font-size:12px;">
          Este é um email automático. Para alterar suas preferências de notificação, acesse as configurações.
        </td>
      </tr>
    </table>
  </body>
</html>
  `.trim();
};

export const WeeklyUpdateEmailTEXT = (htmlContent: string) => {
  const text = htmlContent
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();

  return `
Atualização Semanal

${text}

Equipe de Comunicação
  `.trim();
};

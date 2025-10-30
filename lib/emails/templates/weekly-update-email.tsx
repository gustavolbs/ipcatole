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
  <body style="margin: 0; padding: 0; background-color: hsl(40, 35%, 92%); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: hsl(150, 45%, 20%);">
    <div style="max-width: 640px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, hsl(150, 55%, 42%), hsl(150, 60%, 38%)); padding: 32px 24px; text-align: center; border-radius: 16px 16px 0 0; box-shadow: 0 12px 40px -12px hsl(150, 55%, 42%, 0.3);">
        <h1 style="color: #ffffff; margin: 0; font-size: 26px; font-weight: 600;">📰 Atualização Semanal</h1>
      </div>

      <div style="background: hsl(45, 40%, 88%); padding: 36px 28px; border: 1px solid hsl(40, 25%, 75%); border-top: none; border-radius: 0 0 16px 16px;">
        <div style="color: hsl(150, 45%, 20%); font-size: 16px; line-height: 1.6;">
          ${htmlContent}
        </div>
      </div>

      <div style="text-align: center; margin-top: 24px; color: hsl(150, 20%, 40%); font-size: 12px;">
        Este é um email automático. Para alterar suas preferências de notificação, acesse as configurações.
      </div>
    </div>
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

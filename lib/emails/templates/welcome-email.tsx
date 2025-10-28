interface WelcomeEmailProps {
  nome: string;
}

export const WelcomeEmail = ({ nome }: WelcomeEmailProps) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Bem-vindo!</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: hsl(150, 45%, 20%); max-width: 600px; margin: 0 auto; padding: 20px; background-color: hsl(40, 35%, 92%);">
  <div style="background: linear-gradient(135deg, hsl(150, 55%, 42%), hsl(150, 60%, 38%)); padding: 40px; text-align: center; border-radius: 12px 12px 0 0; box-shadow: 0 10px 40px -10px hsl(150, 55%, 42%, 0.3);">
    <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 600;">Bem-vindo à Nossa Comunidade!</h1>
  </div>
  
  <div style="background: hsl(45, 40%, 88%); padding: 40px; border: 1px solid hsl(40, 25%, 75%); border-top: none; border-radius: 0 0 12px 12px;">
    <p style="font-size: 18px; margin-bottom: 20px; color: hsl(150, 45%, 20%);">Olá, <strong>${nome}</strong>!</p>
    
    <p style="color: hsl(150, 45%, 20%);">Obrigado por se inscrever para receber nossas notificações por email. Estamos muito felizes em tê-lo(a) conosco!</p>
    
    <p style="color: hsl(150, 45%, 20%);">A partir de agora, você receberá:</p>
    
    <ul style="background: hsl(40, 30%, 80%); padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid hsl(150, 55%, 42%);">
      <li style="margin-bottom: 10px; color: hsl(150, 45%, 20%);">📅 <strong>Escalas de Serviço</strong> - Quando você for escalado(a) para servir</li>
      <li style="margin-bottom: 10px; color: hsl(150, 45%, 20%);">📰 <strong>Atualizações Semanais</strong> - Resumo das atividades da igreja</li>
      <li style="margin-bottom: 10px; color: hsl(150, 45%, 20%);">🎉 <strong>Eventos Especiais</strong> - Informações sobre eventos e celebrações</li>
    </ul>
    
    <p style="color: hsl(150, 45%, 20%);">Você pode gerenciar suas preferências de email a qualquer momento através do link abaixo:</p>
    
    <div style="text-align: center; margin: 30px 0;">
      <a href="${process.env.NEXT_PUBLIC_BASE_URL}/preferences" style="background: linear-gradient(135deg, hsl(150, 55%, 42%), hsl(150, 60%, 38%)); color: white; padding: 14px 30px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: 600; box-shadow: 0 4px 12px hsl(150, 40%, 25%, 0.15);">Gerenciar Preferências</a>
    </div>
    
    <p style="margin-top: 30px; color: hsl(150, 45%, 20%);">Que Deus abençoe!</p>
    <p style="font-weight: 600; color: hsl(150, 45%, 20%);">Equipe da Igreja</p>
  </div>
  
  <div style="text-align: center; margin-top: 20px; color: hsl(150, 20%, 40%); font-size: 12px;">
    <p>Se você não solicitou esta inscrição, pode ignorar este email.</p>
  </div>
</body>
</html>
  `.trim();
};

export const getWelcomeEmailText = (nome: string) => {
  return `
Olá, ${nome}!

Obrigado por se inscrever para receber nossas notificações por email. Estamos muito felizes em tê-lo(a) conosco!

A partir de agora, você receberá:
• Escalas de Serviço - Quando você for escalado(a) para servir
• Atualizações Semanais - Resumo das atividades da igreja
• Eventos Especiais - Informações sobre eventos e celebrações

Você pode gerenciar suas preferências de email a qualquer momento.

Que Deus abençoe!
Equipe da Igreja
  `.trim();
};

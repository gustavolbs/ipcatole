import { Card, CardContent, CardHeader } from "@/components/ui/card";
import SignInWithGoogle from "./_components/SignInWithGoogle";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - Área Protegida",
  description: "Faça login para acessar a área protegida do site.",
};

export default async function LoginPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Área Protegida</h1>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <h2 className="text-xl font-semibold">Para ter acesso, faça login</h2>
        </CardHeader>
        <CardContent>
          <SignInWithGoogle />
        </CardContent>
      </Card>
    </div>
  );
}

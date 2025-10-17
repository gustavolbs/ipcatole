import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mídia",
  description: "Gerencie o conteúdo da página inicial por aqui.",
};

export default function MidiaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Link href="/dashboard">
        <Button variant="ghost" className="mb-6 flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" /> Voltar ao dashboard
        </Button>
      </Link>

      {children}
    </>
  );
}

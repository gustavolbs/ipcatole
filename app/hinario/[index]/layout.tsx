import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
export default function HinarioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/hinario">
            <Button variant="ghost" className="mb-6 flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" /> Voltar ao índice
            </Button>
          </Link>

          <>{children}</>
        </div>
      </div>
    </div>
  );
}

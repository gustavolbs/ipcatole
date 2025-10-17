import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const generateMetadata = async (props: {
  params: Promise<{ type: string }>;
}): Promise<Metadata> => {
  const { type } = await props.params;
  const isShort = type === "breve";
  return {
    title: `${isShort ? "Breve Catecismo" : "Catecismo Maior"}`,
  };
};
export default async function CatecismoLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <BookOpen className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold">
              {type === "breve" ? "Breve Catecismo" : "Catecismo Maior"}
            </h1>
          </div>

          <Link href="/catecismo" className="flex w-fit">
            <Button variant="ghost" className="mb-6 flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" /> Voltar
            </Button>
          </Link>

          <>{children}</>
        </div>
      </div>
    </div>
  );
}

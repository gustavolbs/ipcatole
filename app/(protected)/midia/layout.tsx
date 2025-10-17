import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mídia",
  description: "Gerencie o conteúdo da página inicial por aqui.",
};

export default function MidiaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

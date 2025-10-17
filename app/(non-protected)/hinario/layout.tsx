import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hinário Novo Cântico",
};

export default function HinarioLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}

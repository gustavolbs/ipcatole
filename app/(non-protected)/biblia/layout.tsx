import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bíblia",
};

export default function BibliaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

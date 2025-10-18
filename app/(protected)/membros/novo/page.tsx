import { getMembers } from "@/app/api";
import MemberForm from "../_components/MemberForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Adicionar Membro | IPCatolé",
  description: "Adicione membros aqui.",
};
export default async function NovoMembroPage() {
  const members = await getMembers();
  return <MemberForm members={members} />;
}

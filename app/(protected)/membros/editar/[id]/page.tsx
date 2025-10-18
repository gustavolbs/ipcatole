import { getMember, getMembers } from "@/app/api";
import MemberForm from "../../_components/MemberForm";
import { Metadata } from "next";

type Props = { params: { id: string } };

export const metadata: Metadata = {
  title: "Editar Membro | IPCatolé",
  description: "Edite membros aqui.",
};

export default async function EditarMembroPage({ params }: Props) {
  const member = await getMember(params.id);
  const members = await getMembers();
  return <MemberForm initialMember={member[0]} members={members} />;
}

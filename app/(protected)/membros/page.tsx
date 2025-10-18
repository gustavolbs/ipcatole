import { getMembers } from "@/app/api";
import MembersTable from "./_components/MembersTable";

export const revalidate = 0; // Sempre buscar dados atualizados

export type Member = {
  _id?: string;
  name: string;
  email?: string;
  phone?: string;
  birthDate: string; // YYYY-MM-DD
  married?: boolean;
  spouseName?: string;
  spouseId?: string;
  marriageDate?: string; // YYYY-MM-DD
};

const MembrosPage = async () => {
  const members = await getMembers();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <MembersTable initialMembers={members} />
      </div>
    </div>
  );
};

export default MembrosPage;

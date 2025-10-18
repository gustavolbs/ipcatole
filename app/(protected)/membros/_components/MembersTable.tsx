"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Edit, Trash2, UserPlus, Search } from "lucide-react";
import { deleteMember } from "@/app/api";
import { Member } from "../page";
import Link from "next/link";
import { formatDate } from "@/app/(non-protected)/(home)/_components/Calendar/utils";

interface MembersTableProps {
  initialMembers: Member[];
}

const MembersTable: React.FC<MembersTableProps> = ({ initialMembers }) => {
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [searchTerm, setSearchTerm] = useState("");

  const handleDeleteMember = async (member: Member) => {
    try {
      await deleteMember(member);
      const updatedMembers = members.filter((m) => m._id !== member._id);
      setMembers(updatedMembers);
      toast.success("Membro removido com sucesso!");
    } catch (err) {
      toast.error("Erro ao remover membro.");
    }
  };

  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (member.email &&
        member.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <Card className="shadow-card">
      <CardHeader>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <CardTitle className="text-2xl">Gestão de Membros</CardTitle>
            <CardDescription>
              Visualize e gerencie os membros da igreja
            </CardDescription>
          </div>
          <Link href="/membros/novo">
            <Button className="gap-2">
              <UserPlus className="h-4 w-4" />
              Adicionar Membro
            </Button>
          </Link>
        </div>
        <div className="mt-4 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome ou email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Casado</TableHead>
                <TableHead>Aniversário</TableHead>
                <TableHead>Casamento</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMembers.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-8 text-muted-foreground"
                  >
                    {searchTerm
                      ? "Nenhum membro encontrado"
                      : "Nenhum membro cadastrado"}
                  </TableCell>
                </TableRow>
              ) : (
                filteredMembers.map((member) => (
                  <TableRow key={member._id}>
                    <TableCell className="font-medium">{member.name}</TableCell>
                    <TableCell>{member.email}</TableCell>
                    <TableCell>{member.phone}</TableCell>
                    <TableCell>
                      {member.married ? member.spouseName || "Sim" : "Não"}
                    </TableCell>
                    <TableCell>{formatDate(member.birthDate)}</TableCell>
                    <TableCell>
                      {(member.marriageDate &&
                        formatDate(member.marriageDate)) ||
                        "-"}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/membros/editar/${member._id}`}>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteMember(member)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default MembersTable;

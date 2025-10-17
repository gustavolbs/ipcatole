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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Users,
  TrendingUp,
  Calendar,
  BookOpen,
  Video,
  Edit,
  Trash2,
  UserPlus,
  BarChart3,
  FileText,
  Music,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  joinDate: string;
  status: "active" | "inactive";
}

const Dashboard = () => {
  const [members, setMembers] = useState<Member[]>([
    {
      id: "1",
      name: "João Silva",
      email: "joao@email.com",
      phone: "(11) 98765-4321",
      role: "Membro",
      joinDate: "2020-01-15",
      status: "active",
    },
    {
      id: "2",
      name: "Maria Santos",
      email: "maria@email.com",
      phone: "(11) 98765-1234",
      role: "Presbítero",
      joinDate: "2018-05-20",
      status: "active",
    },
    {
      id: "3",
      name: "Pedro Costa",
      email: "pedro@email.com",
      phone: "(11) 98765-5678",
      role: "Diácono",
      joinDate: "2019-03-10",
      status: "active",
    },
  ]);

  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [newMember, setNewMember] = useState<Omit<Member, "id">>({
    name: "",
    email: "",
    phone: "",
    role: "Membro",
    joinDate: new Date().toISOString().split("T")[0],
    status: "active",
  });

  const metrics = [
    {
      title: "Total de Membros",
      value: members.length.toString(),
      icon: Users,
      trend: "+12%",
      description: "Em relação ao ano passado",
    },
    {
      title: "Presença Média",
      value: "85%",
      icon: TrendingUp,
      trend: "+5%",
      description: "Nos últimos 3 meses",
    },
    {
      title: "Eventos Este Mês",
      value: "8",
      icon: Calendar,
      trend: "+2",
      description: "Em relação ao mês anterior",
    },
    {
      title: "Contribuições",
      value: "R$ 12.500",
      icon: BarChart3,
      trend: "+8%",
      description: "Média mensal",
    },
  ];

  const quickLinks = [
    {
      title: "Gestão de Mídias",
      description: "Gerenciar campanhas, vídeos e devocionais",
      icon: Video,
      path: "/midia",
      color: "text-primary",
    },
    {
      title: "Bíblia",
      description: "Acessar e compartilhar passagens",
      icon: BookOpen,
      path: "/biblia",
      color: "text-accent",
    },
    {
      title: "Hinário",
      description: "Gerenciar hinos e músicas",
      icon: Music,
      path: "/hinario",
      color: "text-secondary",
    },
    {
      title: "Artigos",
      description: "Publicar e gerenciar artigos",
      icon: FileText,
      path: "/artigos",
      color: "text-muted-foreground",
    },
  ];

  const handleAddMember = () => {
    if (!newMember.name || !newMember.email) {
      toast.error("Por favor, preencha todos os campos obrigatórios");
      return;
    }

    const member: Member = {
      ...newMember,
      id: Date.now().toString(),
    };

    setMembers([...members, member]);
    setIsAddMemberOpen(false);
    setNewMember({
      name: "",
      email: "",
      phone: "",
      role: "Membro",
      joinDate: new Date().toISOString().split("T")[0],
      status: "active",
    });
    toast.success("Membro adicionado com sucesso!");
  };

  const handleDeleteMember = (id: string) => {
    setMembers(members.filter((m) => m.id !== id));
    toast.success("Membro removido com sucesso!");
  };

  const handleToggleStatus = (id: string) => {
    setMembers(
      members.map((m) =>
        m.id === id
          ? { ...m, status: m.status === "active" ? "inactive" : "active" }
          : m
      )
    );
    toast.success("Status atualizado!");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Dashboard Administrativo
          </h1>
          <p className="text-muted-foreground">
            Gerencie todos os aspectos da igreja em um só lugar
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <Card
              key={index}
              className="shadow-card hover:shadow-elegant transition-shadow"
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {metric.title}
                </CardTitle>
                <metric.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">
                  {metric.value}
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="secondary" className="text-xs">
                    {metric.trend}
                  </Badge>
                  <p className="text-xs text-muted-foreground">
                    {metric.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Links */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Acesso Rápido
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickLinks.map((link, index) => (
              <Link key={index} href={link.path}>
                <Card className="shadow-card hover:shadow-elegant transition-all hover:scale-105 cursor-pointer h-full">
                  <CardHeader>
                    <link.icon className={`h-8 w-8 mb-2 ${link.color}`} />
                    <CardTitle className="text-lg">{link.title}</CardTitle>
                    <CardDescription>{link.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Members Management */}
        <Card className="shadow-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">Gestão de Membros</CardTitle>
                <CardDescription>
                  Visualize e gerencie os membros da igreja
                </CardDescription>
              </div>
              <Dialog open={isAddMemberOpen} onOpenChange={setIsAddMemberOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <UserPlus className="h-4 w-4" />
                    Adicionar Membro
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Adicionar Novo Membro</DialogTitle>
                    <DialogDescription>
                      Preencha os dados do novo membro da igreja
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Nome Completo *</Label>
                      <Input
                        id="name"
                        value={newMember.name}
                        onChange={(e) =>
                          setNewMember({ ...newMember, name: e.target.value })
                        }
                        placeholder="João Silva"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={newMember.email}
                        onChange={(e) =>
                          setNewMember({ ...newMember, email: e.target.value })
                        }
                        placeholder="joao@email.com"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="phone">Telefone</Label>
                      <Input
                        id="phone"
                        value={newMember.phone}
                        onChange={(e) =>
                          setNewMember({ ...newMember, phone: e.target.value })
                        }
                        placeholder="(11) 98765-4321"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="role">Função</Label>
                      <Select
                        value={newMember.role}
                        onValueChange={(value) =>
                          setNewMember({ ...newMember, role: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Membro">Membro</SelectItem>
                          <SelectItem value="Diácono">Diácono</SelectItem>
                          <SelectItem value="Presbítero">Presbítero</SelectItem>
                          <SelectItem value="Pastor">Pastor</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="joinDate">Data de Ingresso</Label>
                      <Input
                        id="joinDate"
                        type="date"
                        value={newMember.joinDate}
                        onChange={(e) =>
                          setNewMember({
                            ...newMember,
                            joinDate: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsAddMemberOpen(false)}
                    >
                      Cancelar
                    </Button>
                    <Button onClick={handleAddMember}>Adicionar</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
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
                    <TableHead>Função</TableHead>
                    <TableHead>Data de Ingresso</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {members.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell className="font-medium">
                        {member.name}
                      </TableCell>
                      <TableCell>{member.email}</TableCell>
                      <TableCell>{member.phone}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{member.role}</Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(member.joinDate).toLocaleDateString("pt-BR")}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            member.status === "active" ? "default" : "secondary"
                          }
                          className="cursor-pointer"
                          onClick={() => handleToggleStatus(member.id)}
                        >
                          {member.status === "active" ? "Ativo" : "Inativo"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteMember(member.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

"use client";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Plus, Trash2, Calendar as CalendarIcon } from "lucide-react";
import { WeeklyQuestion } from "./_components/WeeklyQuestion";
import { Devotional } from "./_components/Devotional";
import { FeaturedVideos } from "./_components/FeaturedVideos";
import { Notices } from "./_components/Notices";
import { GalleryFeed } from "./_components/GalleryFeed";
import { CampaignBanner } from "./_components/CampaignBanner";

interface Event {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  startTime: string;
  society: string;
}

const sections = [
  { id: "campanhas", label: "Campanhas" },
  { id: "videos", label: "Vídeos em Destaque" },
  { id: "avisos", label: "Avisos" },
  { id: "galeria", label: "Galeria" },
  { id: "pergunta", label: "Pergunta Semanal" },
  { id: "devocional", label: "Devocional" },
  { id: "eventos", label: "Eventos" },
];

export default function Midia() {
  const [events, setEvents] = useState<Event[]>([
    {
      id: "1",
      title: "Reunião UMP",
      startDate: "2025-01-15",
      endDate: "2025-01-15",
      startTime: "19:00",
      society: "UMP",
    },
  ]);
  const [activeSection, setActiveSection] = useState<string>("campanhas");
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  // Detecta a seção atual no scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + window.innerHeight / 3;
      let currentSection = "campanhas";

      for (const { id } of sections) {
        const el = sectionRefs.current[id];
        if (el && el.offsetTop <= scrollY) {
          currentSection = id;
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAddEvent = () => {
    const newEvent: Event = {
      id: Date.now().toString(),
      title: "",
      startDate: "",
      endDate: "",
      startTime: "",
      society: "UMP",
    };
    setEvents([...events, newEvent]);
  };

  const handleRemoveEvent = (id: string) => {
    setEvents(events.filter((e) => e.id !== id));
  };

  const handleEventChange = (id: string, field: keyof Event, value: string) => {
    setEvents(events.map((e) => (e.id === id ? { ...e, [field]: value } : e)));
  };

  const handleSaveEvents = () => {
    toast.success("Eventos salvos com sucesso!");
  };

  const scrollToSection = (id: string) => {
    const el = sectionRefs.current[id];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="relative min-h-screen bg-background">
      {/* 🧭 MENU LATERAL FIXO (desktop) */}
      <nav className="hidden lg:flex fixed left-6 top-1/2 -translate-y-1/2 flex-col space-y-4 z-40">
        {sections.map((s) => {
          const isActive = activeSection === s.id;
          return (
            <button
              key={s.id}
              onClick={() => scrollToSection(s.id)}
              className={`transition-all duration-300 font-semibold text-left rounded-lg px-4 py-2 ${
                isActive
                  ? "text-primary text-lg scale-110 bg-primary/10 shadow-sm"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              {s.label}
            </button>
          );
        })}
      </nav>

      {/* 📱 MENU HORIZONTAL FIXO (mobile) */}
      <div className="fixed top-16 left-0 right-0 z-30 bg-background/80 backdrop-blur-md border-b border-border flex lg:hidden overflow-x-auto whitespace-nowrap scrollbar-hidden">
        {sections.map((s) => {
          const isActive = activeSection === s.id;
          return (
            <button
              key={s.id}
              onClick={() => scrollToSection(s.id)}
              className={`px-4 py-3 font-medium transition-all ${
                isActive
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              {s.label}
            </button>
          );
        })}
      </div>

      {/* 🧱 CONTEÚDO PRINCIPAL */}
      <div className="container mx-auto px-4 py-8 max-w-4xl space-y-8 lg:pl-48 pt-16 lg:pt-8">
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-foreground mb-2">
            Gestão de Mídia
          </h2>
          <p className="text-muted-foreground">
            Gerencie campanhas e vídeos em destaque do site
          </p>
        </div>

        {/* Campanhas */}
        <div
          id="campanhas"
          ref={(el) => {
            sectionRefs.current["campanhas"] = el;
          }}
        >
          <CampaignBanner />
        </div>
        <Separator className="my-8" />

        {/* Vídeos */}
        <div
          id="videos"
          ref={(el) => {
            sectionRefs.current["videos"] = el;
          }}
        >
          <FeaturedVideos />
        </div>
        <Separator className="my-8" />

        {/* Avisos */}
        <div
          id="avisos"
          ref={(el) => {
            sectionRefs.current["avisos"] = el;
          }}
        >
          <Notices />
        </div>
        <Separator className="my-8" />

        {/* Galeria */}
        <div
          id="galeria"
          ref={(el) => {
            sectionRefs.current["galeria"] = el;
          }}
        >
          <GalleryFeed />
        </div>
        <Separator className="my-8" />

        {/* Pergunta Semanal */}
        <div
          id="pergunta"
          ref={(el) => {
            sectionRefs.current["pergunta"] = el;
          }}
        >
          <WeeklyQuestion />
        </div>
        <Separator className="my-8" />

        {/* Devocional */}
        <div
          id="devocional"
          ref={(el) => {
            sectionRefs.current["devocional"] = el;
          }}
        >
          <Devotional />
        </div>
        <Separator className="my-8" />

        {/* Eventos */}
        <div
          id="eventos"
          ref={(el) => {
            sectionRefs.current["eventos"] = el;
          }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Calendário de Eventos</CardTitle>
              <CardDescription>
                Gerencie os eventos que aparecem no calendário
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {events.map((event, index) => (
                <div
                  key={event.id}
                  className="space-y-3 p-4 border border-border rounded-lg"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-sm text-muted-foreground flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4" />
                      Evento {index + 1}
                    </h4>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveEvent(event.id)}
                      disabled={events.length === 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`event-title-${event.id}`}>
                      Título do Evento
                    </Label>
                    <Input
                      id={`event-title-${event.id}`}
                      placeholder="Nome do evento"
                      value={event.title}
                      onChange={(e) =>
                        handleEventChange(event.id, "title", e.target.value)
                      }
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`event-start-${event.id}`}>
                        Data de Início
                      </Label>
                      <Input
                        id={`event-start-${event.id}`}
                        type="date"
                        value={event.startDate}
                        onChange={(e) =>
                          handleEventChange(
                            event.id,
                            "startDate",
                            e.target.value
                          )
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`event-end-${event.id}`}>
                        Data de Fim
                      </Label>
                      <Input
                        id={`event-end-${event.id}`}
                        type="date"
                        value={event.endDate}
                        onChange={(e) =>
                          handleEventChange(event.id, "endDate", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`event-time-${event.id}`}>
                        Horário de Início
                      </Label>
                      <Input
                        id={`event-time-${event.id}`}
                        type="time"
                        value={event.startTime}
                        onChange={(e) =>
                          handleEventChange(
                            event.id,
                            "startTime",
                            e.target.value
                          )
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`event-society-${event.id}`}>
                        Sociedade Responsável
                      </Label>
                      <Select
                        value={event.society}
                        onValueChange={(value) =>
                          handleEventChange(event.id, "society", value)
                        }
                      >
                        <SelectTrigger id={`event-society-${event.id}`}>
                          <SelectValue placeholder="Selecione uma sociedade" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="UMP">
                            UMP - União de Mocidade Presbiteriana
                          </SelectItem>
                          <SelectItem value="SAF">
                            SAF - Sociedade Auxiliadora Feminina
                          </SelectItem>
                          <SelectItem value="UPA">
                            UPA - União Presbiteriana de Adolescentes
                          </SelectItem>
                          <SelectItem value="UCP">
                            UCP - União de Crianças Presbiterianas
                          </SelectItem>
                          <SelectItem value="UPH">
                            UPH - União Presbiteriana de Homens
                          </SelectItem>
                          <SelectItem value="Outro">Outro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex gap-2">
                <Button
                  onClick={handleAddEvent}
                  variant="outline"
                  className="flex-1"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Evento
                </Button>
                <Button onClick={handleSaveEvents} className="flex-1">
                  Salvar Todos os Eventos
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

"use client";
import { useState, useEffect } from "react";
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
import { getCalendarEvents, putCalendarEvents } from "@/app/api";
import { toast } from "sonner";
import { Plus, Trash2, Calendar as CalendarIcon } from "lucide-react";
import { SOCIETIES } from "@/app/(non-protected)/(home)/_components/Calendar/constants";

export type Event = {
  _id: string;
  title: string;
  startDate: string;
  endDate: string;
  startTime: string;
  society: string;
  location: string;
};

export const Calendar = () => {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCalendarEvents();
        setEvents(data);
        console.log("Eventos carregados:", data);
      } catch (error) {
        console.error("Erro ao carregar eventos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSave = async () => {
    try {
      await putCalendarEvents(events);
      toast.success("Eventos salvos com sucesso!");
    } catch (error) {
      toast.error("Erro ao salvar eventos");
    }
  };

  const handleAdd = () => {
    const newEvent: Event = {
      _id: Date.now().toString(),
      title: "",
      startDate: "",
      endDate: "",
      startTime: "",
      society: "",
      location: "",
    };
    setEvents([...events, newEvent]);
  };

  const handleRemove = (id: string) => {
    setEvents(events.filter((e) => e._id !== id));
  };

  const handleChange = (id: string, field: keyof Event, value: string) => {
    setEvents(events.map((e) => (e._id === id ? { ...e, [field]: value } : e)));
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Calendário de Eventos</CardTitle>
        <CardDescription>
          Gerencie os eventos que aparecem no calendário (Só apague os eventos
          que não quiser mais exibir)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {events.map((event, index) => (
          <div
            key={event._id}
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
                onClick={() => handleRemove(event._id)}
                disabled={events.length === 1}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor={`event-title-${event._id}`}>
                Título do Evento
              </Label>
              <Input
                id={`event-title-${event._id}`}
                placeholder="Nome do evento"
                value={event.title}
                onChange={(e) =>
                  handleChange(event._id, "title", e.target.value)
                }
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`event-start-${event._id}`}>
                  Data de Início
                </Label>
                <Input
                  id={`event-start-${event._id}`}
                  type="date"
                  value={event.startDate}
                  onChange={(e) =>
                    handleChange(event._id, "startDate", e.target.value)
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`event-end-${event._id}`}>Data de Fim</Label>
                <Input
                  id={`event-end-${event._id}`}
                  type="date"
                  value={event.endDate}
                  onChange={(e) =>
                    handleChange(event._id, "endDate", e.target.value)
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`event-time-${event._id}`}>
                  Horário de Início
                </Label>
                <Input
                  id={`event-time-${event._id}`}
                  type="time"
                  value={event.startTime}
                  onChange={(e) =>
                    handleChange(event._id, "startTime", e.target.value)
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`event-society-${event._id}`}>
                  Sociedade Responsável
                </Label>
                <Select
                  value={event.society.toLowerCase()}
                  onValueChange={(value) =>
                    handleChange(event._id, "society", value)
                  }
                >
                  <SelectTrigger id={`event-society-${event._id}`}>
                    <SelectValue placeholder="Selecione a sociedade responsável" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(SOCIETIES).map(([key, society]) => (
                      <SelectItem key={key} value={key.toLowerCase()}>
                        {society.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor={`event-location-${event._id}`}>
                Local do Evento
              </Label>
              <Input
                id={`event-location-${event._id}`}
                placeholder="Local do evento"
                value={event.location}
                onChange={(e) =>
                  handleChange(event._id, "location", e.target.value)
                }
              />
            </div>
          </div>
        ))}

        <div className="flex flex-col md:flex-row gap-2">
          <Button onClick={handleAdd} variant="outline" className="flex-1">
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Evento
          </Button>
          <Button
            onClick={handleSave}
            disabled={!events.length || loading}
            className="flex-1"
          >
            Salvar Todos os Eventos
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

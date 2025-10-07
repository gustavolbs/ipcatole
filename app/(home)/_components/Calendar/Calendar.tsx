"use client";
import { Calendar as CalendarIcon } from "lucide-react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useState, useRef } from "react";
import { mapEvents } from "./utils";
import { CalendarEvents } from "./Events";

export const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const lastSelectedEl = useRef<HTMLElement | null>(null);

  return (
    <section>
      <div className="flex items-center gap-2">
        <CalendarIcon className="h-6 w-6 text-primary" />
        <h2 className="text-3xl font-bold">Calendário de Eventos</h2>
      </div>
      <small>Selecione um dia para ver os eventos</small>

      <div className="max-w-4xl mx-auto mb-10 mt-6">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          locale="pt-br"
          events={mapEvents}
          dayMaxEventRows={2}
          buttonText={{ today: "Hoje" }}
          dateClick={(args) => {
            if (lastSelectedEl.current) {
              lastSelectedEl.current.style.backgroundColor = "";
            }

            args.dayEl.style.backgroundColor = "lightcyan";
            lastSelectedEl.current = args.dayEl;

            setSelectedDate(args.dateStr);
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto">
        <CalendarEvents selectedDate={selectedDate} />
      </div>
    </section>
  );
};

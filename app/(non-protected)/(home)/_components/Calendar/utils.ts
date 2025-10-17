import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import "dayjs/locale/pt-br";
import { SOCIETIES, TIMEZONE } from "./constants";
import { Event } from "@/app/(protected)/midia/_components/Calendar";

// Configurações do dayjs
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("pt-br");
dayjs.tz.setDefault(TIMEZONE);

export const mapEvents = (events: Event[]) => {
  return events.map((event) => {
    // Combina data e hora se startTime existir
    const startDateTime = event.startTime
      ? dayjs.tz(`${event.startDate}T${event.startTime}`, TIMEZONE)
      : dayjs.tz(event.startDate, TIMEZONE);

    const endDateTime = event.endDate
      ? dayjs.tz(event.endDate, TIMEZONE)
      : startDateTime; // se não houver endDate, usa start

    return {
      location: event.location,
      society: event.society,
      startDateTime: event.startTime,
      title: event.title,
      allDay: !event.startTime, // só é dia inteiro se não tiver hora
      start: startDateTime.toISOString(),
      end: endDateTime.toISOString(),
      backgroundColor:
        SOCIETIES[event.society as keyof typeof SOCIETIES]?.color,
      borderColor: SOCIETIES[event.society as keyof typeof SOCIETIES]?.color,
    };
  });
};

export const filterEventsByDate = (
  events: ReturnType<typeof mapEvents>,
  selectedDate: string | null
) => {
  if (!selectedDate) return [];

  return events.filter((event) => {
    const eventStart = dayjs.tz(event.start, TIMEZONE).format("YYYY-MM-DD");
    const eventEnd = dayjs.tz(event.end, TIMEZONE).format("YYYY-MM-DD");
    return selectedDate >= eventStart && selectedDate <= eventEnd;
  });
};

export const formatDisplayDate = (date: string) => {
  return dayjs.tz(date, TIMEZONE).format("DD/MM (dddd)");
};

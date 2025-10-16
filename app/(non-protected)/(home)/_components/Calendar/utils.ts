import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import "dayjs/locale/pt-br";
import { events, SOCIETY_COLORS, TIMEZONE } from "./constants";

// Configurações do dayjs
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("pt-br");
dayjs.tz.setDefault(TIMEZONE);

export const mapEvents = events.map((event) => {
  const isAllDay = !event.date.includes("T");

  const start = isAllDay
    ? dayjs.tz(event.date, TIMEZONE).startOf("day")
    : dayjs.tz(event.date, TIMEZONE);

  const end = event.end ? dayjs.tz(event.end, TIMEZONE).endOf("day") : start;

  return {
    ...event,
    allDay: isAllDay,
    start: start.toISOString(),
    end: end.toISOString(),
    backgroundColor:
      SOCIETY_COLORS[event.society as keyof typeof SOCIETY_COLORS],
    borderColor: SOCIETY_COLORS[event.society as keyof typeof SOCIETY_COLORS],
  };
});

export const filterEventsByDate = (selectedDate: string | null) => {
  if (!selectedDate) return [];

  const selected = dayjs.tz(selectedDate, TIMEZONE).startOf("day");

  return mapEvents.filter((event) => {
    const start = dayjs.tz(event.date, TIMEZONE).startOf("day");
    const end = event.end
      ? dayjs.tz(event.end, TIMEZONE).endOf("day")
      : start.endOf("day");

    return (
      selected.isAfter(start.subtract(1, "millisecond")) &&
      selected.isBefore(end.add(1, "millisecond"))
    );
  });
};

export const formatEventTime = (start: string, end?: string) => {
  const startTime = dayjs.tz(start, TIMEZONE).format("HH:mm");
  if (!end) return startTime;

  const endTime = dayjs.tz(end, TIMEZONE).format("HH:mm");
  return startTime === endTime ? startTime : `${startTime} - ${endTime}`;
};

export const formatDisplayDate = (date: string) => {
  return dayjs.tz(date, TIMEZONE).format("DD/MM (dddd)");
};

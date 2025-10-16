import { Card, CardContent } from "@/components/ui/card";
import {
  filterEventsByDate,
  formatEventTime,
  formatDisplayDate,
} from "./utils";
import { SOCIETY_COLORS, TIMEZONE } from "./constants";
import dayjs from "dayjs";

interface CalendarEventsProps {
  selectedDate: string | null;
}

export const CalendarEvents = ({ selectedDate }: CalendarEventsProps) => {
  const filteredEvents = filterEventsByDate(selectedDate);

  if (!selectedDate) return null;

  return (
    <>
      <p className="mt-4 mb-4 text-lg font-semibold text-primary">
        Eventos para{" "}
        {dayjs
          .tz(selectedDate, TIMEZONE)
          .format("dddd, DD [de] MMMM [de] YYYY")}
        :
      </p>

      <Card className="shadow-card">
        <CardContent className="pt-6">
          {filteredEvents.length === 0 ? (
            <p className="text-muted-foreground text-center py-6">
              Nenhum evento para esta data.
            </p>
          ) : (
            <div className="space-y-3">
              {filteredEvents.map((item, i) => {
                const startDate = dayjs.tz(item.start, TIMEZONE);
                const endDate = dayjs.tz(item.end, TIMEZONE);
                const isMultiDay =
                  item.allDay && !startDate.isSame(endDate, "day");

                const displayDate = isMultiDay
                  ? dayjs.tz(selectedDate, TIMEZONE)
                  : startDate;

                return (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border-l-4"
                    style={{
                      borderLeftColor:
                        SOCIETY_COLORS[
                          item.society as keyof typeof SOCIETY_COLORS
                        ],
                    }}
                  >
                    <div>
                      <p className="font-semibold">{item.title}</p>
                      <p className="text-sm text-muted-foreground capitalize">
                        {item.society}
                      </p>
                      {item.location && (
                        <p className="text-xs text-muted-foreground mt-1">
                          📍 {item.location}
                        </p>
                      )}
                    </div>

                    <div className="text-right">
                      {!item.allDay && (
                        <p className="text-sm font-medium text-primary">
                          {formatEventTime(item.start, item.end)}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground">
                        {formatDisplayDate(displayDate.toISOString())}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
};

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Cake } from "lucide-react";

type BirthdayItem = {
  date: string[];
};
export const Birthdays = ({ birthdays }: { birthdays: BirthdayItem[] }) => {
  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Cake className="h-5 w-5 text-primary" />
          Aniversariantes da Semana
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="grid grid-cols-1 gap-2">
          {birthdays.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg"
            >
              <Cake className="h-5 w-5 text-accent" />
              <span className="font-medium">{item.date}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

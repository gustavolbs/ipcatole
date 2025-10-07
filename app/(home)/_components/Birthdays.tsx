import { Card, CardContent } from "@/components/ui/card";
import { Cake } from "lucide-react";

type BirthdayItem = {
  date: string[];
};
export const Birthdays = ({ birthdays }: { birthdays: BirthdayItem[] }) => {
  return (
    <section>
      <div className="flex items-center gap-2 mb-6">
        <Cake className="h-6 w-6 text-accent" />
        <h2 className="text-3xl font-bold">Aniversariantes da Semana</h2>
      </div>
      <Card className="shadow-card">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {birthdays.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg"
              >
                <Cake className="h-5 w-5 text-accent" />
                <span className="font-medium">{item.date}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Cake, Heart } from "lucide-react";
import { formatAnniversaries } from "./Calendar/utils";

export type AnniversaryItem = Birthday | Marriage;

type Birthday = {
  type: "birthday";
  member: {
    _id: string;
    name: string;
    birthDate: string;
  };
};
type Marriage = {
  type: "marriage";
  couple?: {
    name: string;
    _id: string;
  }[];
  member?: { _id: string; name: string };
  spouseName?: string;
  marriageDate: string;
};

// Função para ordenar por mês e dia
const sortByDayMonth = (a: AnniversaryItem, b: AnniversaryItem) => {
  const getMD = (dateStr: string) => {
    const [_year, month, day] = dateStr.split("-").map(Number);
    return month * 100 + day; // ex: 03-15 → 315
  };

  const aDate = a.type === "birthday" ? a.member.birthDate : a.marriageDate;
  const bDate = b.type === "birthday" ? b.member.birthDate : b.marriageDate;

  return getMD(aDate) - getMD(bDate);
};

export const Birthdays = ({ birthdays }: { birthdays: AnniversaryItem[] }) => {
  const sortedBirthdays = [...birthdays].sort(sortByDayMonth);

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
          {sortedBirthdays.map((item, i) => {
            const coupleName =
              item.type === "marriage"
                ? item.couple
                  ? `${item.couple[0].name.split(" ")[0]} e ${
                      item.couple[1].name.split(" ")[0]
                    }`
                  : `${item.member?.name} e ${item.spouseName}`
                : "";

            return (
              <div
                key={i}
                className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg"
              >
                {item.type === "birthday" ? (
                  <>
                    <Cake className="h-5 w-5 text-accent" />
                    <span className="font-medium">
                      {formatAnniversaries(item.member.birthDate)} -{" "}
                      {item.member.name.split(" ").slice(0, 2).join(" ")}
                    </span>
                  </>
                ) : (
                  <>
                    <Heart className="h-5 w-5 text-accent" />
                    <span className="font-medium">
                      {formatAnniversaries(item.marriageDate)} - {coupleName}
                    </span>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

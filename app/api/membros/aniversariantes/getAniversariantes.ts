import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export const getAniversariantes = async (start: string, end: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/membros/aniversariantes?start=${start}&end=${end}`,
    {
      cache: "force-cache",
      next: { tags: ["aniversariantes"] },
    }
  );

  if (!res.ok) throw new Error("Erro ao buscar aniversariantes");
  return res.json();
};

export const getAniversariantesSemana = async () => {
  const today = dayjs().tz("America/Recife");

  // Domingo da semana atual
  const sunday = today.startOf("week"); // dayjs considera domingo como início da semana
  // Domingo da semana anterior
  const prevSunday = sunday.subtract(7, "day");

  // start deve ser o domingo anterior e end o domingo atual
  const start = prevSunday.format("YYYY-MM-DD");
  const end = sunday.format("YYYY-MM-DD");

  const data = await getAniversariantes(start, end);

  return {
    start: prevSunday.format("DD/MM/YYYY"),
    end: sunday.format("DD/MM/YYYY"),
    data,
  };
};

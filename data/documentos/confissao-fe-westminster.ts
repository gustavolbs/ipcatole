import type { ChurchDocument } from "./types";

export const westminsterConfessionChapters = [
  { number: 1, title: "Das Sagradas Escrituras" },
  { number: 2, title: "De Deus e da Santíssima Trindade" },
  { number: 3, title: "Do decreto eterno de Deus" },
  { number: 4, title: "Da criação" },
  { number: 5, title: "Da providência" },
  { number: 6, title: "Da queda do homem, do pecado e de seu castigo" },
  { number: 7, title: "Da aliança de Deus com o homem" },
  { number: 8, title: "De Cristo, o Mediador" },
  { number: 9, title: "Do livre-arbítrio" },
  { number: 10, title: "Do chamamento eficaz" },
  { number: 11, title: "Da justificação" },
  { number: 12, title: "Da adoção" },
  { number: 13, title: "Da santificação" },
  { number: 14, title: "Da fé salvadora" },
  { number: 15, title: "Do arrependimento para a vida" },
  { number: 16, title: "Das boas obras" },
  { number: 17, title: "Da perseverança dos santos" },
  { number: 18, title: "Da certeza da graça e da salvação" },
  { number: 19, title: "Da Lei de Deus" },
  { number: 20, title: "Da liberdade cristã e da liberdade de consciência" },
  { number: 21, title: "Do culto religioso e do dia de descanso" },
  { number: 22, title: "Dos juramentos e votos lícitos" },
  { number: 23, title: "Do magistrado civil" },
  { number: 24, title: "Do matrimônio e do divórcio" },
  { number: 25, title: "Da igreja" },
  { number: 26, title: "Da comunhão dos santos" },
  { number: 27, title: "Dos sacramentos" },
  { number: 28, title: "Do batismo" },
  { number: 29, title: "Da Ceia do Senhor" },
  { number: 30, title: "Das censuras eclesiásticas" },
  { number: 31, title: "Dos sínodos e concílios" },
  {
    number: 32,
    title: "Do estado do homem após a morte e da ressurreição dos mortos",
  },
  { number: 33, title: "Do juízo final" },
] as const;

export const confissaoFeWestminster: ChurchDocument = {
  id: "confissao-fe-westminster",
  title: "Confissão de Fé de Westminster",
  shortTitle: "CFW",
  category: "simbolo-de-fe-ipb",
  status: "oficial-ipb",
  year: 1647,
  description:
    "Principal confissão doutrinária dos Padrões de Westminster e símbolo de fé oficial da Igreja Presbiteriana do Brasil.",
  sources: [
    {
      label: "Confissão de Fé de Westminster — PDF publicado pela IPB",
      url: "https://www.ipb.org.br/content/Arquivos/A_Confissao_de_Fe_de_Westminster.pdf",
      publisher: "Igreja Presbiteriana do Brasil",
    },
    {
      label: "Confissão de Fé de Westminster (1647) — índice e texto histórico",
      url: "https://westminster1647.com/pt/cfw",
      year: 1647,
      notes:
        "Fonte histórica complementar. Para uso denominacional, prefira a edição indicada pela IPB.",
    },
  ],
  notes: [
    "Os outros dois símbolos de fé oficiais da IPB já existem no repositório: Catecismo Maior e Breve Catecismo de Westminster.",
    "O índice dos 33 capítulos fica local para navegação e busca; a edição portuguesa completa permanece vinculada à fonte oficial.",
  ],
};

export default confissaoFeWestminster;

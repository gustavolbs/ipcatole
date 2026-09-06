import type { ChurchDocument } from "./types";

export const internalSocieties = [
  {
    id: "uph",
    name: "União Presbiteriana de Homens",
    acronym: "UPH",
  },
  {
    id: "saf",
    name: "Sociedade Auxiliadora Feminina",
    acronym: "SAF",
  },
  {
    id: "ump",
    name: "União de Mocidade Presbiteriana",
    acronym: "UMP",
  },
  {
    id: "upa",
    name: "União Presbiteriana de Adolescentes",
    acronym: "UPA",
  },
  {
    id: "ucp",
    name: "União de Crianças Presbiterianas",
    acronym: "UCP",
  },
] as const;

export const gtsi: ChurchDocument = {
  id: "gtsi",
  title: "Guia de Trabalho das Sociedades Internas da IPB",
  shortTitle: "GTSI",
  category: "sociedade-interna-ipb",
  status: "normativo-ipb",
  description:
    "Guia normativo para organização e funcionamento das Sociedades Internas da Igreja Presbiteriana do Brasil, composto por uma parte comum e partes específicas para UPH, SAF, UMP, UPA e UCP.",
  sources: [
    {
      label: "Novo GTSI — CE/SC 2024",
      url: "https://drive.google.com/file/d/1JEdpJP1QPHVgvkRkXx5m-oA7Zd8TMI8S/view?usp=sharing",
      publisher: "Igreja Presbiteriana do Brasil / CNHP",
      year: 2024,
      notes:
        "Versão divulgada na área oficial de downloads da União Presbiteriana de Homens como 'Novo GTSI - CE/SC 2024'.",
    },
    {
      label: "GTSI aprovado em 2022",
      url: "https://upa.org.br/wp-content/uploads/2023/09/GTSI-Aprovado-em-2022.pdf",
      publisher: "Igreja Presbiteriana do Brasil / UPA",
      year: 2022,
      notes:
        "Mantido como referência histórica e fallback. Não deve ser tratado como mais recente que a edição CE/SC 2024.",
    },
    {
      label: "Downloads oficiais da UPH",
      url: "https://uph.org.br/material/downloads",
      publisher: "Confederação Nacional de Homens Presbiterianos",
    },
    {
      label: "Documentos oficiais da SAF",
      url: "https://www.saf.org.br/documentos/",
      publisher: "Confederação Nacional das SAFs",
    },
    {
      label: "Downloads oficiais da UPA",
      url: "https://upa.org.br/downloads/",
      publisher: "União Presbiteriana de Adolescentes",
    },
    {
      label: "Downloads e manuais da UMP",
      url: "https://ump.org.br/downloads/",
      publisher: "Confederação Nacional da Mocidade Presbiteriana",
    },
  ],
  notes: [
    "Sempre exibir a edição/ano ao usuário, porque o GTSI passa por revisões.",
    "As cinco Sociedades Internas devem ser tratadas como seções do mesmo conjunto normativo, e não como confissões de fé.",
  ],
};

export const gtsiBySociety = internalSocieties.map((society) => ({
  ...society,
  documentId: gtsi.id,
  latestKnownEdition: 2024,
}));

export default gtsi;

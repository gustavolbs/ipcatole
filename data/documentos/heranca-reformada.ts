import type { ChurchDocument } from "./types";

export const herancaReformada: ChurchDocument[] = [
  {
    id: "confissao-belga",
    title: "Confissão Belga",
    category: "heranca-reformada",
    status: "referencia-historica",
    year: 1561,
    description:
      "Uma das Três Formas de Unidade da tradição reformada continental. Útil como referência histórica e comparativa, mas não é símbolo de fé oficial da IPB.",
    sources: [
      {
        label: "Belgic Confession — Christian Reformed Church",
        url: "https://www.crcna.org/welcome/beliefs/confessions/belgic-confession",
        publisher: "Christian Reformed Church in North America",
      },
    ],
  },
  {
    id: "catecismo-heidelberg",
    title: "Catecismo de Heidelberg",
    category: "heranca-reformada",
    status: "referencia-historica",
    year: 1563,
    description:
      "Catecismo reformado continental organizado em Dias do Senhor e integrante das Três Formas de Unidade. Não é símbolo de fé oficial da IPB.",
    sources: [
      {
        label: "Heidelberg Catechism — Christian Reformed Church",
        url: "https://www.crcna.org/welcome/beliefs/confessions/heidelberg-catechism",
        publisher: "Christian Reformed Church in North America",
      },
    ],
  },
  {
    id: "canones-de-dort",
    title: "Cânones de Dort",
    category: "heranca-reformada",
    status: "referencia-historica",
    year: 1619,
    description:
      "Formulação sinodal reformada sobre eleição, expiação, corrupção humana, graça e perseverança; integra as Três Formas de Unidade. Não é símbolo de fé oficial da IPB.",
    sources: [
      {
        label: "Canons of Dort — Christian Reformed Church",
        url: "https://www.crcna.org/welcome/beliefs/confessions/canons-dort",
        publisher: "Christian Reformed Church in North America",
      },
    ],
  },
  {
    id: "diretorio-culto-publico-westminster",
    title: "Diretório de Westminster para o Culto Público",
    category: "heranca-reformada",
    status: "referencia-historica",
    year: 1645,
    description:
      "Documento da Assembleia de Westminster sobre culto público. É relevante para a história litúrgica presbiteriana, mas não substitui os Princípios de Liturgia vigentes da IPB.",
    sources: [
      {
        label: "The Directory for the Publick Worship of God — Westminster 1645",
        url: "https://westminster1647.com/en/dapublica",
        year: 1645,
      },
    ],
  },
];

export default herancaReformada;

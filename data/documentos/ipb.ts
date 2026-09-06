import type { ChurchDocument } from "./types";
import { confissaoFeWestminster } from "./confissao-fe-westminster";
import { gtsi } from "./gtsi";

export const catecismoMaiorWestminster: ChurchDocument = {
  id: "catecismo-maior-westminster",
  title: "Catecismo Maior de Westminster",
  shortTitle: "CMW",
  category: "simbolo-de-fe-ipb",
  status: "oficial-ipb",
  year: 1648,
  description:
    "Catecismo extenso dos Padrões de Westminster e símbolo de fé oficial da Igreja Presbiteriana do Brasil.",
  localDataPath: "data/catecismo-maior.ts",
  sources: [
    {
      label: "Catecismo Maior de Westminster — PDF publicado pela IPB",
      url: "https://ipb.org.br/content/Arquivos/Catecismo_Maior_de_Westminster.pdf",
      publisher: "Igreja Presbiteriana do Brasil",
      notes: "O conteúdo também está disponível para leitura dentro do site.",
    },
  ],
};

export const breveCatecismoWestminster: ChurchDocument = {
  id: "breve-catecismo-westminster",
  title: "Breve Catecismo de Westminster",
  shortTitle: "BCW",
  category: "simbolo-de-fe-ipb",
  status: "oficial-ipb",
  year: 1647,
  description:
    "Catecismo resumido dos Padrões de Westminster e símbolo de fé oficial da Igreja Presbiteriana do Brasil.",
  localDataPath: "data/catecismo-breve.ts",
  sources: [
    {
      label: "Breve Catecismo de Westminster — PDF publicado pela IPB",
      url: "https://ipb.org.br/content/Arquivos/Breve_Catecismo_de_Westminster.pdf",
      publisher: "Igreja Presbiteriana do Brasil",
      notes: "O conteúdo também está disponível para leitura dentro do site.",
    },
  ],
};

export const manualPresbiteriano: ChurchDocument = {
  id: "manual-presbiteriano",
  title: "Manual Presbiteriano",
  category: "governo-e-ordem-ipb",
  status: "normativo-ipb",
  description:
    "Compilação normativa da Igreja Presbiteriana do Brasil, incluindo Constituição, Código de Disciplina e Princípios de Liturgia.",
  sources: [
    {
      label: "Manual Presbiteriano — PDF publicado pela IPB",
      url: "https://ipb.org.br/content/Arquivos/Manual_Presbiteriano.pdf",
      publisher: "Igreja Presbiteriana do Brasil",
    },
  ],
};

export const constituicaoIpb: ChurchDocument = {
  id: "constituicao-ipb",
  title: "Constituição da Igreja Presbiteriana do Brasil",
  shortTitle: "CI/IPB",
  category: "governo-e-ordem-ipb",
  status: "normativo-ipb",
  description:
    "Documento constitucional que define natureza, governo, concílios, oficiais e organização da Igreja Presbiteriana do Brasil.",
  sources: manualPresbiteriano.sources,
  notes: ["Integrada ao Manual Presbiteriano."],
};

export const codigoDisciplinaIpb: ChurchDocument = {
  id: "codigo-disciplina-ipb",
  title: "Código de Disciplina da Igreja Presbiteriana do Brasil",
  shortTitle: "CD/IPB",
  category: "governo-e-ordem-ipb",
  status: "normativo-ipb",
  description:
    "Normas de disciplina e processo eclesiástico da Igreja Presbiteriana do Brasil.",
  sources: manualPresbiteriano.sources,
  notes: ["Integrado ao Manual Presbiteriano."],
};

export const principiosLiturgiaIpb: ChurchDocument = {
  id: "principios-liturgia-ipb",
  title: "Princípios de Liturgia da Igreja Presbiteriana do Brasil",
  shortTitle: "PL/IPB",
  category: "governo-e-ordem-ipb",
  status: "normativo-ipb",
  description:
    "Princípios denominacionais que orientam o culto público, sacramentos e demais atos litúrgicos na IPB.",
  sources: manualPresbiteriano.sources,
  notes: ["Integrados ao Manual Presbiteriano."],
};

export const officialIpbDocuments: ChurchDocument[] = [
  confissaoFeWestminster,
  catecismoMaiorWestminster,
  breveCatecismoWestminster,
  manualPresbiteriano,
  constituicaoIpb,
  codigoDisciplinaIpb,
  principiosLiturgiaIpb,
  gtsi,
];

export default officialIpbDocuments;

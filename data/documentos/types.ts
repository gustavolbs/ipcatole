export type DocumentCategory =
  | "simbolo-de-fe-ipb"
  | "governo-e-ordem-ipb"
  | "sociedade-interna-ipb"
  | "heranca-reformada"
  | "credo-historico";

export type DocumentStatus =
  | "oficial-ipb"
  | "normativo-ipb"
  | "referencia-historica";

export type DocumentSource = {
  label: string;
  url: string;
  publisher?: string;
  year?: number;
  notes?: string;
};

export type ChurchDocument = {
  id: string;
  title: string;
  shortTitle?: string;
  category: DocumentCategory;
  status: DocumentStatus;
  year?: number;
  description: string;
  localDataPath?: string;
  sources: DocumentSource[];
  notes?: string[];
};

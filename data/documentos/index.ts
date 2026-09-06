export * from "./types";
export * from "./confissao-fe-westminster";
export * from "./gtsi";
export * from "./ipb";
export * from "./heranca-reformada";

import officialIpbDocuments from "./ipb";
import herancaReformada from "./heranca-reformada";

export const churchDocuments = [
  ...officialIpbDocuments,
  ...herancaReformada,
];

export default churchDocuments;

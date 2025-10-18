export type Role =
  | "admin"
  | "media"
  | "president"
  | "council"
  | "user"
  | "priest";

export const ROLES_ALLOWED_DASHBOARD: Role[] = [
  "admin",
  "media",
  "president",
  "council",
  "priest",
];
export const ROLES_ALLOWED_ADMIN: Role[] = ["admin"];
export const ROLES_ALLOWED_PRAYER_REQUESTS: Role[] = [
  "admin",
  "council",
  "priest",
];

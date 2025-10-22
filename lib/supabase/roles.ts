// Single source of truth for roles: update this array and the derived type/value
export const ROLES = [
  "admin",
  "media",
  "president",
  "council",
  "user",
  "priest",
  "diacono",
  "musician",
] as const;

export type Role = (typeof ROLES)[number];

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
export const ROLES_ALLOWED_MEMBERS: Role[] = ["admin", "council", "priest"];

export const ALL_ROLES: Role[] = ROLES.map((r) => r);

export const ROLES_NAMES: Record<Role, string> = {
  admin: "Admin",
  council: "Conselho",
  diacono: "Diaconia",
  media: "Mídia",
  musician: "Músico",
  president: "Presidente",
  priest: "Pastor",
  user: "Igreja",
};

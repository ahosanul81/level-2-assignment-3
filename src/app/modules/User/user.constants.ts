export type TUserRole = keyof typeof UserRole;
export const UserRole = {
  admin: "admin",
  user: "user",
} as const;

// src/lib/query-keys/backend-user.ts

export const QUERY_KEYS = {
  BACKEND_USER: {
    ROOT: ["backend-user"] as const,
    LIST: ["backend-user", "list"] as const,
    DETAIL: (id: string | number) => ["backend-user", "detail", id] as const,
  },
  ROLES: {
    ALL: ["roles", "roles"] as const,
  },
  SUBSCRIPTION: {
    ROOT: ["subscription"] as const,
    LIST: ["subscription", "list"] as const,
    FEATURES: ["subscription", "features"] as const,
  },
};

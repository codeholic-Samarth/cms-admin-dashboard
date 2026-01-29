import { create } from "zustand";

interface PermissionState {
  permissions: string[];
  permissionsLoaded: boolean;

  setPermissions: (perms: string[]) => void;
  clearPermissions: () => void;
}

export const usePermissionStore = create<PermissionState>((set) => ({
  permissions: [],
  permissionsLoaded: false,

  setPermissions: (perms) =>
    set({
      permissions: perms,
      permissionsLoaded: true,
    }),

  clearPermissions: () =>
    set({
      permissions: [],
      permissionsLoaded: false,
    }),
}));

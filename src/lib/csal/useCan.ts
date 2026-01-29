import { useMemo } from "react";

import { useAuthStore } from "@/store/useAuthStore";
import { usePermissionStore } from "@/store/usePermissionStore";

import { defineAbilityFor } from "./ability";

export function useCan() {
  const { permissions, permissionsLoaded } = usePermissionStore();
  const isSuperAdmin = useAuthStore((state) => state.isSuperAdmin);

  return useMemo(() => {
    if (!permissionsLoaded) return null;

    return defineAbilityFor(
      permissions,
      isSuperAdmin
    );
  }, [permissions, permissionsLoaded, isSuperAdmin]);
}

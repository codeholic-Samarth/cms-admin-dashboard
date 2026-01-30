import { useMemo } from "react";

import { useAuthStore } from "@/store/useAuthStore";
import { usePermissionStore } from "@/store/usePermissionStore";

import { defineAbilityFor } from "./ability";

export function useCan() {
  const { user } = useAuthStore();
  const { permissions, permissionsLoaded } = usePermissionStore();

  // 🔥 derive super admin DIRECTLY from user
  const isSuperAdmin =
    user?.role?.title?.toLowerCase() === "super user" ||
    user?.role?.title?.toLowerCase() === "superuser";

  return useMemo(() => {
    // 🔥 super admin NEVER waits for permissions
    if (isSuperAdmin) {
      return defineAbilityFor([], true);
    }

    if (!permissionsLoaded) return null;

    return defineAbilityFor(permissions, false);
  }, [permissions, permissionsLoaded, isSuperAdmin]);
}

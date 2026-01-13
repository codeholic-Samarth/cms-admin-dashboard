// src/hooks/queries/use-backend-roles.ts

import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constant/query_keys";

import { rolesService } from "./roles.api";
import { BackendRoleListResponse } from "./roles.types";



export const useBackendRoles = () => {
  return useQuery<BackendRoleListResponse>({
    queryKey: QUERY_KEYS.ROLES.ALL,
    queryFn: () => rolesService.getAllRoles(),
    staleTime: 1000 * 60 * 10,
  });
};

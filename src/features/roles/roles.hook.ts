// src/hooks/queries/use-backend-roles.ts

import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constant/query_keys";
import { queryClient } from "@/lib/query-client";

import { rolesService } from "./roles.api";
import { BackendPermissionListResponse, BackendRole, BackendRoleListResponse, CreateRolePayload, RolesListParams, UpdateRolePayload } from "./roles.types";


export const useBackendRoles = (params?: RolesListParams) => {
  return useQuery<BackendRoleListResponse>({
    queryKey: QUERY_KEYS.ROLES.ALL,
    queryFn: () => rolesService.getAllRoles(params || {}),
    placeholderData: keepPreviousData,
  });
};

export const useBackendPermissions = () => {
  return useQuery<BackendPermissionListResponse>({
    queryKey: QUERY_KEYS.ROLES.PERMISSIONS,
    queryFn: () => rolesService.getAllPermissions(),
    staleTime: 1000 * 60 * 30, 
  });
};

export const useBackendRoleById = (ruid: string) => {
  return useQuery<BackendRole>({
    queryKey: QUERY_KEYS.ROLES.ROLE_DETAIL(ruid),
    queryFn: () => rolesService.getRoleById(ruid),
    enabled: !!ruid,
  });
};

export const useCreateRole = () => {
  return useMutation<BackendRole, Error, CreateRolePayload>({
    mutationFn: (payload) =>
      rolesService.createRole(payload),

    onSuccess: (createdRole) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.ROLES.ALL,
        exact: false,
      });

      queryClient.setQueryData(
        QUERY_KEYS.ROLES.ROLE_DETAIL(createdRole.ruid),
        createdRole
      );
    },
  });
};

export const useUpdateRole = () => {
  return useMutation<BackendRole, Error, UpdateRolePayload>({
    mutationFn: (payload) =>
      rolesService.updateRole(payload),

    onSuccess: (updatedRole) => {
      // Invalidate roles list (table, dropdowns, etc.)
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.ROLES.ALL,
        exact: false,
      });

      // Sync role detail cache (edit / detail page)
      queryClient.setQueryData(
        QUERY_KEYS.ROLES.ROLE_DETAIL(updatedRole.ruid),
        updatedRole
      );
    },
  });
};

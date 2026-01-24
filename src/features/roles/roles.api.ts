// src/lib/api/services/roles-permission.service.ts

import { axiosFetch } from "@/lib/api/axiosFetch";
import { API_ENDPOINTS } from "@/lib/api/endpoints";

import { BackendPermissionListResponse, BackendRole, BackendRoleListResponse, RolesListParams } from "./roles.types";

export const rolesService = {
  getAllRoles: async (
    params: RolesListParams,
  ): Promise<BackendRoleListResponse> => {
    const response = await axiosFetch.get<BackendRoleListResponse>(
      API_ENDPOINTS.ROLES_AND_PERMISSION.GET_ALL_ROLES,
      {
        params: {
          limit: params.limit ?? 10,
          offset: params.offset ?? 0,
        },
      }
    );

    return response.data;
  },

  getAllPermissions: async (): Promise<BackendPermissionListResponse> => {
    const response = await axiosFetch.get<BackendPermissionListResponse>(
      API_ENDPOINTS.ROLES_AND_PERMISSION.GET_ALL_PERMISSION
    );

    return response.data;
  },

  getRoleById: async (ruid: string): Promise<BackendRole> => {
    if (!ruid) {
      throw new Error("Role ID (ruid) is required");
    }

    const response = await axiosFetch.get<BackendRole>(
      API_ENDPOINTS.ROLES_AND_PERMISSION.ROLE_DETAIL(ruid)
    );

    return response.data;
  },
};

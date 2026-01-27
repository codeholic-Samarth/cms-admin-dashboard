// src/lib/api/services/roles-permission.service.ts

import { axiosFetch } from "@/lib/api/axiosFetch";
import { API_ENDPOINTS } from "@/lib/api/endpoints";

import { BackendPermissionListResponse, BackendRole, BackendRoleListResponse, CreateRolePayload, RolesListParams, UpdateRolePayload } from "./roles.types";

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

  createRole: async (
    payload: CreateRolePayload
  ): Promise<BackendRole> => {
    if (!payload?.title) {
      throw new Error("Role title is required");
    }

    const response = await axiosFetch.post<BackendRole>(
      API_ENDPOINTS.ROLES_AND_PERMISSION.CREATE_ROLE,
      payload
    );

    return response.data;
  },

  updateRole: async (
    payload: UpdateRolePayload
  ): Promise<BackendRole> => {
    if (!payload?.ruid) {
      throw new Error("Role ID (ruid) is required");
    }

    const response = await axiosFetch.put<BackendRole>(
      API_ENDPOINTS.ROLES_AND_PERMISSION.UPDATE_ROLE,
      payload
    );

    return response.data;
  },
};

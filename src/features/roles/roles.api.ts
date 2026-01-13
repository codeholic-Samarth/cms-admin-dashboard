// src/lib/api/services/roles-permission.service.ts

import { axiosFetch } from "@/lib/api/axiosFetch";
import { API_ENDPOINTS } from "@/lib/api/endpoints";

import { BackendRoleListResponse } from "./roles.types";

export const rolesService = {
  getAllRoles: async (): Promise<BackendRoleListResponse> => {
    const response = await axiosFetch.get<BackendRoleListResponse>(
      API_ENDPOINTS.ROLES_AND_PERMISSION.GET_ALL_ROLES
    );

    return response.data;
  },
};

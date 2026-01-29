import { axiosFetch } from "@/lib/api/axiosFetch";
import { API_ENDPOINTS } from "@/lib/api/endpoints";

import { AuthProfileResponse, CreatePasswordPayload, CreatePasswordResponse, UserPermissionListResponse } from "./profile.type";

export const authService = {
  getProfile: async (): Promise<AuthProfileResponse> => {
    const response = await axiosFetch.get<AuthProfileResponse>(
      API_ENDPOINTS.AUTH.PROFILE
    );

    return response.data;
  },

  createPassword: async (
    payload: CreatePasswordPayload
  ): Promise<CreatePasswordResponse> => {
    if (!payload?.old_password || !payload?.new_password) {
      throw new Error("Old password and new password are required");
    }

    const response = await axiosFetch.post<CreatePasswordResponse>(
      API_ENDPOINTS.AUTH.CHANGE_PASSWORD,
      payload
    );

    return response.data;
  },

  getUserPermissions: async (
    userId: string
  ): Promise<UserPermissionListResponse> => {
    if (!userId) {
      throw new Error("User ID is required");
    }

    const response = await axiosFetch.get<UserPermissionListResponse>(
      API_ENDPOINTS.AUTH.GET_ALL_PERMISSION(userId)
    );

    return response.data;
  },
};
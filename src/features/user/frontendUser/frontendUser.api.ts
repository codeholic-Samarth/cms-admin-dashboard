import { axiosFetch } from "@/lib/api/axiosFetch";
import { API_ENDPOINTS } from "@/lib/api/endpoints";

import { FrontendUser, FrontendUserListResponse, FrontendUserUpdatePayload, UseFrontendUsersParams } from "./frontendUser.type";

export const frontendUserService = {
  getAllUsers: async (
    params: UseFrontendUsersParams
  ): Promise<FrontendUserListResponse> => {
    const response = await axiosFetch.get<FrontendUserListResponse>(
      API_ENDPOINTS.FRONTEND_USER.GET_ALL,
      {
        params: {
          limit: params.limit ?? 10,
          offset: params.offset ?? 0,
        },
      }
    );

    return response.data;
  },

  getUserById: async (
    userId: string
  ): Promise<FrontendUser> => {
    if (!userId) {
      throw new Error("Frontend user ID is required");
    }

    const response = await axiosFetch.get<FrontendUser>(
      API_ENDPOINTS.FRONTEND_USER.DETAIL(userId)
    );

    return response.data;
  },

  updateUser: async (
    payload: FrontendUserUpdatePayload
  ): Promise<FrontendUser> => {
    if (!payload?.user_id) {
      throw new Error("Frontend user ID is required");
    }

    const response = await axiosFetch.post<FrontendUser>(
      API_ENDPOINTS.FRONTEND_USER.UPDATE,
      payload
    );

    return response.data;
  },
};
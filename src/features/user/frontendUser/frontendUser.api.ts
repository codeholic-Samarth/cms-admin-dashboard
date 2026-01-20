import { axiosFetch } from "@/lib/api/axiosFetch";
import { API_ENDPOINTS } from "@/lib/api/endpoints";

import { FrontendUserListResponse, UseFrontendUsersParams } from "./frontendUser.type";

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
};
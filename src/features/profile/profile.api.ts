import { axiosFetch } from "@/lib/api/axiosFetch";
import { API_ENDPOINTS } from "@/lib/api/endpoints";

import { AuthProfileResponse } from "./profile.type";

export const authService = {
  getProfile: async (): Promise<AuthProfileResponse> => {
    const response = await axiosFetch.get<AuthProfileResponse>(
      API_ENDPOINTS.AUTH.PROFILE
    );

    return response.data;
  },
};
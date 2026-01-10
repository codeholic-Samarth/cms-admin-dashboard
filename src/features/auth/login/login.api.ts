import { axiosFetch } from "@/lib/api/axiosFetch"
import { API_ENDPOINTS } from "@/lib/api/endpoints"

import { LoginRequest, LoginResponse } from "./login.types"


export const authApi = {
  login: async (payload: LoginRequest): Promise<LoginResponse> => {
    const response = await axiosFetch.post<LoginResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      payload
    )

    return response.data
  },
}

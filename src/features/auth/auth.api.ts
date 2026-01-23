import { axiosFetch } from '@/lib/api/axiosFetch'
import { API_ENDPOINTS } from '@/lib/api/endpoints'

import { ChangePasswordPayload, ChangePasswordResponse } from './create-password/createPassword.type'
import {
  ForgotPasswordTokenParams,
  ForgotPasswordTokenResponse,
} from './forgot-password/forgotPassword.type'

export const authService = {
  sendForgotPasswordToken: async (
    params: ForgotPasswordTokenParams,
  ): Promise<ForgotPasswordTokenResponse> => {
    if (!params?.email) {
      throw new Error('Email is required')
    }

    const response = await axiosFetch.get<ForgotPasswordTokenResponse>(
      API_ENDPOINTS.AUTH.FORGOT_PASSWORD_TOKEN,
      {
        params: {
          email: params.email,
        },
      },
    )

    return response.data
  },

   changePassword: async (
    payload: ChangePasswordPayload
  ): Promise<ChangePasswordResponse> => {
    if (!payload?.token || !payload?.password) {
      throw new Error("Token and password are required");
    }

    const response = await axiosFetch.post<ChangePasswordResponse>(
      API_ENDPOINTS.AUTH.CHANGE_PASSWORD,
      payload
    );

    return response.data;
  },
}

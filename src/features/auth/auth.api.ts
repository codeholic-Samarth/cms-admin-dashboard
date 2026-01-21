import { axiosFetch } from '@/lib/api/axiosFetch'
import { API_ENDPOINTS } from '@/lib/api/endpoints'

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
}

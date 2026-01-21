import { useMutation } from "@tanstack/react-query";

import { authService } from "./auth.api";
import { ForgotPasswordTokenParams, ForgotPasswordTokenResponse } from "./forgot-password/forgotPassword.type";

export const useForgotPasswordToken = () => {
  return useMutation<
    ForgotPasswordTokenResponse,
    Error,
    ForgotPasswordTokenParams
  >({
    mutationFn: (params) =>
      authService.sendForgotPasswordToken(params),
  });
};
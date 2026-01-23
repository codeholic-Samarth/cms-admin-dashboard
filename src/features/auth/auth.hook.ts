import { useMutation } from "@tanstack/react-query";

import { authService } from "./auth.api";
import { ChangePasswordPayload, ChangePasswordResponse } from "./create-password/createPassword.type";
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

export const useChangePassword = () => {
  return useMutation<
    ChangePasswordResponse,
    Error,
    ChangePasswordPayload
  >({
    mutationFn: (payload) =>
      authService.changePassword(payload),
  });
};
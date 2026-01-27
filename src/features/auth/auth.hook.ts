import { useMutation } from "@tanstack/react-query";

import { queryClient } from "@/lib/query-client";
import { useAuthStore } from "@/store/useAuthStore";

import { authService } from "./auth.api";
import { ChangePasswordPayload, ChangePasswordResponse } from "./create-password/createPassword.type";
import { ForgotPasswordTokenParams, ForgotPasswordTokenResponse } from "./forgot-password/forgotPassword.type";
import { LogoutPayload } from "./logout/logout.type";

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

export const useLogout = () => {
  const clearAuthData = useAuthStore((state) => state.clearAuthData);
  const refreshToken = useAuthStore((state) => state.refreshToken);

  return useMutation<void, Error, void>({
    mutationFn: async () => {
      if (!refreshToken) return;

      const payload: LogoutPayload = {
        refresh_token: refreshToken,
      };

      await authService.logout(payload);
    },

    onSuccess: () => {
      clearAuthData();
      queryClient.clear();
      localStorage.removeItem("auth-storage");
    },

    onError: () => {
      /**
       * Even if backend logout fails,
       * we MUST force logout locally
       */
      clearAuthData();
      queryClient.clear();
      localStorage.removeItem("auth-storage");
    },
  });
};

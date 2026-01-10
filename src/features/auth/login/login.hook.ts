import { useMutation } from "@tanstack/react-query"

import { useAuthStore } from "@/store/useAuthStore"

import { authApi } from "./login.api"
import { LoginFormValues } from "./login.schema"
import type { LoginRequest, LoginResponse } from "./login.types"

/* ========================================================
 * Helpers
 * ======================================================= */

/**
 * Collect client/device details for login payload
 * This keeps UI clean and centralizes logic
 */
const getClientDetails = () => {
  if (typeof window === "undefined") {
    return {
      ip_address: "unknown",
      browser: "unknown",
      system: "unknown",
    }
  }

  return {
    ip_address: "unknown",
    browser: "",
    system: navigator.platform,
  }
}

/* ========================================================
 * Login Hook
 * ======================================================= */

export const useLogin = () => {
  const setAuthData = useAuthStore((state) => state.setAuthData)

  return useMutation<LoginResponse, Error, LoginFormValues>({
    mutationFn: async (formValues) => {
      // Map form values → API payload
      const payload: LoginRequest = {
        username_or_email: formValues.username_or_email,
        password: formValues.password,
        details: getClientDetails(),
      }

      return authApi.login(payload)
    },

    onSuccess: (data) => {
      const { access_token, refresh_token, user } = data

      setAuthData({
        access_token,
        refresh_token,
        user,
      })
    },
  })
}

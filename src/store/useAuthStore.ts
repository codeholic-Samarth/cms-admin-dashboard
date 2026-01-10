import { create } from "zustand"
import { persist } from "zustand/middleware"

import type { AuthUser } from "@/features/auth/login/login.types"

/* ========================================================
 * Auth Store State
 * ======================================================= */

type AuthState = {
  accessToken: string | null
  refreshToken: string | null
  user: AuthUser | null
  isAuthenticated: boolean

  setAuthData: (data: {
    access_token: string
    refresh_token?: string
    user: AuthUser
  }) => void

  clearAuthData: () => void
}

/* ========================================================
 * Store Implementation
 * ======================================================= */

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      user: null,
      isAuthenticated: false,

      setAuthData: ({ access_token, refresh_token, user }) =>
        set({
          accessToken: access_token,
          refreshToken: refresh_token ?? null,
          user,
          isAuthenticated: true,
        }),

      clearAuthData: () =>
        set({
          accessToken: null,
          refreshToken: null,
          user: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: "auth-storage",

      // Persist ONLY what is needed for session recovery
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        user: state.user,
      }),
    }
  )
)

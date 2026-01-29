import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type { AuthUser } from '@/features/auth/login/login.types'

type AuthState = {
  accessToken: string | null
  refreshToken: string | null
  user: AuthUser | null
  isAuthenticated: boolean

  isSuperAdmin: boolean

  authResolved: boolean
  hasLoggedIn: boolean
  authBootstrapped: boolean

  setAuthData: (data: {
    access_token: string
    refresh_token?: string
    user: AuthUser
  }) => void

  setAccessToken: (token: string) => void
  clearAuthData: () => void
  markAuthResolved: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      user: null,
      isAuthenticated: false,

      isSuperAdmin: false,

      authResolved: false,
      hasLoggedIn: false,
      authBootstrapped: false,

      setAuthData: ({ access_token, refresh_token, user }) =>
        set({
          accessToken: access_token,
          refreshToken: refresh_token ?? null,
          user,
          isSuperAdmin:
            user.role?.title?.toLowerCase() === 'super admin' ||
            user.role?.title?.toLowerCase() === 'superadmin',
          isAuthenticated: true,
          hasLoggedIn: true,
          authResolved: true,
        }),

      setAccessToken: (token) =>
        set({
          accessToken: token,
          isAuthenticated: true,
          authResolved: true,
        }),

      markAuthResolved: () =>
        set({
          authResolved: true,
          authBootstrapped: true,
        }),

      clearAuthData: () =>
        set({
          accessToken: null,
          refreshToken: null,
          user: null,
          isSuperAdmin: false,
          isAuthenticated: false,
          authResolved: true,
          hasLoggedIn: false,
        }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        refreshToken: state.refreshToken,
        user: state.user,
      }),
    },
  ),
)

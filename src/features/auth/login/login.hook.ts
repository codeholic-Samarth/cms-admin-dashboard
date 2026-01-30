import { useMutation } from '@tanstack/react-query'

import { authService } from '@/features/profile/profile.api'
import { useAuthStore } from '@/store/useAuthStore'
import { usePermissionStore } from '@/store/usePermissionStore'

import { authApi } from './login.api'
import { LoginFormValues } from './login.schema'
import type { LoginRequest, LoginResponse } from './login.types'

/* ========================================================
 * Helpers
 * ======================================================= */

/**
 * Collect client/device details for login payload
 * This keeps UI clean and centralizes logic
 */
const getClientDetails = () => {
  if (typeof window === 'undefined') {
    return {
      ip_address: 'unknown',
      browser: 'unknown',
      system: 'unknown',
    }
  }

  return {
    ip_address: 'unknown',
    browser: '',
    system: navigator.platform,
  }
}

/* ========================================================
 * Login Hook
 * ======================================================= */
export const useLogin = () => {
  const setAuthData = useAuthStore((state) => state.setAuthData)
  const setPermissions = usePermissionStore((state) => state.setPermissions)

  return useMutation<LoginResponse, Error, LoginFormValues>({
    mutationFn: async (formValues) => {
      const payload: LoginRequest = {
        username_or_email: formValues.username_or_email,
        password: formValues.password,
        details: getClientDetails(),
      }

      return authApi.login(payload)
    },

    onSuccess: async (data) => {
      const { access_token, refresh_token, user } = data

      setAuthData({
        access_token,
        refresh_token,
        user,
      })

      const isSuperAdmin =
        user.role?.title?.toLowerCase() === 'super admin' ||
        user.role?.title?.toLowerCase() === 'superadmin'

      if (isSuperAdmin) {
        setPermissions([])
        return
      }

      try {
        const permissionResponse =
          await authService.getUserPermissions(user.uuid)

        const permissionCodenames =
          permissionResponse.user_permissions.map((p) => p.codename)

        setPermissions(permissionCodenames)
      } catch (error) {
        setPermissions([])
        throw error
      }
    },
  })
}

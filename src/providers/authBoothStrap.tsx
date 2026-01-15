'use client'

import axios from 'axios'
import { useEffect, useRef } from 'react'

import { API_ENDPOINTS, BASE_URL } from '@/lib/api/endpoints'
import { useAuthStore } from '@/store/useAuthStore'

const rawAxios = axios.create({
  baseURL: BASE_URL,
})

export function AuthBootstrap({ children }: { children: React.ReactNode }) {
  const ranRef = useRef(false)

  useEffect(() => {
    if (ranRef.current) return
    ranRef.current = true

    const restoreSession = async () => {
      if (!useAuthStore.persist.hasHydrated()) {
        setTimeout(restoreSession, 0)
        return
      }

      const {
        refreshToken,
        hasLoggedIn,
        setAccessToken,
        clearAuthData,
        markAuthResolved,
        authBootstrapped,
      } = useAuthStore.getState()

      if (authBootstrapped) {
        return
      }

      // Skip refresh right after login
      if (hasLoggedIn) {
        markAuthResolved()
        return
      }

      if (!refreshToken) {
        markAuthResolved()
        return
      }

      try {
        const res = await rawAxios.post(API_ENDPOINTS.AUTH.REFRESH, {
          refresh_token: refreshToken,
        })

        setAccessToken(res.data.access_token)
      } catch {
        clearAuthData()
      } finally {
        markAuthResolved()
      }
    }

    restoreSession()
  }, [])

  return <>{children}</>
}

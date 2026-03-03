import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios"

import { isTokenExpired } from "@/lib/jwt"
import { useAuthStore } from "@/store/useAuthStore"


import { API_ENDPOINTS, BASE_URL } from "./endpoints"
// import { isTokenExpired } from "@/lib/jwt"
// import { useAuthStore } from "@/store/useAuthStore"

/* ========================================================
 * Types
 * ======================================================= */

declare module "axios" {
  export interface InternalAxiosRequestConfig {
    _retry?: boolean
  }
}

/* ========================================================
 * Axios instances
 * ======================================================= */

// Main API client (used everywhere)
export const axiosFetch: AxiosInstance = axios.create({
  // baseURL: BASE_URL,
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
})

// Raw client (used ONLY for refresh, no interceptors)
const refreshClient = axios.create({
  baseURL: BASE_URL,
})

/* ========================================================
 * Refresh queue
 * ======================================================= */

let isRefreshing = false

let refreshQueue: {
  resolve: (token: string) => void
  reject: (error: unknown) => void
}[] = []

const processQueue = (error: unknown, token?: string) => {
  refreshQueue.forEach((p) =>
    error ? p.reject(error) : p.resolve(token!)
  )
  refreshQueue = []
}

/* ========================================================
 * Helpers
 * ======================================================= */

const attachToken = (
  config: InternalAxiosRequestConfig,
  token?: string
) => {
  if (!token) return
  config.headers.set("Authorization", `Bearer ${token}`)
}

const forceLogout = () => {
  const { clearAuthData } = useAuthStore.getState()
  clearAuthData()

  if (typeof window !== "undefined") {
    window.location.href = "/login"
  }
}

/* ========================================================
 * Refresh token flow (SINGLE SOURCE)
 * ======================================================= */

const refreshAccessToken = async (): Promise<string> => {
  const {
    refreshToken,
    setAccessToken,
    clearAuthData,
  } = useAuthStore.getState()

  if (!refreshToken) {
    throw new Error("No refresh token available")
  }

  try {
    const res = await refreshClient.post(
      API_ENDPOINTS.AUTH.REFRESH,
      { refresh_token: refreshToken }
    )

    const { access_token, refresh_token } = res.data

    // update ONLY access token
    setAccessToken(access_token)

    // OPTIONAL: backend rotated refresh token
    if (refresh_token) {
      useAuthStore.setState({ refreshToken: refresh_token })
    }

    return access_token
  } catch (err) {
    clearAuthData()
    throw err
  }
}


/* ========================================================
 * REQUEST INTERCEPTOR
 * ======================================================= */

axiosFetch.interceptors.request.use(
  async (config) => {
    const { accessToken } = useAuthStore.getState()

    if (!accessToken) return config

    // Skip refresh endpoint itself
    if (config.url?.includes(API_ENDPOINTS.AUTH.REFRESH)) {
      return config
    }

    // Proactive refresh (5 min buffer)
    if (isTokenExpired(accessToken, 300)) {
      if (!isRefreshing) {
        isRefreshing = true
        try {
          const newToken = await refreshAccessToken()
          processQueue(null, newToken)
          attachToken(config, newToken)
        } catch (err) {
          processQueue(err)
          forceLogout()
          throw err
        } finally {
          isRefreshing = false
        }
      } else {
        const token = await new Promise<string>((resolve, reject) =>
          refreshQueue.push({ resolve, reject })
        )
        attachToken(config, token)
      }
    } else {
      attachToken(config, accessToken)
    }

    return config
  },
  (error) => Promise.reject(error)
)

/* ========================================================
 * RESPONSE INTERCEPTOR
 * ======================================================= */

axiosFetch.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig
    const status = error.response?.status

    if (
      status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !originalRequest.url?.includes(API_ENDPOINTS.AUTH.LOGIN)
    ) {
      originalRequest._retry = true

      if (!isRefreshing) {
        isRefreshing = true
        try {
          const newToken = await refreshAccessToken()
          processQueue(null, newToken)
          attachToken(originalRequest, newToken)
          return axiosFetch.request(originalRequest)
        } catch (err) {
          processQueue(err)
          forceLogout()
          return Promise.reject(err)
        } finally {
          isRefreshing = false
        }
      } else {
        try {
          const token = await new Promise<string>((resolve, reject) =>
            refreshQueue.push({ resolve, reject })
          )
          attachToken(originalRequest, token)
          return axiosFetch.request(originalRequest)
        } catch (err) {
          forceLogout()
          return Promise.reject(err)
        }
      }
    }

    return Promise.reject(error)
  }
)

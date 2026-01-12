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
  baseURL: "http://127.0.0.1:8000/",
  withCredentials: true,
})

// Raw client (used ONLY for refresh, no interceptors)
const refreshClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
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
    localStorage.clear()
    sessionStorage.clear()
    document.cookie.split(";").forEach((c) => {
      document.cookie =
        c.replace(/^ +/, "").replace(/=.*/, "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/")
    })
    window.location.href = "/login"
  }
}

/* ========================================================
 * Refresh token flow (SINGLE SOURCE)
 * ======================================================= */

const refreshAccessToken = async (): Promise<string> => {
  const { refreshToken, setAuthData } = useAuthStore.getState()

  if (!refreshToken) {
    throw new Error("No refresh token available")
  }

  const res = await refreshClient.post(
    API_ENDPOINTS.AUTH.REFRESH,
    { refresh_token: refreshToken }
  )

  const {
    access_token,
    refresh_token,
    user,
  } = res.data

  setAuthData({
    access_token,
    refresh_token,
    user,
  })

  return access_token
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

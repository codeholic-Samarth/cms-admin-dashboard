/**
 * JWT utility functions (client-side only)
 * No verification — decoding only
 */

export interface JWTPayload {
  exp: number
  iat?: number
  sub?: string
  [key: string]: unknown
}

/**
 * Decode JWT payload safely (no verification)
 */
export const decodeJWT = (token: string): JWTPayload | null => {
  try {
    const parts = token.split(".")
    if (parts.length !== 3) return null

    let payload = parts[1]

    // Handle base64url encoding
    payload = payload.replace(/-/g, "+").replace(/_/g, "/")

    // Handle missing padding
    const pad = payload.length % 4
    if (pad) {
      payload += "=".repeat(4 - pad)
    }

    const decoded = atob(payload)
    const parsed = JSON.parse(decoded)

    if (typeof parsed !== "object" || parsed === null) {
      return null
    }

    return parsed as JWTPayload
  } catch {
    return null
  }
}

/**
 * Check whether a token is expired (or about to expire)
 */
export const isTokenExpired = (
  token: string,
  bufferSeconds = 60
): boolean => {
  const payload = decodeJWT(token)
  if (!payload?.exp) return true

  const now = Math.floor(Date.now() / 1000)
  return payload.exp <= now + bufferSeconds
}

/**
 * Get token expiration timestamp (ms)
 */
export const getTokenExpirationTime = (
  token: string
): number | null => {
  const payload = decodeJWT(token)
  if (!payload?.exp) return null

  return payload.exp * 1000
}

/**
 * Get remaining lifetime of token (ms)
 */
export const getTimeUntilExpiration = (token: string): number => {
  const expiresAt = getTokenExpirationTime(token)
  if (!expiresAt) return -1

  return expiresAt - Date.now()
}

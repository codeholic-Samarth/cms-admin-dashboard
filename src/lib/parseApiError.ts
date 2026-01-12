import type { AxiosError } from 'axios'

/**
 * Safely extracts a human-readable error message from
 * unknown API / Axios / backend error shapes.
 */
export function parseAPIError(error: unknown): string {
  try {
    const err = error as AxiosError | any
    const data = err?.response?.data ?? err?.data ?? err

    const extract = (input: unknown): string | null => {
      if (!input) return null

      // String
      if (typeof input === 'string') return input

      // Direct message fields
      if (typeof (input as any)?.message === 'string') return (input as any).message
      if (typeof (input as any)?.msg === 'string') return (input as any).msg

      // FastAPI / Pydantic (new nested)
      if (Array.isArray((input as any)?.detail?.detail)) {
        const msgs = (input as any).detail.detail
          .map((d: any) => d?.msg || d?.message)
          .filter(Boolean)
        if (msgs.length) return msgs.join('; ')
      }

      // FastAPI / Pydantic (old format)
      if (Array.isArray((input as any)?.detail)) {
        const msgs = (input as any).detail
          .map((d: any) => {
            if (typeof d === 'string') return d
            if (typeof d?.msg === 'string') {
              return Array.isArray(d?.loc) ? `${d.loc.join('.')}: ${d.msg}` : d.msg
            }
            return d?.message
          })
          .filter(Boolean)
        if (msgs.length) return msgs.join('; ')
      }

      // Single nested detail
      if (typeof (input as any)?.detail?.msg === 'string')
        return (input as any).detail.msg

      if (typeof (input as any)?.detail?.message === 'string')
        return (input as any).detail.message

      // Arrays → recurse
      if (Array.isArray(input)) {
        const msgs = input.map(extract).filter(Boolean) as string[]
        if (msgs.length) return msgs.join('; ')
      }

      // Objects → recurse values
      if (typeof input === 'object') {
        const msgs = Object.values(input as Record<string, unknown>)
          .map(extract)
          .filter(Boolean) as string[]
        if (msgs.length) return msgs.join('; ')
      }

      return null
    }

    const message = extract(data) || extract(err) || err?.message
    if (message) return String(message)

    // Network error
    if (err?.code === 'ERR_NETWORK') {
      return 'Network error. Please check your connection.'
    }

    // HTTP status fallbacks
    const status = err?.response?.status as number | undefined
    if (typeof status === 'number') {
      const defaults: Record<number, string> = {
        400: 'Bad request. Please check your input.',
        401: 'Unauthorized. Please log in again.',
        403: 'Forbidden. You do not have permission to perform this action.',
        404: 'Not found.',
        409: 'Conflict. Resource already exists.',
        422: 'Validation error. Please review your input.',
        429: 'Too many requests. Please try again later.',
      }

      if (defaults[status]) return defaults[status]
      if (status >= 500) return 'Server error. Please try again later.'
      return `Request failed (${status})`
    }

    return 'Something went wrong.'
  } catch {
    return 'Something went wrong.'
  }
}

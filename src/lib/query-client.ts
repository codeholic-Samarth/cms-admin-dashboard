import { QueryClient } from "@tanstack/react-query"
import type { AxiosError } from "axios"

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      gcTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,

      retry: (failureCount, error: unknown) => {
        if (
          isAxiosError(error) &&
          error.response?.status === 401
        ) {
          return false
        }

        return failureCount < 2
      },
    },
    mutations: {
      retry: false,
    },
  },
})

/* 
 * Type guards
*/

function isAxiosError(error: unknown): error is AxiosError {
  return (
    typeof error === "object" &&
    error !== null &&
    "isAxiosError" in error
  )
}

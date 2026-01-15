"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

import { useAuthStore } from "@/store/useAuthStore"

type Props = {
  children: React.ReactNode
  redirectTo: string
  requireAuth?: boolean
}

export default function AuthGuard({
  children,
  redirectTo,
  requireAuth = true,
}: Props) {
  const router = useRouter()
  const { isAuthenticated, authResolved } = useAuthStore()

  useEffect(() => {
    if (!authResolved) return

    if (requireAuth && !isAuthenticated) {
      router.replace(redirectTo)
    }

    if (!requireAuth && isAuthenticated) {
      router.replace(redirectTo)
    }
  }, [authResolved, isAuthenticated, requireAuth, redirectTo, router])

  if (!authResolved) return null

  if (
    (requireAuth && !isAuthenticated) ||
    (!requireAuth && isAuthenticated)
  ) {
    return null
  }

  return <>{children}</>
}

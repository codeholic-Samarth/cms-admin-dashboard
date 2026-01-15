"use client"

import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"

import { useAuthStore } from "@/store/useAuthStore"

export default function PublicGuard({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const { isAuthenticated, authResolved } = useAuthStore()

  const isPublicAuthRoute =
    pathname === "/login" || pathname.startsWith("/auth")

  useEffect(() => {
    if (!authResolved) return

    if (isAuthenticated && isPublicAuthRoute) {
      router.replace("/dashboard")
    }
  }, [authResolved, isAuthenticated, isPublicAuthRoute, router])

  return <>{children}</>
}

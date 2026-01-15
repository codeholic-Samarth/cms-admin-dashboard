"use client"

import { usePathname } from "next/navigation"

import AuthGuard from "./authGuard"

export default function DashboardGuard({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  // Only protect dashboard routes
  if (!pathname.startsWith("/dashboard")) {
    return <>{children}</>
  }

  return (
    <AuthGuard redirectTo="/login">
      {children}
    </AuthGuard>
  )
}

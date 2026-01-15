"use client"

import { redirect } from "next/navigation"

import { useAuthStore } from "@/store/useAuthStore"

export default function HomePage() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)

  if (isAuthenticated) {
    redirect("/dashboard")
  }

  redirect("/login")
}

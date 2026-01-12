"use client"

import { useCallback, useState } from "react"

type CopyStatus = "idle" | "success" | "error"

export function useCopyToClipboard(timeout = 2000) {
  const [status, setStatus] = useState<CopyStatus>("idle")

  const copy = useCallback(async (value: string) => {
    if (!value) return false

    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(value)
      } else {
        // Fallback for older browsers
        const textarea = document.createElement("textarea")
        textarea.value = value
        textarea.style.position = "fixed"
        textarea.style.opacity = "0"
        document.body.appendChild(textarea)
        textarea.focus()
        textarea.select()
        document.execCommand("copy")
        document.body.removeChild(textarea)
      }

      setStatus("success")

      if (timeout) {
        setTimeout(() => setStatus("idle"), timeout)
      }

      return true
    } catch (error) {
      console.error("Copy failed", error)
      setStatus("error")

      if (timeout) {
        setTimeout(() => setStatus("idle"), timeout)
      }

      return false
    }
  }, [timeout])

  return {
    copy,
    status,
    isCopied: status === "success",
    isError: status === "error",
  }
}

"use client"

import { useState, useEffect } from "react"

export function useMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const query = window.matchMedia(`(max-width: ${breakpoint - 1}px)`)

    setIsMobile(query.matches)

    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    query.addEventListener("change", handler)

    return () => query.removeEventListener("change", handler)
  }, [breakpoint])

  return isMobile
}

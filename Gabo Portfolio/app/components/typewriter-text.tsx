"use client"

import { useState, useEffect, useRef } from "react"

interface TypewriterTextProps {
  text: string
  className?: string
  onComplete?: () => void
}

export default function TypewriterText({ text, className = "", onComplete }: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [opacity, setOpacity] = useState(0)
  const animationRef = useRef<NodeJS.Timeout | null>(null)
  const isCompletedRef = useRef(false)

  // Use a ref to track if this is the first render
  const isFirstRender = useRef(true)

  useEffect(() => {
    // Only run the animation once on initial mount
    if (!isFirstRender.current) return

    isFirstRender.current = false
    isCompletedRef.current = false

    // Reset state
    setDisplayedText("")
    setOpacity(0)

    // Calculate a speed that will complete the animation in ~1 second
    const totalDuration = 800 // ms
    const charactersPerStep = Math.max(1, Math.ceil(text.length / (totalDuration / 50)))

    let currentIndex = 0

    // Clear any existing animation
    if (animationRef.current) {
      clearInterval(animationRef.current)
    }

    // Start new animation
    animationRef.current = setInterval(() => {
      currentIndex += charactersPerStep

      // Gradually increase opacity as text appears
      const progress = Math.min(1, currentIndex / text.length)
      setOpacity(progress)

      if (currentIndex >= text.length) {
        setDisplayedText(text)
        setOpacity(1)

        if (animationRef.current) {
          clearInterval(animationRef.current)
          animationRef.current = null
        }

        if (onComplete && !isCompletedRef.current) {
          isCompletedRef.current = true
          setTimeout(onComplete, 100) // Small delay before triggering next paragraph
        }
      } else {
        setDisplayedText(text.slice(0, currentIndex))
      }
    }, 50) // Update every 50ms

    return () => {
      if (animationRef.current) {
        clearInterval(animationRef.current)
        animationRef.current = null
      }
    }
  }, [text, onComplete]) // Dependencies

  return (
    <div
      className={className}
      style={{
        opacity: opacity,
        transition: "opacity 0.2s ease-in-out",
      }}
    >
      {displayedText}
    </div>
  )
}


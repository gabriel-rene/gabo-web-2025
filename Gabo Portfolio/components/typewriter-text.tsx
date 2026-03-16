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
  const onCompleteRef = useRef(onComplete)

  // Always keep the ref current without triggering re-runs of the effect
  onCompleteRef.current = onComplete

  useEffect(() => {
    setDisplayedText("")
    setOpacity(0)
    isCompletedRef.current = false

    const totalDuration = 800
    const charactersPerStep = Math.max(1, Math.ceil(text.length / (totalDuration / 50)))
    let currentIndex = 0

    if (animationRef.current) {
      clearInterval(animationRef.current)
    }

    const startTimer = setTimeout(() => {
      animationRef.current = setInterval(() => {
        currentIndex += charactersPerStep

        const progress = Math.min(1, currentIndex / text.length)
        setOpacity(progress)

        if (currentIndex >= text.length) {
          setDisplayedText(text)
          setOpacity(1)

          if (animationRef.current) {
            clearInterval(animationRef.current)
            animationRef.current = null
          }

          if (onCompleteRef.current && !isCompletedRef.current) {
            isCompletedRef.current = true
            setTimeout(onCompleteRef.current, 100)
          }
        } else {
          setDisplayedText(text.slice(0, currentIndex))
        }
      }, 50)
    }, 100)

    return () => {
      clearTimeout(startTimer)
      if (animationRef.current) {
        clearInterval(animationRef.current)
        animationRef.current = null
      }
    }
  }, [text])

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

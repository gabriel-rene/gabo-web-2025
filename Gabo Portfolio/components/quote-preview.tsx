"use client"

import { useState, useEffect, useRef } from "react"
import TypewriterText from "./typewriter-text"

export default function QuotePreview() {
  const quotes = [
    "...literally willing to die doing something I like.",
    "...traveled the Americas doing political campaigns (armored vehicles and all).",
    "...jumped into all the technological fads (yes, even crypto).",
    "...trying to find the next version of myself.",
  ]

  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const mountedRef = useRef(false)
  const [key, setKey] = useState(0) // Add a key to force re-render

  useEffect(() => {
    // Reset when component mounts
    setCurrentQuoteIndex(0)

    // Brief delay before starting
    const timer = setTimeout(() => {
      setIsLoaded(true)
      mountedRef.current = true
      setKey(Date.now()) // Use timestamp as key
    }, 100)

    return () => {
      clearTimeout(timer)
      mountedRef.current = false
    }
  }, [])

  const handleQuoteComplete = () => {
    if (mountedRef.current && currentQuoteIndex < quotes.length - 1) {
      setCurrentQuoteIndex((prev) => prev + 1)
    }
  }

  return (
    <div className="mt-12 space-y-4 text-lg font-italic text-stone-500 dark:text-stone-400">
      {isLoaded &&
        quotes.map((quote, index) => (
          <div key={`quote-${index}-${key}`}>
            {index <= currentQuoteIndex && (
              <TypewriterText
                key={`text-${index}-${key}`}
                text={`"${quote}"`}
                className="font-italic"
                onComplete={index === currentQuoteIndex ? handleQuoteComplete : undefined}
              />
            )}
          </div>
        ))}
    </div>
  )
}


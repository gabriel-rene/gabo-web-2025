"use client"

import { useState, useEffect, useRef } from "react"
import TypewriterText from "./typewriter-text"

const quotes = [
  "...literally willing to die doing something I like.",
  "...traveled the Americas doing political campaigns (armored vehicles and all).",
  "...jumped into all the technological fads (yes, even crypto).",
  "...trying to find the next version of myself.",
]

export default function QuotePreview() {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const mountedRef = useRef(false)

  useEffect(() => {
    setCurrentQuoteIndex(0)

    const timer = setTimeout(() => {
      setIsLoaded(true)
      mountedRef.current = true
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
          <div key={index}>
            {index <= currentQuoteIndex && (
              <TypewriterText
                key={`quote-${index}-${currentQuoteIndex >= index}`}
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

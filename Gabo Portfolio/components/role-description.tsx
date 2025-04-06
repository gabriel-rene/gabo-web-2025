"use client"

import { useState, useEffect, useRef } from "react"
import identities from "@/data/identities"
import TypewriterText from "./typewriter-text"
import { motion } from "framer-motion"

interface RoleDescriptionProps {
  role: string
}

export default function RoleDescription({ role }: RoleDescriptionProps) {
  const identity = identities.find((identity) => identity.role === role)
  const [currentParagraphIndex, setCurrentParagraphIndex] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const mountedRef = useRef(false)
  const [key, setKey] = useState(0) // Add a key to force re-render of TypewriterText

  // Reset state when role changes
  useEffect(() => {
    setIsLoaded(false)

    // Small delay to ensure clean state
    const timer = setTimeout(() => {
      setCurrentParagraphIndex(0)
      setIsLoaded(true)
      mountedRef.current = true
      setKey((prevKey) => prevKey + 1) // Increment key to force re-render
    }, 100)

    return () => {
      clearTimeout(timer)
      mountedRef.current = false
    }
  }, [role])

  if (!identity) {
    return <p className="text-lg md:text-xl leading-relaxed">Information about this role is coming soon.</p>
  }

  // Special handling for the list in "educator on AI" role
  if (role === "educator on AI") {
    const paragraphs = identity.description.split("\n\n")
    const mainText = paragraphs[0]

    // Find the engagements part
    const engagementsPart = paragraphs.find((p) => p.startsWith("Previous and Future Engagements:"))
    const contactPart = "Contact me if you want to invite me to a speaking event."

    // Handle the main paragraph and engagements separately
    const handleMainComplete = () => {
      if (mountedRef.current) {
        setCurrentParagraphIndex(1)
      }
    }

    return (
      <div className="text-lg md:text-xl leading-relaxed">
        {isLoaded && (
          <>
            <TypewriterText key={`main-${key}`} text={mainText} onComplete={handleMainComplete} />

            {currentParagraphIndex >= 1 && engagementsPart && (
              <div className="mt-6">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-base font-medium text-stone-700 dark:text-stone-300 mb-2"
                >
                  Previous and Future Engagements:
                </motion.p>
                <div className="text-base space-y-1 text-stone-700 dark:text-stone-300">
                  {engagementsPart
                    .split("\n")
                    .slice(1)
                    .map((line, index) => (
                      <motion.p
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                          duration: 0.3,
                          delay: 0.2 + index * 0.1,
                        }}
                      >
                        {line}
                      </motion.p>
                    ))}
                </div>
              </div>
            )}

            {currentParagraphIndex >= 1 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.5,
                  delay: 0.8,
                }}
                className="text-base font-medium text-stone-700 dark:text-stone-300 mt-6"
              >
                {contactPart}
              </motion.p>
            )}
          </>
        )}
      </div>
    )
  }

  // For other roles, show paragraphs with typewriter effect sequentially
  const paragraphs = identity.description.split("\n\n")

  const handleParagraphComplete = () => {
    if (mountedRef.current && currentParagraphIndex < paragraphs.length - 1) {
      setCurrentParagraphIndex((prev) => prev + 1)
    }
  }

  return (
    <div className="text-lg md:text-xl leading-relaxed">
      {isLoaded &&
        paragraphs.map((paragraph, index) => (
          <div key={`para-${index}-${key}`} className={index > 0 ? "mt-4" : ""}>
            {index <= currentParagraphIndex && (
              <TypewriterText
                key={`text-${index}-${key}`}
                text={paragraph}
                onComplete={index === currentParagraphIndex ? handleParagraphComplete : undefined}
              />
            )}
          </div>
        ))}
    </div>
  )
}


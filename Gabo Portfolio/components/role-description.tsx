"use client"

import { useState, useEffect, useRef } from "react"
import identities from "@/data/identities"
import TypewriterText from "./typewriter-text"
import { motion } from "framer-motion"

interface RoleDescriptionProps {
  role: string
}

export default function RoleDescription({ role }: RoleDescriptionProps) {
  const identity = identities.find((i) => i.role === role)
  const [currentParagraphIndex, setCurrentParagraphIndex] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const mountedRef = useRef(false)

  useEffect(() => {
    setIsLoaded(false)

    const timer = setTimeout(() => {
      setCurrentParagraphIndex(0)
      setIsLoaded(true)
      mountedRef.current = true
    }, 100)

    return () => {
      clearTimeout(timer)
      mountedRef.current = false
    }
  }, [role])

  if (!identity) {
    return <p className="text-lg md:text-xl leading-relaxed">Information about this role is coming soon.</p>
  }

  if (identity.engagements) {
    const mainText = identity.description

    const handleMainComplete = () => {
      if (mountedRef.current) {
        setCurrentParagraphIndex(1)
      }
    }

    return (
      <div className="text-lg md:text-xl leading-relaxed">
        {isLoaded && (
          <>
            <TypewriterText key={`main-${role}`} text={mainText} onComplete={handleMainComplete} />

            {currentParagraphIndex >= 1 && (
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
                  {identity.engagements.map((line, index) => (
                    <motion.p
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                    >
                      {line}
                    </motion.p>
                  ))}
                </div>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="text-base font-medium text-stone-700 dark:text-stone-300 mt-6"
                >
                  Contact me if you want to invite me to a speaking event.
                </motion.p>
              </div>
            )}
          </>
        )}
      </div>
    )
  }

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
          <div key={`para-${role}-${index}`} className={index > 0 ? "mt-4" : ""}>
            {index <= currentParagraphIndex && (
              <TypewriterText
                key={`text-${role}-${index}`}
                text={paragraph}
                onComplete={index === currentParagraphIndex ? handleParagraphComplete : undefined}
              />
            )}
          </div>
        ))}
    </div>
  )
}

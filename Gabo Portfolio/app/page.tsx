"use client"

import { useState, useEffect } from "react"
import identities from "@/data/identities"
import { useMobile } from "@/hooks/use-mobile"
import QuotePreview from "@/components/quote-preview"
import { Mail, Linkedin, Sun, Moon } from "lucide-react"
import RoleDescription from "@/components/role-description"
import TypewriterText from "@/components/typewriter-text"
import { useTheme } from "@/components/theme-provider"
import { motion, AnimatePresence } from "framer-motion"

export default function Home() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null)
  const [showMenu, setShowMenu] = useState(false)
  const [initialLoad, setInitialLoad] = useState(true)
  const [mainTextDone, setMainTextDone] = useState(false)
  const isMobile = useMobile()
  const { theme, setTheme } = useTheme()

  const roles = identities.map((identity) => identity.role)

  const selectedIdentity = selectedRole ? identities.find((i) => i.role === selectedRole) : null

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role)
    setShowMenu(false)
  }

  const resetSelection = () => {
    setSelectedRole(null)
    setShowMenu(true)
  }

  // Set initialLoad to false after animation completes
  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoad(false)
    }, 3000) // Give enough time for the animation to complete

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen w-full bg-stone-50 dark:bg-stone-900 text-stone-800 dark:text-stone-200">
      {/* Theme toggle */}
      <div className="fixed top-6 right-6 z-10">
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2 rounded-full bg-stone-200 dark:bg-stone-800 transition-colors"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <Sun size={20} className="text-stone-100" />
          ) : (
            <Moon size={20} className="text-stone-700" />
          )}
        </button>
      </div>

      <div className="absolute top-1/4 left-0 w-full px-6 md:px-24 lg:px-32">
        {/* Main heading that stays fixed */}
        <div>
          {initialLoad ? (
            <TypewriterText
              text="hi, it's gabo here, a creative technologist."
              className="text-xl md:text-2xl m-0"
              onComplete={() => setMainTextDone(true)}
            />
          ) : (
            <p className="text-xl md:text-2xl m-0">
              hi, it&apos;s <span className="font-medium">gabo</span> here, a creative technologist.
            </p>
          )}

          <div className="flex flex-col md:flex-row md:items-start mt-2">
            {(mainTextDone || !initialLoad) && (
              <p className="text-xl md:text-2xl m-0 flex items-baseline">
                I&apos;ve been a{" "}
                {selectedRole ? (
                  <span
                    className="underline decoration-2 underline-offset-4 cursor-pointer ml-1"
                    onClick={resetSelection}
                  >
                    {selectedRole}
                  </span>
                ) : (
                  <span
                    className="inline-block w-64 border-b-2 border-dashed border-current cursor-pointer ml-1"
                    onMouseEnter={() => !isMobile && setShowMenu(true)}
                    onClick={() => isMobile && setShowMenu(!showMenu)}
                  >
                    &nbsp;
                  </span>
                )}
                {selectedIdentity?.suffix || ""}
              </p>
            )}

            {/* Menu - fixed position on desktop, below on mobile */}
            {showMenu && !selectedRole && (
              <div
                className={`
                  ${isMobile ? "mt-2 self-center" : "md:ml-16"}
                `}
                onMouseEnter={() => !isMobile && setShowMenu(true)}
                onMouseLeave={() => !isMobile && setShowMenu(false)}
              >
                <div className={`flex flex-col gap-2 ${isMobile ? "items-center" : ""}`}>
                  {roles.map((role, index) => (
                    <motion.button
                      key={role}
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: index * 0.08,
                        ease: "easeOut",
                      }}
                      onClick={() => handleRoleSelect(role)}
                      className="px-6 py-2 border border-stone-300 dark:border-stone-700 text-left text-lg hover:border-stone-500 dark:hover:border-stone-400 bg-stone-50 dark:bg-stone-900 transition-colors w-64"
                    >
                      {role}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="mt-16 mb-40">
          <AnimatePresence mode="wait">
            {selectedRole ? (
              <motion.div
                key="role-description"
                className="max-w-[600px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <RoleDescription role={selectedRole} />
              </motion.div>
            ) : (
              !showMenu &&
              (mainTextDone || !initialLoad) && (
                <motion.div
                  key="quote-preview"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <QuotePreview />
                </motion.div>
              )
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Footer */}
      <div className="fixed bottom-8 w-full px-6 md:px-24 lg:px-32 flex justify-between items-center">
        <div className="text-sm text-stone-600 dark:text-stone-400">
          This site is <span className="font-medium">100% human written</span> and about{" "}
          <span className="font-medium">80% coded</span> in collaboration with AI, using Vercel&apos;s v0 and ChatGPT.
        </div>
        <div className="flex gap-4">
          <a
            href="mailto:hola@gaborene.com"
            className="text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 transition-colors"
            aria-label="Email"
          >
            <Mail size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/gabrielrene/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={20} />
          </a>
        </div>
      </div>
    </div>
  )
}


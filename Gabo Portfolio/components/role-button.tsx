"use client"

import { motion } from "framer-motion"

interface RoleButtonProps {
  role: string
  isSelected: boolean
  onClick: () => void
}

export default function RoleButton({ role, isSelected, onClick }: RoleButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className={`
        px-4 py-2 border border-gray-300 text-left transition-colors w-full
        ${isSelected ? "bg-black text-white" : "hover:border-gray-500"}
        text-lg font-serif
      `}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      {role}
    </motion.button>
  )
}


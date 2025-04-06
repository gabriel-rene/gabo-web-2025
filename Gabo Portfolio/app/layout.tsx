import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Instrument_Serif } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

// Initialize the Instrument Serif font
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-instrument-serif",
})

// Update the metadata object with the new title and description
export const metadata: Metadata = {
  title: "Gabo René - Creative Technologist",
  description:
    "Gabriel René Rodríguez Rovira is a creative technologist based in Puerto Rico, with skills in Design, AI Implementation and Education, Speaker and Digital Producer.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased ${instrumentSerif.variable}`}>
        <ThemeProvider defaultTheme="light" storageKey="gabo-theme">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'
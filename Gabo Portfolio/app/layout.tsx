import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Instrument_Serif } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-instrument-serif",
})

export const metadata: Metadata = {
  title: "Gabo René - Creative Technologist",
  description:
    "Gabriel René Rodríguez Rovira is a creative technologist based in Puerto Rico, with skills in Design, AI Implementation and Education, Speaker and Digital Producer.",
  metadataBase: new URL("https://gaborene.com"),
  openGraph: {
    title: "Gabo René - Creative Technologist",
    description:
      "Gabriel René Rodríguez Rovira is a creative technologist based in Puerto Rico, with skills in Design, AI Implementation and Education, Speaker and Digital Producer.",
    url: "https://gaborene.com",
    siteName: "Gabo René",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gabo René - Creative Technologist",
    description:
      "Gabriel René Rodríguez Rovira is a creative technologist based in Puerto Rico, with skills in Design, AI Implementation and Education, Speaker and Digital Producer.",
  },
  alternates: {
    canonical: "https://gaborene.com",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var stored = localStorage.getItem('gabo-theme');
                var theme = stored || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                document.documentElement.classList.add(theme);
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className={`antialiased ${instrumentSerif.variable}`}>
        <ThemeProvider defaultTheme="light" storageKey="gabo-theme">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

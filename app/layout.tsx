import type React from "react"
import type { Metadata } from "next"
import { poppins } from "./fonts"
import "./globals.css"

export const metadata: Metadata = {
  title: "CivicDataSpace - All Data",
  description: "Explore comprehensive datasets for civic engagement and research",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className={`${poppins.className} antialiased`}>{children}</body>
    </html>
  )
}


import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import SessionProviderWrapper from "@/components/SessionProviderWrapper"
import "./globals.css"

export const metadata: Metadata = {
  title: "ManasMitra - AI Mental Wellness for Youth",
  description: "ManasMitra is a confidential AI-powered mental wellness platform designed for youth ages 13-25",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <SessionProviderWrapper>
          <Suspense fallback={null}>{children}</Suspense>
        </SessionProviderWrapper>
        <Analytics />
      </body>
    </html>
  )
}

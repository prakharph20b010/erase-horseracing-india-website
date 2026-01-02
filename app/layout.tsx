import type React from "react"
import type { Metadata } from "next"
import { Crimson_Text, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const crimsonText = Crimson_Text({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-serif",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Erase Horseracing India - End the Suffering",
  description:
    "A movement to end horse racing in India and honor the horses who have suffered. Join us in demanding accountability and change.",
  generator: "v0.app",
  keywords: ["horse racing", "animal rights", "India", "advocacy", "horse welfare"],
  openGraph: {
    title: "Erase Horseracing India - End the Suffering",
    description: "A movement to end horse racing in India and honor the horses who have suffered.",
    type: "website",
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${crimsonText.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
